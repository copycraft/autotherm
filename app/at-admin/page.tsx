"use client";

import { useCallback, useEffect, useState } from "react";
import type { BlogPost, Submission } from "@/app/lib/db";

/**
 * Admin dashboard - /at-admin (robots-disallowed).
 * Three panels: form submissions, multilingual blog editor, email settings.
 * Authenticates against the admin API via HTTP Basic; the password is kept
 * in sessionStorage for the session only.
 */

const LANG_FIELDS = [
  { code: "hu", label: "Magyar" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "ro", label: "Română" },
] as const;

type Tab = "submissions" | "blog" | "settings";

interface PostDraft {
  id: number | null;
  hu_title: string;
  hu_content: string;
  en_title: string;
  en_content: string;
  de_title: string;
  de_content: string;
  ro_title: string;
  ro_content: string;
  image: string;
  published: boolean;
}

const EMPTY_DRAFT: PostDraft = {
  id: null,
  hu_title: "",
  hu_content: "",
  en_title: "",
  en_content: "",
  de_title: "",
  de_content: "",
  ro_title: "",
  ro_content: "",
  image: "",
  published: false,
};

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 focus:ring-2 focus:ring-brand-500 focus-visible:outline-none";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [tab, setTab] = useState<Tab>("submissions");

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [draft, setDraft] = useState<PostDraft>(EMPTY_DRAFT);
  const [settings, setSettingsState] = useState({ apiKey: "", from: "", to: "", stats: { foundedYear: 1992, customers: 3000, annualConversions: 280, employees: 33 } });
  const [notice, setNotice] = useState("");

  const authHeader = useCallback((): Record<string, string> => {
    const pass =
      password || window.sessionStorage.getItem("at-admin-pass") || "";
    return { Authorization: `Basic ${btoa(`admin:${pass}`)}` };
  }, [password]);

  const loadAll = useCallback(async () => {
    try {
      const headers = authHeader();
      const [subsRes, postsRes, settingsRes] = await Promise.all([
        fetch("/api/admin/submissions", { headers }),
        fetch("/api/admin/blog", { headers }),
        fetch("/api/admin/settings", { headers }),
      ]);
      if (!subsRes.ok) throw new Error("unauthorized");
      const subs = await subsRes.json();
      const blog = await postsRes.json();
      const conf = await settingsRes.json();
      setSubmissions(subs.submissions ?? []);
      setPosts(blog.posts ?? []);
      setSettingsState({
        apiKey: conf.apiKey ?? "",
        from: conf.from ?? "",
        to: conf.to ?? "",
        stats: conf.stats ?? { foundedYear: 1992, customers: 3000, annualConversions: 280, employees: 33 },
      });
      return true;
    } catch {
      return false;
    }
  }, [authHeader]);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("at-admin-pass");
    if (stored) {
      const id = setTimeout(() => {
        setPassword(stored);
        setAuthed(true);
      }, 0);
      return () => clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    if (authed) {
      const id = setTimeout(() => void loadAll(), 0);
      return () => clearTimeout(id);
    }
  }, [authed, loadAll]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    window.sessionStorage.setItem("at-admin-pass", password);
    const ok = await loadAll();
    if (ok) {
      setAuthed(true);
      setLoginError(false);
    } else {
      window.sessionStorage.removeItem("at-admin-pass");
      setLoginError(true);
    }
  }

  async function saveDraft() {
    const headers = { ...authHeader(), "content-type": "application/json" };
    const payload = {
      hu_title: draft.hu_title,
      hu_content: draft.hu_content,
      en_title: draft.en_title,
      en_content: draft.en_content,
      de_title: draft.de_title,
      de_content: draft.de_content,
      ro_title: draft.ro_title,
      ro_content: draft.ro_content,
      image: draft.image || null,
      published: draft.published ? 1 : 0,
    };
    const res = draft.id
      ? await fetch("/api/admin/blog", {
          method: "PUT",
          headers,
          body: JSON.stringify({ id: draft.id, ...payload }),
        })
      : await fetch("/api/admin/blog", {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
    setNotice(res.ok ? "Saved." : "Save failed.");
    setDraft(EMPTY_DRAFT);
    await loadAll();
  }

  async function removePost(id: number) {
    await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { ...authHeader(), "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadAll();
  }

  async function saveSettings() {
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { ...authHeader(), "content-type": "application/json" },
      body: JSON.stringify({
        apiKey: settings.apiKey,
        from: settings.from,
        to: settings.to,
        stats: settings.stats,
      }),
    });
    setNotice(res.ok ? "Settings saved." : "Save failed.");
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-950 px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lifted"
        >
          <h1 className="text-xl font-extrabold tracking-tight text-ink-900">
            Autotherm Admin
          </h1>
          <label htmlFor="admin-pass" className="mt-6 block text-xs font-bold text-ink-600 uppercase">
            Password
          </label>
          <input
            id="admin-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputCls} mt-2`}
            autoFocus
          />
          {loginError && (
            <p className="mt-3 text-sm font-semibold text-red-600" role="alert">
              Invalid password.
            </p>
          )}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
          >
            Sign in
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink-50 pb-24">
      <header className="bg-ink-950 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-lg font-extrabold text-white">Autotherm Admin</h1>
          <button
            type="button"
            onClick={() => {
              window.sessionStorage.removeItem("at-admin-pass");
              setAuthed(false);
              setPassword("");
            }}
            className="rounded-full px-4 py-2 text-sm font-semibold text-ink-300 ring-1 ring-white/15 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:outline-none"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-6xl px-6">
        <div className="flex gap-2" role="tablist" aria-label="Admin sections">
          {(
            [
              ["submissions", `Submissions (${submissions.length})`],
              ["blog", `Blog (${posts.length})`],
              ["settings", "Settings"],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none ${
                tab === id
                  ? "bg-brand-600 text-white"
                  : "bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {notice && (
          <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 ring-1 ring-brand-200" role="status">
            {notice}
          </p>
        )}

        {tab === "submissions" && (
          <div className="mt-6 flex flex-col gap-3">
            {submissions.length === 0 && (
              <p className="rounded-2xl bg-white p-8 text-center text-sm text-ink-500 ring-1 ring-ink-200">
                No submissions yet.
              </p>
            )}
            {submissions.map((s) => (
              <article key={s.id} className="rounded-2xl bg-white p-5 ring-1 ring-ink-200">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-bold text-ink-900">
                    {s.name}{" "}
                    <a href={`mailto:${s.email}`} className="font-semibold text-brand-600">
                      {s.email}
                    </a>
                    {s.phone && <span className="ml-2 text-sm text-ink-500">{s.phone}</span>}
                  </p>
                  <p className="text-xs text-ink-400">
                    #{s.id} · {s.created_at} · {s.page ?? "-"} ({s.lang ?? "-"})
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-ink-700">
                  {s.message}
                </p>
              </article>
            ))}
          </div>
        )}

        {tab === "blog" && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section className="rounded-2xl bg-white p-6 ring-1 ring-ink-200">
              <h2 className="text-base font-extrabold text-ink-900">
                {draft.id ? `Edit post #${draft.id}` : "New post"}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {LANG_FIELDS.map((l) => (
                  <div key={l.code}>
                    <p className="mb-1.5 text-xs font-bold text-ink-500 uppercase">{l.label}</p>
                    <input
                      type="text"
                      placeholder={`${l.label} title`}
                      value={draft[`${l.code}_title`]}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, [`${l.code}_title`]: e.target.value }))
                      }
                      className={inputCls}
                    />
                    <textarea
                      placeholder={`${l.label} content (Markdown)`}
                      rows={4}
                      value={draft[`${l.code}_content`]}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, [`${l.code}_content`]: e.target.value }))
                      }
                      className={`${inputCls} mt-2 resize-y`}
                    />
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={draft.image}
                  onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
                  className={inputCls}
                />
                <label className="flex items-center gap-2 text-sm font-semibold text-ink-700">
                  <input
                    type="checkbox"
                    checked={draft.published}
                    onChange={(e) => setDraft((d) => ({ ...d, published: e.target.checked }))}
                    className="h-4 w-4 accent-brand-600"
                  />
                  Published
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => void saveDraft()}
                    className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                  >
                    {draft.id ? "Update" : "Create"}
                  </button>
                  {draft.id && (
                    <button
                      type="button"
                      onClick={() => setDraft(EMPTY_DRAFT)}
                      className="rounded-full px-6 py-2.5 text-sm font-semibold text-ink-600 ring-1 ring-ink-200 hover:bg-ink-100 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-3">
              {posts.map((p) => (
                <article key={p.id} className="rounded-2xl bg-white p-5 ring-1 ring-ink-200">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-ink-900">
                        #{p.id} {p.hu_title || p.en_title || "(untitled)"}
                      </p>
                      <p className="mt-1 text-xs text-ink-400">
                        {p.published ? "Published" : "Draft"} · {p.updated_at}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            id: p.id,
                            hu_title: p.hu_title ?? "",
                            hu_content: p.hu_content ?? "",
                            en_title: p.en_title ?? "",
                            en_content: p.en_content ?? "",
                            de_title: p.de_title ?? "",
                            de_content: p.de_content ?? "",
                            ro_title: p.ro_title ?? "",
                            ro_content: p.ro_content ?? "",
                            image: p.image ?? "",
                            published: p.published === 1,
                          })
                        }
                        className="rounded-full px-4 py-1.5 text-xs font-bold text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void removePost(p.id)}
                        className="rounded-full px-4 py-1.5 text-xs font-bold text-red-700 ring-1 ring-red-200 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>
        )}

        {tab === "settings" && (
          <section className="mt-6 max-w-lg rounded-2xl bg-white p-6 ring-1 ring-ink-200">
            <h2 className="text-base font-extrabold text-ink-900">Email (Brevo)</h2>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <label htmlFor="set-key" className="mb-1.5 block text-xs font-bold text-ink-500 uppercase">
                  Brevo API key
                </label>
                <input
                  id="set-key"
                  type="text"
                  value={settings.apiKey}
                  onChange={(e) => setSettingsState((s) => ({ ...s, apiKey: e.target.value }))}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="set-from" className="mb-1.5 block text-xs font-bold text-ink-500 uppercase">
                  From address
                </label>
                <input
                  id="set-from"
                  type="email"
                  value={settings.from}
                  onChange={(e) => setSettingsState((s) => ({ ...s, from: e.target.value }))}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="set-to" className="mb-1.5 block text-xs font-bold text-ink-500 uppercase">
                  To address
                </label>
                <input
                  id="set-to"
                  type="email"
                  value={settings.to}
                  onChange={(e) => setSettingsState((s) => ({ ...s, to: e.target.value }))}
                  className={inputCls}
                />
              </div>
            </div>

            <h2 className="mt-8 text-base font-extrabold text-ink-900">Site Stats</h2>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <label htmlFor="stat-founded" className="mb-1.5 block text-xs font-bold text-ink-500 uppercase">
                  Founded year
                </label>
                <input
                  id="stat-founded"
                  type="number"
                  value={settings.stats.foundedYear}
                  onChange={(e) => setSettingsState((s) => ({ ...s, stats: { ...s.stats, foundedYear: Number(e.target.value) } }))}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="stat-customers" className="mb-1.5 block text-xs font-bold text-ink-500 uppercase">
                  Satisfied customers
                </label>
                <input
                  id="stat-customers"
                  type="number"
                  value={settings.stats.customers}
                  onChange={(e) => setSettingsState((s) => ({ ...s, stats: { ...s.stats, customers: Number(e.target.value) } }))}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="stat-conversions" className="mb-1.5 block text-xs font-bold text-ink-500 uppercase">
                  Annual conversions
                </label>
                <input
                  id="stat-conversions"
                  type="number"
                  value={settings.stats.annualConversions}
                  onChange={(e) => setSettingsState((s) => ({ ...s, stats: { ...s.stats, annualConversions: Number(e.target.value) } }))}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="stat-employees" className="mb-1.5 block text-xs font-bold text-ink-500 uppercase">
                  Employees
                </label>
                <input
                  id="stat-employees"
                  type="number"
                  value={settings.stats.employees}
                  onChange={(e) => setSettingsState((s) => ({ ...s, stats: { ...s.stats, employees: Number(e.target.value) } }))}
                  className={inputCls}
                />
              </div>
              <button
                type="button"
                onClick={() => void saveSettings()}
                className="self-start rounded-full bg-brand-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
              >
                Save settings
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
