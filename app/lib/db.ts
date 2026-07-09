import initSqlJs, { type Database } from 'sql.js';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'submissions.db');

let db: Database | null = null;

function isEdge(): boolean {
  return typeof process === 'undefined' || !process.versions?.node;
}

async function getDb(): Promise<Database> {
  if (db) return db;
  const SQL = await initSqlJs();
  if (isEdge() || !fs.existsSync(path.dirname(DB_PATH))) {
    db = new SQL.Database();
  } else {
    try {
      const buffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(buffer);
    } catch {
      db = new SQL.Database();
    }
  }
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
  save();
  return db;
}

function save() {
  if (isEdge()) return;
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const data = db!.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  } catch { /* ignore on edge */ }
}

export interface Submission {
  id: number; name: string; email: string; phone: string;
  message: string; page: string; lang: string; created_at: string;
}

export async function insertSubmission(data: { name: string; email: string; phone?: string; message: string; page?: string; lang?: string }): Promise<number> {
  const d = await getDb();
  d.run('INSERT INTO submissions (name, email, phone, message, page, lang) VALUES (?, ?, ?, ?, ?, ?)',
    [data.name, data.email, data.phone || '', data.message, data.page || '', data.lang || '']);
  save();
  const stmt = d.prepare('SELECT last_insert_rowid() as id');
  stmt.step();
  const row = stmt.getAsObject() as unknown as { id: number };
  stmt.free();
  return row.id;
}

export async function getAllSubmissions(): Promise<Submission[]> {
  const d = await getDb();
  const stmt = d.prepare('SELECT * FROM submissions ORDER BY created_at DESC');
  const rows: Submission[] = [];
  while (stmt.step()) rows.push(stmt.getAsObject() as unknown as Submission);
  stmt.free();
  return rows;
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
  const d = await getDb();
  d.run(`INSERT INTO posts (hu_title, hu_content, en_title, en_content, de_title, de_content, ro_title, ro_content, image, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.hu_title||'', data.hu_content||'', data.en_title||'', data.en_content||'',
     data.de_title||'', data.de_content||'', data.ro_title||'', data.ro_content||'',
     data.image||'', data.published??0]);
  save();
  const stmt = d.prepare('SELECT last_insert_rowid() as id');
  stmt.step();
  const row = stmt.getAsObject() as unknown as { id: number };
  stmt.free();
  return row.id;
}

export async function updatePost(id: number, data: BlogPostInput): Promise<void> {
  const d = await getDb();
  d.run(`UPDATE posts SET hu_title=?, hu_content=?, en_title=?, en_content=?, de_title=?, de_content=?, ro_title=?, ro_content=?, image=?, published=?, updated_at=datetime('now','+1 hour') WHERE id=?`,
    [data.hu_title||'', data.hu_content||'', data.en_title||'', data.en_content||'',
     data.de_title||'', data.de_content||'', data.ro_title||'', data.ro_content||'',
     data.image||'', data.published??0, id]);
  save();
}

export async function deletePost(id: number): Promise<void> {
  const d = await getDb();
  d.run('DELETE FROM posts WHERE id = ?', [id]);
  save();
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const d = await getDb();
  const stmt = d.prepare('SELECT * FROM posts ORDER BY created_at DESC');
  const rows: BlogPost[] = [];
  while (stmt.step()) rows.push(stmt.getAsObject() as unknown as BlogPost);
  stmt.free();
  return rows;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const d = await getDb();
  const stmt = d.prepare("SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC");
  const rows: BlogPost[] = [];
  while (stmt.step()) rows.push(stmt.getAsObject() as unknown as BlogPost);
  stmt.free();
  return rows;
}
