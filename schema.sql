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
