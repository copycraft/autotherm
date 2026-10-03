"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { LeadRow } from "@/app/lib/db";

/**
 * Campaign tracking: (1) a link builder that tags ad URLs with UTM
 * parameters, (2) a results table showing which source / campaign produced
 * enquiries. Lead rows only exist for visitors who accepted cookies.
 */

const SITE = "https://hutoautok.hu";

const PAGES = [
  { label: "Főoldal (HU)", path: "/hu" },
  { label: "Árajánlatkérés (HU)", path: "/hu/arajanlatkeres" },
  { label: "Termékeink (HU)", path: "/hu/termekeink" },
  { label: "Szerviz (HU)", path: "/hu/szerviz" },
  { label: "Home (EN)", path: "/en" },
  { label: "Quotation (EN)", path: "/en/quotation" },
  { label: "Startseite (DE)", path: "/de" },
  { label: "Angebot (DE)", path: "/de/anfrage" },
  { label: "Acasă (RO)", path: "/ro" },
  { label: "Cerere ofertă (RO)", path: "/ro/cerere-oferta" },
];

const CHANNELS = [
  { label: "Facebook / Instagram hirdetés", source: "facebook", medium: "paid-social" },
  { label: "Google Ads (kereső)", source: "google", medium: "cpc" },
  { label: "Google Ads (display / YouTube)", source: "google", medium: "display" },
  { label: "Hírlevél", source: "newsletter", medium: "email" },
  { label: "Egyéb", source: "", medium: "" },
];

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 focus:ring-2 focus:ring-brand-500 focus-visible:outline-none";

const slug = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function CampaignsPanel({
  authHeader,
}: {
  authHeader: () => Record<string, string>;
}) {
  /* ------------------------------ Link builder ----------------------------- */
  const [path, setPath] = useState(PAGES[1].path);
  const [channel, setChannel] = useState(0);
  const [source, setSource] = useState(CHANNELS[0].source);
  const [medium, setMedium] = useState(CHANNELS[0].medium);
  const [campaign, setCampaign] = useState("");
  const [content, setContent] = useState("");
  const [term, setTerm] = useState("");
  const [copied, setCopied] = useState(false);

  const link = useMemo(() => {
    const p = new URLSearchParams();
    if (source) p.set("utm_source", slug(source));
    if (medium) p.set("utm_medium", slug(medium));
    if (campaign) p.set("utm_campaign", slug(campaign));
    if (content) p.set("utm_content", slug(content));
    if (term) p.set("utm_term", slug(term));
    const q = p.toString();
    return `${SITE}${path}${q ? `?${q}` : ""}`;
  }, [path, source, medium, campaign, content, term]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked: the link is selectable in the box anyway.
    }
  }

  /* -------------------------------- Results -------------------------------- */
  const [days, setDays] = useState(30);
  const [leads, setLeads] = useState<LeadRow[] | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/campaigns?days=${days}`, {
        headers: authHeader(),
      });
      const json = await res.json();
      setLeads(json.leads ?? []);
    } catch {
      setLeads([]);
    }
  }, [days, authHeader]);

  useEffect(() => {
    const id = setTimeout(() => void load(), 0);
    return () => clearTimeout(id);
  }, [load]);

  const rows = useMemo(() => {
    const map = new Map<
      string,
      { source: string; medium: string; campaign: string; count: number; quote: number }
    >();
    for (const l of leads ?? []) {
      const key = `${l.source}|${l.medium}|${l.campaign}`;
      const row = map.get(key) ?? {
        source: l.source || "(ismeretlen)",
        medium: l.medium || "-",
        campaign: l.campaign || "-",
        count: 0,
        quote: 0,
      };
      row.count += 1;
      if (l.form_type === "quotation") row.quote += 1;
      map.set(key, row);
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [leads]);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="rounded-2xl bg-white p-6 ring-1 ring-ink-200">
        <h2 className="text-lg font-extrabold text-ink-900">Hirdetési link készítő</h2>
        <p className="mt-1 text-sm text-ink-500">
          Ezt a linket add meg célURL-ként a Facebook / Google hirdetésben. A
          paraméterekből látjuk, melyik hirdetés hozott ajánlatkérést.
        </p>

        <div className="mt-5 flex flex-col gap-4">
          <label className="text-xs font-bold text-ink-700 uppercase">
            Cél oldal
            <select
              className={`${inputCls} mt-1`}
              value={path}
              onChange={(e) => setPath(e.target.value)}
            >
              {PAGES.map((p) => (
                <option key={p.path} value={p.path}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold text-ink-700 uppercase">
            Csatorna
            <select
              className={`${inputCls} mt-1`}
              value={channel}
              onChange={(e) => {
                const i = Number(e.target.value);
                setChannel(i);
                setSource(CHANNELS[i].source);
                setMedium(CHANNELS[i].medium);
              }}
            >
              {CHANNELS.map((c, i) => (
                <option key={c.label} value={i}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          {CHANNELS[channel].source === "" && (
            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputCls}
                placeholder="forrás (utm_source)"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
              <input
                className={inputCls}
                placeholder="médium (utm_medium)"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
              />
            </div>
          )}
          <label className="text-xs font-bold text-ink-700 uppercase">
            Kampány neve
            <input
              className={`${inputCls} mt-1`}
              placeholder="pl. tavaszi-hutofurgon"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-bold text-ink-700 uppercase">
              Hirdetés / kreatív (opcionális)
              <input
                className={`${inputCls} mt-1`}
                placeholder="pl. banner-fekete-sprinter"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <label className="text-xs font-bold text-ink-700 uppercase">
              Kulcsszó (opcionális)
              <input
                className={`${inputCls} mt-1`}
                placeholder="pl. hutoauto-ar"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </label>
          </div>

          <div>
            <p className="text-xs font-bold text-ink-700 uppercase">A kész link</p>
            <textarea
              readOnly
              rows={3}
              className={`${inputCls} mt-1 font-mono text-xs`}
              value={link}
              onFocus={(e) => e.target.select()}
            />
            <button
              type="button"
              onClick={() => void copy()}
              className="mt-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
            >
              {copied ? "Másolva ✓" : "Link másolása"}
            </button>
          </div>
          {!campaign && (
            <p className="text-xs text-amber-700">
              Adj meg kampánynevet, különben nem lehet megkülönböztetni a kampányokat.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 ring-1 ring-ink-200">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold text-ink-900">Eredmények (ajánlatkérések)</h2>
          <select
            className="rounded-lg border border-ink-200 px-3 py-1.5 text-sm"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            <option value={7}>7 nap</option>
            <option value={30}>30 nap</option>
            <option value={90}>90 nap</option>
            <option value={365}>1 év</option>
          </select>
        </div>

        {leads === null ? (
          <p className="mt-6 text-sm text-ink-500">Betöltés…</p>
        ) : rows.length === 0 ? (
          <p className="mt-6 rounded-xl bg-ink-50 p-6 text-center text-sm text-ink-500">
            Még nincs nyomon követett ajánlatkérés ebben az időszakban.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-ink-500 uppercase">
                <tr>
                  <th className="py-2 pr-3">Forrás</th>
                  <th className="py-2 pr-3">Médium</th>
                  <th className="py-2 pr-3">Kampány</th>
                  <th className="py-2 pr-3 text-right">Ajánlatkérés</th>
                  <th className="py-2 text-right">Ebből árajánlat</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={`${r.source}|${r.medium}|${r.campaign}`}
                    className="border-t border-ink-100"
                  >
                    <td className="py-2 pr-3 font-semibold text-ink-900">{r.source}</td>
                    <td className="py-2 pr-3 text-ink-600">{r.medium}</td>
                    <td className="py-2 pr-3 text-ink-600">{r.campaign}</td>
                    <td className="py-2 pr-3 text-right font-bold">{r.count}</td>
                    <td className="py-2 text-right">{r.quote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-ink-400">Összesen: {leads.length}</p>
          </div>
        )}
        <p className="mt-5 text-xs leading-relaxed text-ink-400">
          Csak azokat a látogatókat látjuk, akik elfogadták a sütiket, ezért a valós szám ennél
          magasabb lehet. A látogatószám, a kattintások és a költség a Google Analytics, a Google
          Ads és a Meta Ads Manager felületén látható.
        </p>
      </section>
    </div>
  );
}
