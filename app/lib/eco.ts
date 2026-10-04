import type { Metadata } from "next";
import { LANGS, type Lang } from "./constants";
import type { IconName } from "./page-content";
import { ECO_DICTS } from "./eco-i18n";

/**
 * ehutoauto.hu - the electric refrigerated vehicle site.
 *
 * Same app as hutoautok.hu: next.config.ts rewrites requests on the eco host to
 * the app/(eco)/eco/[lang] route tree, which has its own root layout, green
 * theme (data-theme="eco" in globals.css), navigation and pages.
 *
 * Hungarian is the default language and keeps the unprefixed paths
 * ("/technologia"); English, German and Romanian live under /en, /de and /ro
 * with their own slugs. Copy is in app/lib/eco-i18n; the Hungarian text is the
 * company's own from the original ehutoauto.hu site.
 *
 * Preview locally at http://eco.localhost:<port>/ so links resolve the same way.
 */

export const ECO_SITE_URL = "https://ehutoauto.hu";
export const ECO_NAME = "Zero Emission";
export const ECO_DEFAULT_LANG: Lang = "hu";

export const ECO_PAGES = ["home", "why", "technology", "vehicles", "quote"] as const;
export type EcoPage = (typeof ECO_PAGES)[number];

/** Page slugs per language ("" is the language's home page). */
export const ECO_SLUGS: Record<Lang, Record<EcoPage, string>> = {
  hu: {
    home: "",
    why: "miert-elektromos",
    technology: "technologia",
    vehicles: "jarmuvek",
    quote: "arajanlatkeres",
  },
  en: {
    home: "",
    why: "why-electric",
    technology: "technology",
    vehicles: "vehicles",
    quote: "request-a-quote",
  },
  de: {
    home: "",
    why: "warum-elektrisch",
    technology: "technologie",
    vehicles: "fahrzeuge",
    quote: "angebot-anfordern",
  },
  ro: {
    home: "",
    why: "de-ce-electric",
    technology: "tehnologie",
    vehicles: "vehicule",
    quote: "cerere-oferta",
  },
};

/** Public path of a page on the eco domain: "/technologia", "/en/technology". */
export function ecoPath(page: EcoPage, lang: Lang): string {
  const prefix = lang === ECO_DEFAULT_LANG ? "" : `/${lang}`;
  const slug = ECO_SLUGS[lang][page];
  return slug ? `${prefix}/${slug}` : prefix || "/";
}

export function ecoPageForSlug(lang: Lang, slug: string): EcoPage | null {
  return ECO_PAGES.find((p) => p !== "home" && ECO_SLUGS[lang][p] === slug) ?? null;
}

/** Reads a public eco path back into its language and page, for the header. */
export function parseEcoPath(pathname: string): { lang: Lang; page: EcoPage | null } {
  const [first = "", ...rest] = pathname.split("/").filter(Boolean);
  const prefixed = (LANGS as readonly string[]).includes(first) && first !== ECO_DEFAULT_LANG;
  const lang = (prefixed ? first : ECO_DEFAULT_LANG) as Lang;
  const slug = (prefixed ? rest : [first, ...rest]).filter(Boolean).join("/");
  return { lang, page: slug ? ecoPageForSlug(lang, slug) : "home" };
}

export function getEcoDict(lang: Lang) {
  return ECO_DICTS[lang];
}

/** Title, description, canonical and hreflang alternates for one page. */
export function ecoMetadata(page: EcoPage, lang: Lang): Metadata {
  const { title, description } = ECO_DICTS[lang].seo[page];
  const languages: Record<string, string> = Object.fromEntries(
    LANGS.map((l) => [l, ecoPath(page, l)]),
  );
  languages["x-default"] = ecoPath(page, ECO_DEFAULT_LANG);
  return {
    title,
    description,
    alternates: { canonical: ecoPath(page, lang), languages },
  };
}

/** Sales contact for electric conversions (from the original site). */
export const ECO_CONTACT = {
  name: "Busa Ádám",
  initials: "BÁ",
  phone: "+36 20 223 1316",
  phoneHref: "tel:+36202231316",
  email: "busa.adam@autotherm.hu",
  emailHref: "mailto:busa.adam@autotherm.hu",
};

/** The main site, for cross-links (legal pages, company info). */
export const MAIN_SITE_URL = "https://hutoautok.hu";

/** Icons for the eight system features, in the order of `features` in the copy. */
export const ECO_FEATURE_ICONS: IconName[] = [
  "layers",
  "truck",
  "clock",
  "spark",
  "thermometer",
  "heart",
  "check",
  "shield",
];

/**
 * Electric vans converted to refrigerated vehicles, current model years, from
 * small to large. Manufacturer studio shots, cut out and centred on a white
 * 521×365 canvas so every card matches (shown at about native size).
 */
export const ECO_VEHICLES: { make: string; model: string; image: string }[] = [
  { make: "Peugeot", model: "E-Partner", image: "/images/eco/peugeot-e-partner.webp" },
  { make: "Citroën", model: "ë-Berlingo", image: "/images/eco/citroen-e-berlingo.webp" },
  { make: "Opel", model: "Combo Electric", image: "/images/eco/opel-combo-electric.webp" },
  { make: "Toyota", model: "Proace City Electric", image: "/images/eco/toyota-proace-city-electric.webp" },
  { make: "Nissan", model: "Townstar EV", image: "/images/eco/nissan-townstar-ev.webp" },
  { make: "BYD", model: "ETP3", image: "/images/eco/byd-etp3.webp" },
  { make: "Kia", model: "PV5 Cargo", image: "/images/eco/kia-pv5-cargo.webp" },
  { make: "Mercedes-Benz", model: "eVito", image: "/images/eco/mercedes-evito.webp" },
  { make: "Mercedes-Benz", model: "eSprinter", image: "/images/eco/mercedes-esprinter.webp" },
];
