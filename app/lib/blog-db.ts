import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'blog.db');

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.exec(`
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
      )
    `);
  }
  return db;
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
  image: string;
  published: number;
  created_at: string;
  updated_at: string;
}

export type BlogPostInput = {
  hu_title?: string; hu_content?: string;
  en_title?: string; en_content?: string;
  de_title?: string; de_content?: string;
  ro_title?: string; ro_content?: string;
  image?: string;
  published?: number;
};

export function createPost(data: BlogPostInput): number {
  const stmt = getDb().prepare(`
    INSERT INTO posts (hu_title, hu_content, en_title, en_content, de_title, de_content, ro_title, ro_content, image, published)
    VALUES (@hu_title, @hu_content, @en_title, @en_content, @de_title, @de_content, @ro_title, @ro_content, @image, @published)
  `);
  const result = stmt.run({
    hu_title: data.hu_title || '', hu_content: data.hu_content || '',
    en_title: data.en_title || '', en_content: data.en_content || '',
    de_title: data.de_title || '', de_content: data.de_content || '',
    ro_title: data.ro_title || '', ro_content: data.ro_content || '',
    image: data.image || '',
    published: data.published ?? 0,
  });
  return result.lastInsertRowid as number;
}

export function updatePost(id: number, data: BlogPostInput): void {
  const stmt = getDb().prepare(`
    UPDATE posts SET
      hu_title = @hu_title, hu_content = @hu_content,
      en_title = @en_title, en_content = @en_content,
      de_title = @de_title, de_content = @de_content,
      ro_title = @ro_title, ro_content = @ro_content,
      image = @image, published = @published,
      updated_at = datetime('now', '+1 hour')
    WHERE id = @id
  `);
  stmt.run({ id, ...data });
}

export function deletePost(id: number): void {
  getDb().prepare('DELETE FROM posts WHERE id = ?').run(id);
}

export function getAllPosts(): BlogPost[] {
  return getDb().prepare('SELECT * FROM posts ORDER BY created_at DESC').all() as BlogPost[];
}

export function getPost(id: number): BlogPost | undefined {
  return getDb().prepare('SELECT * FROM posts WHERE id = ?').get(id) as BlogPost | undefined;
}

export function getPublishedPosts(): BlogPost[] {
  return getDb().prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC').all() as BlogPost[];
}
