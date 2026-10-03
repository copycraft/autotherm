import { readConsent } from "@/app/lib/consent";

/**
 * Marketing-attribution helpers (client only).
 *
 * Nothing is stored or sent unless the visitor accepted cookies. Landing-page
 * parameters are held in memory until then so a visitor who accepts on the
 * first page is still attributed to the ad / campaign that brought them.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

const ATTR_KEY = "autotherm-attribution";

const CLICK_ID_PARAMS = ["gclid", "gbraid", "wbraid", "fbclid", "msclkid"] as const;

const SEARCH_ENGINES = /(^|\.)(google|bing|yahoo|duckduckgo|ecosia|yandex|seznam)\./i;
const SOCIAL = /(^|\.)(facebook|instagram|linkedin|youtube|t\.co|twitter|x)\./i;

export interface Touch {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  /** Ad-click identifier, if any (gclid / gbraid / wbraid / fbclid / msclkid). */
  clickId: string;
  landing: string;
  referrer: string;
  at: string;
}

interface Stored {
  first: Touch;
  last: Touch;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Landing data, read once per page load and kept in memory. */
let landing: Touch | null | undefined;

function readLanding(): Touch | null {
  if (landing !== undefined) return landing;
  const params = new URLSearchParams(window.location.search);
  const get = (k: string) => params.get(k)?.slice(0, 120) ?? "";

  let referrerHost = "";
  try {
    referrerHost = document.referrer ? new URL(document.referrer).hostname : "";
  } catch {
    referrerHost = "";
  }
  if (referrerHost === window.location.hostname) referrerHost = "";

  const clickId =
    CLICK_ID_PARAMS.map((p) => (get(p) ? `${p}=${get(p)}` : "")).find(Boolean) ?? "";

  let source = get("utm_source");
  let medium = get("utm_medium");
  if (!source) {
    if (get("gclid") || get("gbraid") || get("wbraid")) {
      source = "google";
      medium = medium || "cpc";
    } else if (get("fbclid")) {
      source = "facebook";
      medium = medium || "paid-social";
    } else if (get("msclkid")) {
      source = "bing";
      medium = medium || "cpc";
    } else if (referrerHost) {
      source = referrerHost.replace(/^www\./, "");
      medium = SEARCH_ENGINES.test(referrerHost)
        ? "organic"
        : SOCIAL.test(referrerHost)
          ? "social"
          : "referral";
    }
  }

  if (!source && !clickId) {
    landing = null; // direct visit - nothing worth recording
    return landing;
  }

  landing = {
    source,
    medium: medium || "(none)",
    campaign: get("utm_campaign"),
    term: get("utm_term"),
    content: get("utm_content"),
    clickId,
    landing: window.location.pathname,
    referrer: referrerHost,
    at: new Date().toISOString(),
  };
  return landing;
}

/** Call once on page load (before consent) to remember the landing data. */
export function noteLanding(): void {
  readLanding();
}

/** Persist first/last touch. Only does anything after the visitor accepted cookies. */
export function persistAttribution(): void {
  if (readConsent() !== "accepted") return;
  const touch = readLanding();
  if (!touch) return;
  try {
    const raw = window.localStorage.getItem(ATTR_KEY);
    const prev: Stored | null = raw ? (JSON.parse(raw) as Stored) : null;
    const next: Stored = { first: prev?.first ?? touch, last: touch };
    window.localStorage.setItem(ATTR_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage failures.
  }
}

function describe(t: Touch): string {
  const parts = [`${t.source || "(direct)"} / ${t.medium}`];
  if (t.campaign) parts.push(`campaign: ${t.campaign}`);
  if (t.term) parts.push(`term: ${t.term}`);
  if (t.content) parts.push(`content: ${t.content}`);
  if (t.clickId) parts.push(t.clickId);
  parts.push(`landing: ${t.landing}`);
  return parts.join(", ");
}

/** Short summary for form submissions; "" without consent or data. */
export function attributionSummary(): string {
  if (readConsent() !== "accepted") return "";
  try {
    const raw = window.localStorage.getItem(ATTR_KEY);
    if (!raw) return "";
    const s = JSON.parse(raw) as Stored;
    const last = describe(s.last);
    const first = describe(s.first);
    return first === last
      ? `Source: ${last}`
      : `Last touch: ${last}\nFirst touch: ${first}`;
  } catch {
    return "";
  }
}

/** Structured first/last touch as JSON for the server ("" without consent or data). */
export function attributionJson(): string {
  if (readConsent() !== "accepted") return "";
  try {
    return window.localStorage.getItem(ATTR_KEY) ?? "";
  } catch {
    return "";
  }
}

/** Send a GA4 event; silently does nothing unless analytics is loaded. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", name, params);
  // Meta: a finished enquiry is the "Lead" standard event.
  if (name === "generate_lead" && typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}
