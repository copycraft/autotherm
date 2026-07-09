'use client';
import { useState } from 'react';

interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  page: string;
  lang: string;
  created_at: string;
}

function basicAuthToken(): string {
  if (typeof window === 'undefined') return '';
  return btoa('admin:admin');
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') return sessionStorage.getItem('at-admin-auth') === '1';
    return false;
  });
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === 'admin') {
      setAuthenticated(true);
      sessionStorage.setItem('at-admin-auth', '1');
    } else {
      alert('Hibás jelszó!');
    }
  }

  async function loadSubmissions() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { Authorization: `Basic ${basicAuthToken()}` },
      });
      const data = await res.json();
      if (data.success) setSubmissions(data.submissions);
    } catch {
      alert('Hiba a betöltéskor');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    sessionStorage.removeItem('at-admin-auth');
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#4a68a9]">Admin belépés</h1>
          <input
            type="password"
            value={password}
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
          <h1 className="text-lg font-bold text-[#4a68a9]">Admin — Kapcsolatfelvételi űrlapok</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{submissions.length} beküldés</span>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Kijelentkezés</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
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
      </div>
    </div>
  );
}
