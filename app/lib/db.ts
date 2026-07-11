function getKv(): { get: (k: string) => Promise<string | null>; put: (k: string, v: string) => Promise<void> } | null {
  try {
    const ns = (globalThis as any).FORM_SUBMISSIONS;
    if (ns?.get && ns?.put) return ns;
  } catch {}
  return null;
}

function store(): { submissions: any[]; settings: Record<string, string>; posts: any[]; nextPostId: number } {
  let s = (globalThis as any).__store;
  if (!s) {
    s = { submissions: [], settings: {}, posts: [], nextPostId: 1 };
    (globalThis as any).__store = s;
  }
  return s;
}

export interface Submission {
  id: number; name: string; email: string; phone: string;
  message: string; page: string; lang: string; created_at: string;
}

export async function insertSubmission(data: { name: string; email: string; phone?: string; message: string; page?: string; lang?: string }): Promise<number> {
  const kv = getKv();
  const id = Date.now();
  const entry: Submission = {
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
  store().submissions.push(entry);
  return id;
}

export async function getAllSubmissions(): Promise<Submission[]> {
  const kv = getKv();
  if (kv) {
    const raw = await kv.get('submissions');
    return raw ? JSON.parse(raw).reverse() : [];
  }
  return [...store().submissions].reverse();
}

export async function getSetting(key: string): Promise<string> {
  const kv = getKv();
  if (kv) return (await kv.get(`setting_${key}`)) || '';
  return store().settings[key] || '';
}

export async function setSetting(key: string, value: string): Promise<void> {
  const kv = getKv();
  if (kv) {
    await kv.put(`setting_${key}`, value);
    return;
  }
  store().settings[key] = value;
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
  const s = store();
  const id = s.nextPostId++;
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
  s.posts.push(entry);
  return id;
}

export async function updatePost(id: number, data: BlogPostInput): Promise<void> {
  const s = store();
  const idx = s.posts.findIndex((p: BlogPost) => p.id === id);
  if (idx !== -1) {
    s.posts[idx] = { ...s.posts[idx], ...data, updated_at: new Date().toISOString() };
  }
}

export async function deletePost(id: number): Promise<void> {
  const s = store();
  s.posts = s.posts.filter((p: BlogPost) => p.id !== id);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return store().posts;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  return store().posts.filter((p: BlogPost) => p.published === 1);
}
