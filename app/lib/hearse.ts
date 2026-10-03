import type { Metadata } from "next";
import { LANGS, type Lang } from "./constants";
import type { IconName } from "./page-content";
import { HEARSE_DICTS } from "./hearse-i18n";

/**
 * halottszallito.hu - the hearse / funeral-vehicle site.
 *
 * Same app as hutoautok.hu: next.config.ts rewrites requests on the hearse
 * host to the app/(hearse)/hearse/[lang] route tree, which has its own root
 * layout, charcoal-and-gold theme (data-theme="hearse" in globals.css),
 * navigation and pages.
 *
 * Hungarian is the default language and keeps the unprefixed paths
 * ("/miert-mi"); English, German and Romanian live under /en, /de and /ro
 * with their own slugs. Copy is in app/lib/hearse-i18n; the Hungarian text is
 * the company's own from the original halottszallito.hu site.
 *
 * Preview locally at http://hearse.localhost:<port>/ so links resolve the same way.
 */

export const HEARSE_SITE_URL = "https://halottszallito.hu";
export const HEARSE_NAME = "Halottszállító";
export const HEARSE_DEFAULT_LANG: Lang = "hu";

export const HEARSE_PAGES = ["home", "why", "product", "builds", "quote"] as const;
export type HearsePage = (typeof HEARSE_PAGES)[number];

/** Page slugs per language ("" is the language's home page). */
export const HEARSE_SLUGS: Record<Lang, Record<HearsePage, string>> = {
  hu: {
    home: "",
    why: "miert-mi",
    product: "termekunk",
    builds: "halottas-auto-atalakitasaink",
    quote: "halottasauto-arak",
  },
  en: {
    home: "",
    why: "why-us",
    product: "product",
    builds: "hearse-vans",
    quote: "request-a-quote",
  },
  de: {
    home: "",
    why: "warum-wir",
    product: "produkt",
    builds: "bestattungsfahrzeuge",
    quote: "angebot-anfordern",
  },
  ro: {
    home: "",
    why: "de-ce-noi",
    product: "produs",
    builds: "autovehicule-funerare",
    quote: "cerere-oferta",
  },
};

/** Public path of a page on the hearse domain: "/miert-mi", "/en/why-us". */
export function hearsePath(page: HearsePage, lang: Lang): string {
  const prefix = lang === HEARSE_DEFAULT_LANG ? "" : `/${lang}`;
  const slug = HEARSE_SLUGS[lang][page];
  return slug ? `${prefix}/${slug}` : prefix || "/";
}

export function hearsePageForSlug(lang: Lang, slug: string): HearsePage | null {
  return HEARSE_PAGES.find((p) => p !== "home" && HEARSE_SLUGS[lang][p] === slug) ?? null;
}

/** Reads a public hearse path back into its language and page, for the header. */
export function parseHearsePath(pathname: string): { lang: Lang; page: HearsePage | null } {
  const [first = "", ...rest] = pathname.split("/").filter(Boolean);
  const prefixed = (LANGS as readonly string[]).includes(first) && first !== HEARSE_DEFAULT_LANG;
  const lang = (prefixed ? first : HEARSE_DEFAULT_LANG) as Lang;
  const slug = (prefixed ? rest : [first, ...rest]).filter(Boolean).join("/");
  return { lang, page: slug ? hearsePageForSlug(lang, slug) : "home" };
}

export function getHearseDict(lang: Lang) {
  return HEARSE_DICTS[lang];
}

/** Title, description, canonical and hreflang alternates for one page. */
export function hearseMetadata(page: HearsePage, lang: Lang): Metadata {
  const { title, description } = HEARSE_DICTS[lang].seo[page];
  const languages: Record<string, string> = Object.fromEntries(
    LANGS.map((l) => [l, hearsePath(page, l)]),
  );
  languages["x-default"] = hearsePath(page, HEARSE_DEFAULT_LANG);
  return {
    title,
    description,
    alternates: { canonical: hearsePath(page, lang), languages },
  };
}

/** Sales contact for hearse conversions (from the original site). */
export const HEARSE_CONTACT = {
  name: "Busa Ádám",
  initials: "BÁ",
  phone: "+36 20 223 1316",
  phoneHref: "tel:+36202231316",
  email: "busa.adam@autotherm.hu",
  emailHref: "mailto:busa.adam@autotherm.hu",
};

/** The main site, for cross-links (legal pages, company info). */
export const MAIN_SITE_URL = "https://hutoautok.hu";

/** Icons for the eight product features, in the order of `features` in the copy. */
export const HEARSE_FEATURE_ICONS: IconName[] = [
  "layers",
  "shield",
  "thermometer",
  "check",
  "wrench",
  "truck",
  "clock",
  "medal",
];

/** Icons for the seven "why us" reasons. */
export const HEARSE_WHY_ICONS: IconName[] = [
  "medal",
  "shield",
  "factory",
  "wrench",
  "heart",
  "truck",
  "check",
];

/**
 * Finished hearse conversions, numbered in build order. Studio and workshop
 * shots, centred on each card (shown at about native size). Each build has a
 * cover plus its gallery; files live under /images/hearse/builds/.
 */
export const HEARSE_BUILDS: { id: string; no: string; image: string; gallery: string[] }[] =
  Array.from({ length: 18 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `build-${n}`,
      no: n,
      image: `/images/hearse/builds/${n}-1.webp`,
      gallery: [1, 2, 3, 4].map((k) => `/images/hearse/builds/${n}-${k}.webp`),
    };
  });
