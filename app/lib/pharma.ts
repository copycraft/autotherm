import type { Metadata } from "next";
import { BCP47, COMPANY, LANGS, type Lang } from "./constants";
import type { IconName } from "./page-content";
import { PHARMA_DICTS } from "./pharma-i18n";

/**
 * Pharmacontrol - temperature-controlled vehicles for pharmaceutical transport.
 *
 * Same app as hutoautok.hu: next.config.ts rewrites requests on the pharma host
 * to the app/(pharma)/pharma/[lang] route tree, which has its own root layout,
 * lime theme (data-theme="pharma" in globals.css), navigation and pages.
 *
 * Hungarian is the default language and keeps the unprefixed paths
 * ("/megoldasok"); English, German and Romanian live under /en, /de and /ro
 * with their own slugs. Copy is in app/lib/pharma-i18n.
 *
 * Preview locally at http://pharmacontrol.localhost:<port>/ so links resolve
 * the same way.
 */

export const PHARMA_SITE_URL = "https://pharmacontrol.hutoautok.hu";
/** One brand name in every language. */
export const PHARMA_NAME = "Pharmacontrol";
export const PHARMA_DEFAULT_LANG: Lang = "hu";

export const PHARMA_PAGES = ["home", "why", "solutions", "quote"] as const;
export type PharmaPage = (typeof PHARMA_PAGES)[number];

/** Page slugs per language ("" is the language's home page). */
export const PHARMA_SLUGS: Record<Lang, Record<PharmaPage, string>> = {
  hu: {
    home: "",
    why: "miert-pharmacontrol",
    solutions: "megoldasok",
    quote: "arajanlatkeres",
  },
  en: {
    home: "",
    why: "why-pharmacontrol",
    solutions: "solutions",
    quote: "request-a-quote",
  },
  de: {
    home: "",
    why: "warum-pharmacontrol",
    solutions: "loesungen",
    quote: "angebot-anfordern",
  },
  ro: {
    home: "",
    why: "de-ce-pharmacontrol",
    solutions: "solutii",
    quote: "cerere-oferta",
  },
};

/** Public path of a page on the pharma domain: "/megoldasok", "/en/solutions". */
export function pharmaPath(page: PharmaPage, lang: Lang): string {
  const prefix = lang === PHARMA_DEFAULT_LANG ? "" : `/${lang}`;
  const slug = PHARMA_SLUGS[lang][page];
  return slug ? `${prefix}/${slug}` : prefix || "/";
}

export function pharmaPageForSlug(lang: Lang, slug: string): PharmaPage | null {
  return PHARMA_PAGES.find((p) => p !== "home" && PHARMA_SLUGS[lang][p] === slug) ?? null;
}

/** Reads a public pharma path back into its language and page, for the header. */
export function parsePharmaPath(pathname: string): { lang: Lang; page: PharmaPage | null } {
  const [first = "", ...rest] = pathname.split("/").filter(Boolean);
  const prefixed = (LANGS as readonly string[]).includes(first) && first !== PHARMA_DEFAULT_LANG;
  const lang = (prefixed ? first : PHARMA_DEFAULT_LANG) as Lang;
  const slug = (prefixed ? rest : [first, ...rest]).filter(Boolean).join("/");
  return { lang, page: slug ? pharmaPageForSlug(lang, slug) : "home" };
}

export function getPharmaDict(lang: Lang) {
  return PHARMA_DICTS[lang];
}

/* -------------------------------------------------------------------------- */
/*  Keyword corpus - base terms per language plus per-page extras. ASCII       */
/*  variants included: many queries are typed without accents.                */
/* -------------------------------------------------------------------------- */

export const PHARMA_BASE_KEYWORDS: Record<Lang, string[]> = {
  hu: [
    "gyógyszerszállító hűtőautó", "gyógyszerszállító jármű", "gyógyszer szállítás hűtőautó",
    "hűtött gyógyszerszállítás", "temperált gyógyszerszállítás", "gyógyszerszállító furgon",
    "hűtőautó gyógyszerhez", "2-8 fokos szállítás", "hőmérséklet-szabályozott szállítás",
    "gyogyszerszallito hutoauto", "gyogyszer szallitas hutoauto", "oltóanyag szállítás hűtőautó",
    "patikai kiszállítás hűtőautó", "pharmacontrol",
  ],
  en: [
    "pharmaceutical transport vehicle", "pharma refrigerated van", "temperature controlled pharma van",
    "pharmaceutical cold chain vehicle", "medicine transport refrigerated van", "GDP transport vehicle",
    "2-8 C transport van", "vaccine transport van", "pharma delivery van", "refrigerated van for pharmacies",
    "controlled temperature van conversion", "pharmacontrol",
  ],
  de: [
    "Pharmatransporter", "Pharma Kühlfahrzeug", "temperaturgeführter Pharmatransport",
    "Arzneimitteltransport Kühlfahrzeug", "Kühlfahrzeug für Medikamente", "GDP Transportfahrzeug",
    "2-8 Grad Transporter", "Impfstofftransport Kühlfahrzeug", "Pharma Kühltransporter Umbau",
    "Apothekenlieferung Kühlfahrzeug", "pharmacontrol",
  ],
  ro: [
    "vehicul transport medicamente", "autofrigorifică medicamente", "autofrigorifica medicamente",
    "transport farmaceutic cu temperatură controlată", "furgon frigorific farmacie",
    "transport vaccinuri frigorific", "vehicul GDP", "transport 2-8 grade", "duba frigorifica medicamente",
    "pharmacontrol",
  ],
};

export const PHARMA_PAGE_KEYWORDS: Record<PharmaPage, Partial<Record<Lang, string[]>>> = {
  home: {
    hu: ["gyógyszerszállító járműgyártás", "Autotherm gyógyszerszállító"],
    en: ["pharma vehicle manufacturer", "Autotherm pharma vehicles"],
    de: ["Pharmafahrzeug Hersteller", "Autotherm Pharmatransporter"],
    ro: ["producător vehicule farmaceutice", "Autotherm vehicule medicamente"],
  },
  why: {
    hu: ["gyógyszerszállítás hűtési lánc", "GDP gyógyszerszállítás", "gyógyszer hűtési lánc követelmények"],
    en: ["pharma cold chain requirements", "GDP vehicle requirements", "why temperature controlled pharma transport"],
    de: ["Pharma Kühlkette Anforderungen", "GDP Fahrzeuganforderungen", "temperaturgeführter Pharmatransport Vorteile"],
    ro: ["cerințe lanț frigorific farmaceutic", "cerințe vehicul GDP", "transport medicamente temperatură controlată"],
  },
  solutions: {
    hu: ["gyógyszerszállító furgon átalakítás", "hűtött gyógyszerszállító kisfurgon", "gyógyszerszállító doboz"],
    en: ["pharma van conversion", "refrigerated pharma delivery van", "pharma box body"],
    de: ["Pharma Transporter Umbau", "Kühltransporter Apothekenbelieferung", "Pharma Kühlkoffer"],
    ro: ["transformare furgon farmaceutic", "furgon frigorific livrare farmacii", "cutie frigorifică farmaceutică"],
  },
  quote: {
    hu: ["gyógyszerszállító jármű árajánlat", "gyógyszerszállító hűtőautó ár", "gyógyszerszállító árkérés"],
    en: ["pharma transport vehicle quote", "pharma van price", "request pharma van quote"],
    de: ["Pharmatransporter Angebot", "Pharma Kühlfahrzeug Preis", "Angebot Pharmatransporter"],
    ro: ["ofertă vehicul transport medicamente", "preț autofrigorifică medicamente", "cerere ofertă vehicul farmaceutic"],
  },
};

/** Title, description, keywords, canonical, hreflang, Open Graph and Twitter
 * metadata for one page - the same recipe as ecoMetadata / hearseMetadata. */
export function pharmaMetadata(page: PharmaPage, lang: Lang): Metadata {
  const { title, description } = PHARMA_DICTS[lang].seo[page];
  const path = pharmaPath(page, lang);
  const canonical = `${PHARMA_SITE_URL}${path === "/" ? "" : path}`;

  const languages: Record<string, string> = {};
  for (const l of LANGS) {
    const p = pharmaPath(page, l);
    languages[BCP47[l]] = `${PHARMA_SITE_URL}${p === "/" ? "" : p}`;
  }
  const defaultPath = pharmaPath(page, PHARMA_DEFAULT_LANG);
  languages["x-default"] = `${PHARMA_SITE_URL}${defaultPath === "/" ? "" : defaultPath}`;

  const keywords = [...PHARMA_BASE_KEYWORDS[lang], ...(PHARMA_PAGE_KEYWORDS[page]?.[lang] ?? [])];
  const image = `${PHARMA_SITE_URL}${PHARMA_OG_IMAGE}`;

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale: BCP47[lang].replace("-", "_"),
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => BCP47[l].replace("-", "_")),
      siteName: PHARMA_NAME,
      title,
      description,
      url: canonical,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Sales contact: the company's own line (no named person on this brand yet). */
export const PHARMA_CONTACT = {
  initials: "AT",
  phone: COMPANY.phone,
  phoneHref: COMPANY.phoneHref,
  email: COMPANY.email,
  emailHref: COMPANY.emailHref,
};

/** The main site, for cross-links (legal pages, company info). */
export const MAIN_SITE_URL = "https://hutoautok.hu";
/** The electric refrigerated vehicle site, for the electric-version cross-link. */
export const ECO_LINK = "https://ehutoauto.hutoautok.hu";

/** Share image: the open-doored reefer interior. */
export const PHARMA_OG_IMAGE = "/images/master-reefer-doors-open.webp";

/** Icons for the six build features, in the order of `features` in the copy. */
export const PHARMA_FEATURE_ICONS: IconName[] = [
  "thermometer",
  "shield",
  "snowflake",
  "clock",
  "layers",
  "wrench",
];

/** Photos for the home page gallery band, with their alt text per language. */
export const PHARMA_GALLERY: { src: string; alt: Record<Lang, string> }[] = [
  {
    src: "/images/caddy-reefer-evaporator.webp",
    alt: {
      hu: "Carrier hűtőegység a raktér mennyezetén",
      en: "Carrier refrigeration unit on the cargo ceiling",
      de: "Carrier-Kühlaggregat an der Laderaumdecke",
      ro: "Unitate frigorifică Carrier pe plafonul compartimentului",
    },
  },
  {
    src: "/images/eexpert-reefer-strip-curtain.webp",
    alt: {
      hu: "Lamellás függöny a hűtött raktér ajtajánál",
      en: "Strip curtain at the refrigerated cargo door",
      de: "Lamellenvorhang an der Tür des Kühlraums",
      ro: "Perdea cu lamele la ușa compartimentului frigorific",
    },
  },
  {
    src: "/images/ducato-box-interior.webp",
    alt: {
      hu: "Rozsdamentes, könnyen tisztítható raktér",
      en: "Stainless, easy-to-clean cargo area",
      de: "Edelstahl-Laderaum, leicht zu reinigen",
      ro: "Compartiment din inox, ușor de curățat",
    },
  },
  {
    src: "/images/caddy-reefer-interior.webp",
    alt: {
      hu: "Fehér, sima falú hűtött raktér LED-világítással",
      en: "White, smooth-walled refrigerated cargo area with LED lighting",
      de: "Weißer, glattwandiger Kühlraum mit LED-Beleuchtung",
      ro: "Compartiment frigorific alb, cu pereți netezi și iluminare LED",
    },
  },
];
