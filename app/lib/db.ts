import initSqlJs, { type Database } from 'sql.js';

function isEdge(): boolean {
  return typeof process === 'undefined' || !process.versions?.node;
}

function getKv(): { get: (k: string) => Promise<string | null>; put: (k: string, v: string) => Promise<void> } | null {
  try {
    // Cloudflare Workers: binding injected at runtime as global
    const ns = (globalThis as any).FORM_SUBMISSIONS;
    if (ns?.get && ns?.put) return ns;
  } catch {}
  return null;
}

// In-memory fallback using sql.js
let db: Database | null = null;
async function getDb(): Promise<Database> {
  if (db) return db;
  const SQL = await initSqlJs();
  db = new SQL.Database();
  db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    message TEXT NOT NULL,
    page TEXT DEFAULT '',
    lang TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now', '+1 hour'))
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT ''
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hu_title TEXT NOT NULL DEFAULT '',
    hu_content TEXT NOT NULL DEFAULT '',
    en_title TEXT NOT NULL DEFAULT '',
    en_content TEXT NOT NULL DEFAULT '',
    de_title TEXT NOT NULL DEFAULT '',
    de_content TEXT NOT NULL DEFAULT '',
    ro_title TEXT NOT NULL DEFAULT '',
    ro_content TEXT NOT NULL DEFAULT '',
    image TEXT DEFAULT '',
    published INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now', '+1 hour')),
    updated_at TEXT DEFAULT (datetime('now', '+1 hour'))
  )`);
  return db;
}

export interface Submission {
  id: number; name: string; email: string; phone: string;
  message: string; page: string; lang: string; created_at: string;
}

export async function insertSubmission(data: { name: string; email: string; phone?: string; message: string; page?: string; lang?: string }): Promise<number> {
  const kv = getKv();
  const id = Date.now();
  const entry = {
    id,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    message: data.message,
    page: data.page || '',
    lang: data.lang || '',
    created_at: new Date().toISOString(),
  };
  if (kv) {
    const existing = JSON.parse(await kv.get('submissions') || '[]');
    existing.push(entry);
    await kv.put('submissions', JSON.stringify(existing));
    return id;
  }
  if (!isEdge()) {
    const d = await getDb();
    d.run('INSERT INTO submissions (name, email, phone, message, page, lang) VALUES (?, ?, ?, ?, ?, ?)',
      [data.name, data.email, data.phone || '', data.message, data.page || '', data.lang || '']);
    return id;
  }
  const fallback = (globalThis as any).__submissions || [];
  fallback.push(entry);
  (globalThis as any).__submissions = fallback;
  return id;
}

export async function getAllSubmissions(): Promise<Submission[]> {
  const kv = getKv();
  if (kv) {
    const raw = await kv.get('submissions');
    return raw ? JSON.parse(raw) : [];
  }
  if (!isEdge()) {
    const d = await getDb();
    const stmt = d.prepare('SELECT * FROM submissions ORDER BY created_at DESC');
    const rows: Submission[] = [];
    while (stmt.step()) rows.push(stmt.getAsObject() as unknown as Submission);
    stmt.free();
    return rows;
  }
  return ((globalThis as any).__submissions || []).reverse();
}

export async function getSetting(key: string): Promise<string> {
  const kv = getKv();
  if (kv) return (await kv.get(`setting_${key}`)) || '';
  if (!isEdge()) {
    const d = await getDb();
    const stmt = d.prepare('SELECT value FROM settings WHERE key = ?');
    stmt.bind([key]);
    if (stmt.step()) {
      const row = stmt.getAsObject() as unknown as { value: string };
      stmt.free();
      return row.value;
    }
    stmt.free();
  }
  return '';
}

export async function setSetting(key: string, value: string): Promise<void> {
  const kv = getKv();
  if (kv) {
    await kv.put(`setting_${key}`, value);
    return;
  }
  if (!isEdge()) {
    const d = await getDb();
    d.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
    return;
  }
  const s = (globalThis as any).__settings || {};
  s[key] = value;
  (globalThis as any).__settings = s;
}

// Blog types (unchanged)
export interface BlogPost {
  id: number;
  hu_title: string; hu_content: string;
  en_title: string; en_content: string;
  de_title: string; de_content: string;
  ro_title: string; ro_content: string;
  image: string; published: number;
  created_at: string; updated_at: string;
}

export type BlogPostInput = {
  hu_title?: string; hu_content?: string;
  en_title?: string; en_content?: string;
  de_title?: string; de_content?: string;
  ro_title?: string; ro_content?: string;
  image?: string; published?: number;
};

function getNextId(): number {
  const k = '__blog_id';
  const v = ((globalThis as any)[k] || 0) as number;
  (globalThis as any)[k] = v + 1;
  return v + 1;
}

export async function createPost(data: BlogPostInput): Promise<number> {
  const id = getNextId();
  const entry: BlogPost = {
    id,
    hu_title: data.hu_title || '', hu_content: data.hu_content || '',
    en_title: data.en_title || '', en_content: data.en_content || '',
    de_title: data.de_title || '', de_content: data.de_content || '',
    ro_title: data.ro_title || '', ro_content: data.ro_content || '',
    image: data.image || '', published: data.published ?? 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const posts: BlogPost[] = (globalThis as any).__posts || [];
  posts.push(entry);
  (globalThis as any).__posts = posts;
  return id;
}

export async function updatePost(id: number, data: BlogPostInput): Promise<void> {
  const posts: BlogPost[] = (globalThis as any).__posts || [];
  const idx = posts.findIndex((p) => p.id === id);
  if (idx !== -1) {
    posts[idx] = { ...posts[idx], ...data, updated_at: new Date().toISOString() };
    (globalThis as any).__posts = posts;
  }
}

export async function deletePost(id: number): Promise<void> {
  const posts: BlogPost[] = (globalThis as any).__posts || [];
  (globalThis as any).__posts = posts.filter((p) => p.id !== id);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return (globalThis as any).__posts || [];
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  return ((globalThis as any).__posts || []).filter((p: BlogPost) => p.published === 1);
}
