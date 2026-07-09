import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'submissions.db');

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.exec(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT DEFAULT '',
        message TEXT NOT NULL,
        page TEXT DEFAULT '',
        lang TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now', '+1 hour'))
      )
    `);
  }
  return db;
}

export interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  page: string;
  lang: string;
  created_at: string;
}

export function insertSubmission(data: { name: string; email: string; phone?: string; message: string; page?: string; lang?: string }): number {
  const stmt = getDb().prepare(
    'INSERT INTO submissions (name, email, phone, message, page, lang) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const result = stmt.run(data.name, data.email, data.phone || '', data.message, data.page || '', data.lang || '');
  return result.lastInsertRowid as number;
}

export function getAllSubmissions(): Submission[] {
  const rows = getDb().prepare('SELECT * FROM submissions ORDER BY created_at DESC').all() as Submission[];
  return rows;
}
