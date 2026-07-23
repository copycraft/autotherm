import { LANGS, type Lang } from "./constants";

/**
 * Central page registry. Every localized route on the site is described here -
 * navigation, sitemap generation, hreflang alternates and the dynamic
 * [lang]/[slug] resolver all read from this single source of truth.
 *
 * A `null` slug means the page does not exist in that language
 * (the legacy site never published it), so we neither route nor link to it.
 */

export type PageKey =
  | "home"
  | "about"
  | "products"
  | "service"
  | "carrierService"
  | "whyUs"
  | "gallery"
  | "contact"
  | "quotation"
  | "blog"
  | "commercialBodies"
  | "bodyRepair"
  | "ourService"
  | "configurator"
  | "vanIsolations"
  | "deceasedTransport"
  | "cooledBodies"
  | "terms"
  | "privacy";

export const ROUTES: Record<PageKey, Partial<Record<Lang, string>>> = {
  home: { hu: "", en: "", de: "", ro: "" },
  about: {
    hu: "kik-vagyunk",
    en: "who-are-we",
    de: "wer-sind-wir-3",
    ro: "cine-suntem-noi",
  },
  products: {
    hu: "termekeink",
    en: "our-products",
    de: "kuehlfahrzeug",
    ro: "carosari-furgoane-frigorifice",
  },
  service: { hu: "szerviz" },
  carrierService: { hu: "rakterhuto-szerviz" },
  whyUs: { hu: "miert-mi", en: "why-us", de: "warum-gerade-wir" },
  gallery: {
    hu: "kepgaleria",
    en: "galeries",
    de: "aufbauten-galerie",
    ro: "galerie-foto",
  },
  contact: { hu: "kapcsolat", en: "contact", de: "kontakt", ro: "contact-2" },
  quotation: {
    hu: "arajanlatkeres",
    en: "quotation",
    de: "anfrage",
    ro: "cerere-oferta",
  },
  blog: {
    hu: "hutoauto-blog",
    en: "hutoautoblog",
    de: "hutoauto-blog-2",
    ro: "blog",
  },
  commercialBodies: {
    hu: "haszonjarmu-felepitmenyek",
    en: "commercial-vehicle-bodies",
  },
  bodyRepair: { hu: "jarmufelepitmeny-javitas" },
  ourService: { hu: "szervizunk" },
  configurator: {
    hu: "konfigurator",
    en: "configurator",
    de: "configurator",
    ro: "configurator",
  },
  vanIsolations: { en: "van-isolations" },
  deceasedTransport: { en: "deceased-transport" },
  cooledBodies: { en: "cooled-refrigerated-vehicle-bodies" },
  terms: { hu: "altalanos-szerzodesi-feltetelek" },
  privacy: { hu: "adatkezelesi-tajekoztato" },
};

/** Absolute path for a page in a given language, e.g. `/hu/kik-vagyunk`. */
export function pathFor(key: PageKey, lang: Lang): string | null {
  const slug = ROUTES[key][lang];
  if (slug === undefined) return null;
  return slug === "" ? `/${lang}` : `/${lang}/${slug}`;
}

/** Resolve a slug within a language back to its page key. */
export function keyForSlug(lang: Lang, slug: string): PageKey | null {
  for (const [key, slugs] of Object.entries(ROUTES) as [
    PageKey,
    Partial<Record<Lang, string>>,
  ][]) {
    if (slugs[lang] === slug) return key;
  }
  return null;
}

/** All existing slugs for a language, excluding the homepage. */
export function slugsFor(lang: Lang): string[] {
  const out: string[] = [];
  for (const slugs of Object.values(ROUTES)) {
    const s = slugs[lang];
    if (s !== undefined && s !== "") out.push(s);
  }
  return out;
}

/** hreflang alternates for a page - only languages where the page exists. */
export function alternatesFor(key: PageKey): Partial<Record<Lang, string>> {
  const out: Partial<Record<Lang, string>> = {};
  for (const lang of LANGS) {
    const p = pathFor(key, lang);
    if (p !== null) out[lang] = p;
  }
  return out;
}

/**
 * When switching languages from a page that does not exist in the target
 * language, fall back to the target-language homepage.
 */
export function switchLangPath(key: PageKey, target: Lang): string {
  return pathFor(key, target) ?? `/${target}`;
}

/** Primary navigation, in display order, per language. */
export const NAV_KEYS: Record<Lang, PageKey[]> = {
  hu: [
    "home",
    "about",
    "products",
    "service",
    "whyUs",
    "gallery",
    "configurator",
    "blog",
    "contact",
  ],
  en: [
    "home",
    "about",
    "products",
    "whyUs",
    "gallery",
    "configurator",
    "blog",
    "contact",
  ],
  de: [
    "home",
    "about",
    "products",
    "whyUs",
    "gallery",
    "configurator",
    "blog",
    "contact",
  ],
  ro: [
    "home",
    "about",
    "products",
    "gallery",
    "configurator",
    "blog",
    "contact",
  ],
};

/** Compact footer navigation per language. */
export const FOOTER_KEYS: Record<Lang, PageKey[]> = {
  hu: ["home", "about", "products", "service", "whyUs", "gallery", "quotation"],
  en: ["home", "about", "products", "whyUs", "gallery", "quotation"],
  de: ["home", "about", "products", "whyUs", "gallery", "quotation"],
  ro: ["home", "about", "products", "gallery", "quotation"],
};
