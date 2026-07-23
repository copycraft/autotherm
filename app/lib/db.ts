import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Data access layer.
 *
 * Production: Cloudflare D1 (binding: `DB` in wrangler.jsonc).
 * Local development / build: better-sqlite3 file at data/autotherm.db,
 * loaded via dynamic import so the module never reaches a Worker bundle.
 *
 * Every public function is defensive: a database outage must never take
 * down a high-traffic product page, so all calls are wrapped in try/catch
 * and return safe fallbacks.
 */

/* ----------------------------------- Types ---------------------------------- */

export interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  page: string | null;
  lang: string | null;
  created_at: string;
}

export interface BlogPost {
  id: number;
  hu_title: string;
  hu_content: string;
  en_title: string;
  en_content: string;
  de_title: string;
  de_content: string;
  ro_title: string;
  ro_content: string;
  image: string | null;
  published: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPostInput {
  hu_title?: string;
  hu_content?: string;
  en_title?: string;
  en_content?: string;
  de_title?: string;
  de_content?: string;
  ro_title?: string;
  ro_content?: string;
  image?: string | null;
  published?: number;
}

/* ------------------------------- D1 detection ------------------------------- */

type D1Like = {
  prepare: (sql: string) => {
    bind: (...args: unknown[]) => {
      all: <T>() => Promise<{ results: T[] }>;
      first: <T>() => Promise<T | null>;
      run: () => Promise<{ meta: { last_row_id: number } }>;
    };
    all: <T>() => Promise<{ results: T[] }>;
    first: <T>() => Promise<T | null>;
    run: () => Promise<{ meta: { last_row_id: number } }>;
  };
};

function getD1(): D1Like | null {
  try {
    const ctx = getCloudflareContext();
    const db = (ctx.env as Record<string, unknown>).DB as D1Like | undefined;
    if (db && typeof db.prepare === "function") return db;
  } catch {
    // Not running inside a Cloudflare context (local dev / build).
  }
  return null;
}

/* --------------------------- Local SQLite fallback --------------------------- */

const BOOTSTRAP_SQL = `
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  page TEXT,
  lang TEXT,
  created_at TEXT DEFAULT (datetime('now', '+1 hour'))
);
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hu_title TEXT DEFAULT '',
  hu_content TEXT DEFAULT '',
  en_title TEXT DEFAULT '',
  en_content TEXT DEFAULT '',
  de_title TEXT DEFAULT '',
  de_content TEXT DEFAULT '',
  ro_title TEXT DEFAULT '',
  ro_content TEXT DEFAULT '',
  image TEXT,
  published INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now', '+1 hour')),
  updated_at TEXT DEFAULT (datetime('now', '+1 hour'))
);
`;

// Deliberately typed loosely: better-sqlite3 is only present in local dev.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sqliteDb: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getSqlite(): Promise<any> {
  if (sqliteDb) return sqliteDb;
  const [{ default: Database }, path] = await Promise.all([
    import("better-sqlite3"),
    import("node:path"),
  ]);
  const dbPath = path.join(process.cwd(), "data", "autotherm.db");
  sqliteDb = new Database(dbPath);
  sqliteDb.pragma("journal_mode = WAL");
  sqliteDb.exec(BOOTSTRAP_SQL);
  return sqliteDb;
}

/* -------------------------------- Submissions -------------------------------- */

export async function insertSubmission(input: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  page?: string | null;
  lang?: string | null;
}): Promise<boolean> {
  const sql =
    "INSERT INTO submissions (name, email, phone, message, page, lang) VALUES (?, ?, ?, ?, ?, ?)";
  const args = [
    input.name,
    input.email,
    input.phone ?? null,
    input.message,
    input.page ?? null,
    input.lang ?? null,
  ];
  try {
    const d1 = getD1();
    if (d1) {
      await d1.prepare(sql).bind(...args).run();
      return true;
    }
    const db = await getSqlite();
    db.prepare(sql).run(...args);
    return true;
  } catch (err) {
    console.error("[db] insertSubmission failed:", err);
    return false;
  }
}

export async function getAllSubmissions(): Promise<Submission[]> {
  const sql = "SELECT * FROM submissions ORDER BY id DESC";
  try {
    const d1 = getD1();
    if (d1) {
      const { results } = await d1.prepare(sql).all<Submission>();
      return results ?? [];
    }
    const db = await getSqlite();
    return db.prepare(sql).all() as Submission[];
  } catch (err) {
    console.error("[db] getAllSubmissions failed:", err);
    return [];
  }
}

/* ------------------------------- Site stats --------------------------------- */

export interface SiteStats {
  foundedYear: number;
  customers: number;
  annualConversions: number;
  employees: number;
}

export async function getStats(): Promise<SiteStats> {
  const defaults = { foundedYear: 1992, customers: 3000, annualConversions: 280, employees: 33 };
  try {
    const d1 = getD1();
    if (d1) {
      const { results } = await d1.prepare("SELECT key, value FROM settings WHERE key IN ('stat_foundedYear','stat_customers','stat_annualConversions','stat_employees')").all<{ key: string; value: string }>();
      const map = new Map((results ?? []).map((r) => [r.key, r.value]));
      return {
        foundedYear: Number(map.get("stat_foundedYear")) || defaults.foundedYear,
        customers: Number(map.get("stat_customers")) || defaults.customers,
        annualConversions: Number(map.get("stat_annualConversions")) || defaults.annualConversions,
        employees: Number(map.get("stat_employees")) || defaults.employees,
      };
    }
    const fromEnv = {
      foundedYear: process.env.STAT_FOUNDED_YEAR,
      customers: process.env.STAT_CUSTOMERS,
      annualConversions: process.env.STAT_ANNUAL_CONVERSIONS,
      employees: process.env.STAT_EMPLOYEES,
    };
    if (fromEnv.foundedYear || fromEnv.customers || fromEnv.annualConversions || fromEnv.employees) {
      return {
        foundedYear: Number(fromEnv.foundedYear) || defaults.foundedYear,
        customers: Number(fromEnv.customers) || defaults.customers,
        annualConversions: Number(fromEnv.annualConversions) || defaults.annualConversions,
        employees: Number(fromEnv.employees) || defaults.employees,
      };
    }
    const db = await getSqlite();
    const rows = db.prepare("SELECT key, value FROM settings WHERE key IN ('stat_foundedYear','stat_customers','stat_annualConversions','stat_employees')").all() as { key: string; value: string }[];
    const map = new Map(rows.map((r: { key: string; value: string }) => [r.key, r.value]));
    return {
      foundedYear: Number(map.get("stat_foundedYear")) || defaults.foundedYear,
      customers: Number(map.get("stat_customers")) || defaults.customers,
      annualConversions: Number(map.get("stat_annualConversions")) || defaults.annualConversions,
      employees: Number(map.get("stat_employees")) || defaults.employees,
    };
  } catch {
    return defaults;
  }
}

/* ---------------------------------- Settings --------------------------------- */

export async function getSetting(key: string): Promise<string | null> {
  const sql = "SELECT value FROM settings WHERE key = ?";
  try {
    const d1 = getD1();
    if (d1) {
      const row = await d1.prepare(sql).bind(key).first<{ value: string }>();
      return row?.value ?? null;
    }
    const db = await getSqlite();
    const row = db.prepare(sql).get(key) as { value: string } | undefined;
    return row?.value ?? null;
  } catch (err) {
    console.error("[db] getSetting failed:", err);
    return null;
  }
}

export async function setSetting(key: string, value: string): Promise<boolean> {
  const sql =
    "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value";
  try {
    const d1 = getD1();
    if (d1) {
      await d1.prepare(sql).bind(key, value).run();
      return true;
    }
    const db = await getSqlite();
    db.prepare(sql).run(key, value);
    return true;
  } catch (err) {
    console.error("[db] setSetting failed:", err);
    return false;
  }
}

/* ------------------------------------ Posts ----------------------------------- */

const POST_FIELDS = [
  "hu_title",
  "hu_content",
  "en_title",
  "en_content",
  "de_title",
  "de_content",
  "ro_title",
  "ro_content",
  "image",
  "published",
] as const;

export async function createPost(input: BlogPostInput): Promise<number | null> {
  const sql = `INSERT INTO posts (${POST_FIELDS.join(", ")}) VALUES (${POST_FIELDS.map(() => "?").join(", ")})`;
  const args = POST_FIELDS.map((f) => {
    if (f === "published") return input.published ?? 0;
    if (f === "image") return input.image ?? null;
    return input[f] ?? "";
  });
  try {
    const d1 = getD1();
    if (d1) {
      const res = await d1.prepare(sql).bind(...args).run();
      return res.meta?.last_row_id ?? null;
    }
    const db = await getSqlite();
    const res = db.prepare(sql).run(...args);
    return Number(res.lastInsertRowid);
  } catch (err) {
    console.error("[db] createPost failed:", err);
    return null;
  }
}

export async function updatePost(
  id: number,
  input: BlogPostInput,
): Promise<boolean> {
  const sets: string[] = [];
  const args: unknown[] = [];
  for (const f of POST_FIELDS) {
    if (input[f] !== undefined) {
      sets.push(`${f} = ?`);
      args.push(input[f]);
    }
  }
  if (sets.length === 0) return true;
  sets.push("updated_at = datetime('now', '+1 hour')");
  const sql = `UPDATE posts SET ${sets.join(", ")} WHERE id = ?`;
  args.push(id);
  try {
    const d1 = getD1();
    if (d1) {
      await d1.prepare(sql).bind(...args).run();
      return true;
    }
    const db = await getSqlite();
    db.prepare(sql).run(...args);
    return true;
  } catch (err) {
    console.error("[db] updatePost failed:", err);
    return false;
  }
}

export async function deletePost(id: number): Promise<boolean> {
  const sql = "DELETE FROM posts WHERE id = ?";
  try {
    const d1 = getD1();
    if (d1) {
      await d1.prepare(sql).bind(id).run();
      return true;
    }
    const db = await getSqlite();
    db.prepare(sql).run(id);
    return true;
  } catch (err) {
    console.error("[db] deletePost failed:", err);
    return false;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const sql = "SELECT * FROM posts ORDER BY id DESC";
  try {
    const d1 = getD1();
    if (d1) {
      const { results } = await d1.prepare(sql).all<BlogPost>();
      return results ?? [];
    }
    const db = await getSqlite();
    return db.prepare(sql).all() as BlogPost[];
  } catch (err) {
    console.error("[db] getAllPosts failed:", err);
    return [];
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const sql = "SELECT * FROM posts WHERE published = 1 ORDER BY id DESC";
  try {
    const d1 = getD1();
    if (d1) {
      const { results } = await d1.prepare(sql).all<BlogPost>();
      return results ?? [];
    }
    const db = await getSqlite();
    return db.prepare(sql).all() as BlogPost[];
  } catch (err) {
    console.error("[db] getPublishedPosts failed:", err);
    return [];
  }
}
