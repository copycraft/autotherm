import { getCloudflareContext } from '@opennextjs/cloudflare';

let sqliteDb: any = null;

function getD1(): any {
  try {
    const ctx = getCloudflareContext();
    const db = (ctx.env as any).DB;
    if (db) return db;
  } catch {}
  return null;
}

async function getSqliteDb() {
  if (sqliteDb) return sqliteDb;
  const Database = (await import('better-sqlite3')).default;
  const { default: path } = await import('path');
  const { default: fs } = await import('fs');
  const DB_PATH = path.join(process.cwd(), 'data', 'autotherm.db');
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  sqliteDb = new Database(DB_PATH);
  sqliteDb.pragma('journal_mode = WAL');
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      message TEXT NOT NULL,
      page TEXT DEFAULT '',
      lang TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now', '+1 hour'))
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS posts (
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
    );
  `);
  return sqliteDb;
}

function isD1Available(): boolean {
  return getD1() !== null;
}

async function d1Run(sql: string, ...params: any[]): Promise<number> {
  const db = getD1();
  const stmt = db.prepare(sql);
  const result: any = await stmt.bind(...params).run();
  return result.meta?.last_row_id ?? 0;
}

async function d1All(sql: string, ...params: any[]): Promise<any[]> {
  const db = getD1();
  const stmt = db.prepare(sql);
  const result: any = await stmt.bind(...params).all();
  return result.results ?? [];
}

async function d1Get(sql: string, ...params: any[]): Promise<any> {
  const db = getD1();
  const stmt = db.prepare(sql);
  return await stmt.bind(...params).first();
}

async function d1Update(sql: string, ...params: any[]): Promise<void> {
  const db = getD1();
  const stmt = db.prepare(sql);
  await stmt.bind(...params).run();
}

export interface Submission {
  id: number; name: string; email: string; phone: string;
  message: string; page: string; lang: string; created_at: string;
}

export async function insertSubmission(data: { name: string; email: string; phone?: string; message: string; page?: string; lang?: string }): Promise<number> {
  if (isD1Available()) {
    return d1Run(
      'INSERT INTO submissions (name, email, phone, message, page, lang) VALUES (?, ?, ?, ?, ?, ?)',
      data.name, data.email, data.phone || '', data.message, data.page || '', data.lang || ''
    );
  }
  const db = await getSqliteDb();
  const stmt = db.prepare('INSERT INTO submissions (name, email, phone, message, page, lang) VALUES (?, ?, ?, ?, ?, ?)');
  const result = stmt.run(data.name, data.email, data.phone || '', data.message, data.page || '', data.lang || '');
  return result.lastInsertRowid as number;
}

export async function getAllSubmissions(): Promise<Submission[]> {
  if (isD1Available()) {
    return d1All('SELECT * FROM submissions ORDER BY created_at DESC');
  }
  const db = await getSqliteDb();
  return db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all() as Submission[];
}

export async function getSetting(key: string): Promise<string> {
  if (isD1Available()) {
    const row = await d1Get('SELECT value FROM settings WHERE key = ?', key);
    return row?.value ?? '';
  }
  const db = await getSqliteDb();
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined;
  return row?.value || '';
}

export async function setSetting(key: string, value: string): Promise<void> {
  if (isD1Available()) {
    await d1Update('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', key, value);
    return;
  }
  const db = await getSqliteDb();
  db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, value);
}

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

export async function createPost(data: BlogPostInput): Promise<number> {
  if (isD1Available()) {
    return d1Run(
      'INSERT INTO posts (hu_title, hu_content, en_title, en_content, de_title, de_content, ro_title, ro_content, image, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      data.hu_title||'', data.hu_content||'', data.en_title||'', data.en_content||'',
      data.de_title||'', data.de_content||'', data.ro_title||'', data.ro_content||'',
      data.image||'', data.published??0
    );
  }
  const db = await getSqliteDb();
  const stmt = db.prepare(`INSERT INTO posts (hu_title, hu_content, en_title, en_content, de_title, de_content, ro_title, ro_content, image, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const result = stmt.run(data.hu_title||'', data.hu_content||'', data.en_title||'', data.en_content||'',
    data.de_title||'', data.de_content||'', data.ro_title||'', data.ro_content||'',
    data.image||'', data.published??0);
  return result.lastInsertRowid as number;
}

export async function updatePost(id: number, data: BlogPostInput): Promise<void> {
  if (isD1Available()) {
    await d1Update(
      "UPDATE posts SET hu_title=?, hu_content=?, en_title=?, en_content=?, de_title=?, de_content=?, ro_title=?, ro_content=?, image=?, published=?, updated_at=datetime('now','+1 hour') WHERE id=?",
      data.hu_title||'', data.hu_content||'', data.en_title||'', data.en_content||'',
      data.de_title||'', data.de_content||'', data.ro_title||'', data.ro_content||'',
      data.image||'', data.published??0, id
    );
    return;
  }
  const db = await getSqliteDb();
  db.prepare(`UPDATE posts SET hu_title=?, hu_content=?, en_title=?, en_content=?, de_title=?, de_content=?, ro_title=?, ro_content=?, image=?, published=?, updated_at=datetime('now','+1 hour') WHERE id=?`)
    .run(data.hu_title||'', data.hu_content||'', data.en_title||'', data.en_content||'',
      data.de_title||'', data.de_content||'', data.ro_title||'', data.ro_content||'',
      data.image||'', data.published??0, id);
}

export async function deletePost(id: number): Promise<void> {
  if (isD1Available()) {
    await d1Update('DELETE FROM posts WHERE id = ?', id);
    return;
  }
  const db = await getSqliteDb();
  db.prepare('DELETE FROM posts WHERE id = ?').run(id);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (isD1Available()) {
    return d1All('SELECT * FROM posts ORDER BY created_at DESC');
  }
  const db = await getSqliteDb();
  return db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all() as BlogPost[];
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (isD1Available()) {
    return d1All('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC');
  }
  const db = await getSqliteDb();
  return db.prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC').all() as BlogPost[];
}
