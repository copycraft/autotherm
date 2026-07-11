'use client';
import { useState } from 'react';

interface Submission {
  id: number; name: string; email: string; phone: string;
  message: string; page: string; lang: string; created_at: string;
}

interface BlogPost {
  id: number;
  hu_title: string; hu_content: string;
  en_title: string; en_content: string;
  de_title: string; de_content: string;
  ro_title: string; ro_content: string;
  image: string; published: number;
  created_at: string; updated_at: string;
}

function basicAuthToken(): string {
  if (typeof window === 'undefined') return '';
  return btoa('admin:admin');
}

const emptyPost = {
  hu_title: '', hu_content: '', en_title: '', en_content: '',
  de_title: '', de_content: '', ro_title: '', ro_content: '',
  image: '', published: 0,
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') return sessionStorage.getItem('at-admin-auth') === '1';
    return false;
  });
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'submissions' | 'blog' | 'smtp'>('blog');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [smtp, setSmtp] = useState({ host: '', port: '587', user: '', pass: '', from: '', notify: '' });
  const [smtpLoaded, setSmtpLoaded] = useState(false);

  const langs = ['hu', 'en', 'de', 'ro'] as const;
  const langLabel: Record<string, string> = { hu: 'Magyar', en: 'English', de: 'Deutsch', ro: 'Română' };

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === 'admin') {
      setAuthenticated(true);
      sessionStorage.setItem('at-admin-auth', '1');
    } else alert('Hibás jelszó!');
  }

  async function loadSubmissions() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { Authorization: `Basic ${basicAuthToken()}` },
      });
      const data = await res.json();
      if (data.success) setSubmissions(data.submissions);
    } catch { alert('Hiba a betöltéskor'); }
    finally { setLoading(false); }
  }

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog', {
        headers: { Authorization: `Basic ${basicAuthToken()}` },
      });
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch { alert('Hiba a blog betöltésekor'); }
    finally { setLoading(false); }
  }

  async function savePost() {
    if (!editingPost) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blog`, {
        method: editingPost.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${basicAuthToken()}` },
        body: JSON.stringify(editingPost),
      });
      const data = await res.json();
      if (data.success) {
        setEditingPost(null);
        await loadPosts();
      }
    } catch { alert('Hiba mentéskor'); }
    finally { setSaving(false); }
  }

  async function deletePost(id: number) {
    if (!confirm('Törlöd ezt a bejegyzést?')) return;
    try {
      await fetch('/api/admin/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${basicAuthToken()}` },
        body: JSON.stringify({ id }),
      });
      await loadPosts();
    } catch { alert('Hiba törléskor'); }
  }

  async function loadSmtp() {
    try {
      const res = await fetch('/api/admin/settings', {
        headers: { Authorization: `Basic ${basicAuthToken()}` },
      });
      const data = await res.json();
      if (data && data.host !== undefined) setSmtp({ host: data.host, port: data.port || '587', user: data.user, pass: data.pass || '', from: data.from, notify: data.notify });
    } catch {}
    setSmtpLoaded(true);
  }

  async function saveSmtp() {
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${basicAuthToken()}` },
        body: JSON.stringify(smtp),
      });
      alert('SMTP beállítások elmentve!');
    } catch { alert('Hiba mentéskor'); }
  }

  function switchTab(t: 'submissions' | 'blog' | 'smtp') {
    setTab(t);
    setEditingPost(null);
    if (t === 'submissions' && submissions.length === 0) loadSubmissions();
    if (t === 'blog' && posts.length === 0) loadPosts();
  }

  function handleLogout() {
    setAuthenticated(false);
    sessionStorage.removeItem('at-admin-auth');
  }

  function setLangField(lang: string, field: 'title' | 'content', value: string) {
    if (!editingPost) return;
    setEditingPost({ ...editingPost, [`${lang}_${field}`]: value });
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#4a68a9]">Admin belépés</h1>
          <input
            type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Jelszó"
            className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9] mb-4"
          />
          <button type="submit" className="button w-full text-center">Belépés</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b border-[#d9d9d9]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-[#4a68a9]">Admin</h1>
            <nav className="flex gap-1">
              <button onClick={() => switchTab('blog')}
                className={`px-4 py-1.5 text-sm font-semibold rounded transition-colors ${tab === 'blog' ? 'bg-[#4a68a9] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                Blog
              </button>
              <button onClick={() => switchTab('submissions')}
                className={`px-4 py-1.5 text-sm font-semibold rounded transition-colors ${tab === 'submissions' ? 'bg-[#4a68a9] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                Űrlapok {submissions.length > 0 && `(${submissions.length})`}
              </button>
              <button onClick={() => { switchTab('smtp'); if (!smtpLoaded) loadSmtp(); }}
                className={`px-4 py-1.5 text-sm font-semibold rounded transition-colors ${tab === 'smtp' ? 'bg-[#4a68a9] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                SMTP
              </button>
            </nav>
          </div>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Kijelentkezés</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {tab === 'blog' && !editingPost && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Blog bejegyzések</h2>
              <button onClick={() => setEditingPost({ ...emptyPost })}
                className="button text-sm py-2 px-4">+ Új bejegyzés</button>
            </div>

            {posts.length === 0 && !loading && (
              <div className="bg-white p-8 text-center text-gray-400">Nincsenek bejegyzések.</div>
            )}

            {posts.length > 0 && (
              <div className="space-y-3">
                {posts.map((p) => (
                  <div key={p.id} className="bg-white p-4 rounded-lg shadow-sm border border-[#d9d9d9] flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {p.published ? 'Publikus' : 'Rejtett'}
                        </span>
                        <span className="font-semibold truncate">{p.hu_title || '(nincs cím)'}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        HU · EN · DE · RO — {p.created_at}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 ml-4">
                      <button onClick={() => setEditingPost({ ...p })}
                        className="text-sm text-[#4a68a9] hover:underline">Szerkeszt</button>
                      <button onClick={() => deletePost(p.id)}
                        className="text-sm text-red-500 hover:underline">Töröl</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'blog' && editingPost && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d9d9d9] max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editingPost.id ? 'Bejegyzés szerkesztése' : 'Új bejegyzés'}</h2>
              <button onClick={() => setEditingPost(null)}
                className="text-sm text-gray-500 hover:text-gray-700">Vissza</button>
            </div>

            <div className="space-y-6">
              {langs.map((l) => (
                <div key={l} className="border border-[#e0e0e0] rounded-lg p-4">
                  <h3 className="text-sm font-bold text-[#4a68a9] mb-3 uppercase tracking-wider">{langLabel[l]}</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Cím</label>
                      <input type="text" value={(editingPost as any)[`${l}_title`] || ''}
                        onChange={(e) => setLangField(l, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#4a68a9] text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Tartalom (HTML)</label>
                      <textarea rows={5} value={(editingPost as any)[`${l}_content`] || ''}
                        onChange={(e) => setLangField(l, 'content', e.target.value)}
                        className="w-full px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#4a68a9] text-sm font-mono" />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editingPost.published === 1}
                    onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked ? 1 : 0 })}
                    className="accent-[#4a68a9]" />
                  <span className="text-sm font-semibold">Publikus</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={savePost} disabled={saving}
                  className="button text-sm py-2.5 px-6">
                  {saving ? 'Mentés...' : 'Mentés'}
                </button>
                <button onClick={() => setEditingPost(null)}
                  className="text-sm text-gray-500 hover:text-gray-700">Mégsem</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'smtp' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d9d9d9] max-w-lg">
            <h2 className="text-xl font-bold mb-6">SMTP beállítások</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">SMTP Host</label>
                <input type="text" value={smtp.host} onChange={(e) => setSmtp({...smtp, host: e.target.value})}
                  placeholder="smtp-relay.brevo.com"
                  className="w-full px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#4a68a9] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Port</label>
                <input type="text" value={smtp.port} onChange={(e) => setSmtp({...smtp, port: e.target.value})}
                  className="w-full px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#4a68a9] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Felhasználónév (login)</label>
                <input type="text" value={smtp.user} onChange={(e) => setSmtp({...smtp, user: e.target.value})}
                  placeholder="b1aa16001@smtp-brevo.com"
                  className="w-full px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#4a68a9] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">SMTP kulcs (jelszó)</label>
                <input type="password" value={smtp.pass} onChange={(e) => setSmtp({...smtp, pass: e.target.value})}
                  placeholder="********"
                  className="w-full px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#4a68a9] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Feladó email (From)</label>
                <input type="text" value={smtp.from} onChange={(e) => setSmtp({...smtp, from: e.target.value})}
                  placeholder="hutoautok@hutoautok.hu"
                  className="w-full px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#4a68a9] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Értesítési email (hová menjen)</label>
                <input type="text" value={smtp.notify} onChange={(e) => setSmtp({...smtp, notify: e.target.value})}
                  placeholder="vastag.peter@autotherm.hu"
                  className="w-full px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#4a68a9] text-sm" />
              </div>
              <button onClick={saveSmtp} className="button text-sm py-2.5 px-6">Mentés</button>
            </div>
          </div>
        )}

        {tab === 'submissions' && (
          <>
            <button onClick={loadSubmissions} disabled={loading}
              className="button mb-6">{loading ? 'Betöltés...' : 'Frissítés'}
            </button>

            {submissions.length === 0 && (
              <div className="bg-white p-8 text-center text-gray-400">Nincsenek beküldések.</div>
            )}

            {submissions.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-sm text-sm">
                  <thead>
                    <tr className="bg-[#f5f5f5] border-b border-[#d9d9d9]">
                      <th className="text-left px-4 py-3 font-semibold">ID</th>
                      <th className="text-left px-4 py-3 font-semibold">Dátum</th>
                      <th className="text-left px-4 py-3 font-semibold">Név</th>
                      <th className="text-left px-4 py-3 font-semibold">Email</th>
                      <th className="text-left px-4 py-3 font-semibold">Telefon</th>
                      <th className="text-left px-4 py-3 font-semibold">Oldal</th>
                      <th className="text-left px-4 py-3 font-semibold">Nyelv</th>
                      <th className="text-left px-4 py-3 font-semibold">Üzenet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s) => (
                      <tr key={s.id} className="border-b border-[#eee] hover:bg-[#fafafa]">
                        <td className="px-4 py-3 text-gray-400">{s.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{s.created_at}</td>
                        <td className="px-4 py-3 font-medium">{s.name}</td>
                        <td className="px-4 py-3"><a href={`mailto:${s.email}`} className="text-[#4a68a9]">{s.email}</a></td>
                        <td className="px-4 py-3">{s.phone}</td>
                        <td className="px-4 py-3 text-gray-500">{s.page}</td>
                        <td className="px-4 py-3 uppercase text-xs font-bold">{s.lang}</td>
                        <td className="px-4 py-3 max-w-xs truncate">{s.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
