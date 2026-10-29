import type { Metadata } from "next";
import { BCP47, LANGS, type Lang } from "./constants";
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

export const ECO_SITE_URL = "https://ehutoauto.hutoautok.hu";
/**
 * Brand name per language: Hungarian keeps the original eHűtőautó, the other
 * languages use Zero Emission.
 */
export function ecoName(lang: Lang): string {
  return lang === "hu" ? "eHűtőautó" : "Zero Emission";
}
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

/* -------------------------------------------------------------------------- */
/*  Keyword corpus - base terms per language plus per-page extras, the same   */
/*  pattern as baseKeywords / extraKeywords on the main site. ASCII variants   */
/*  included: a large share of queries are typed without accents.             */
/* -------------------------------------------------------------------------- */

export const ECO_BASE_KEYWORDS: Record<Lang, string[]> = {
  hu: [
    "elektromos hűtőautó", "elektromos hűtős furgon", "e-hűtőautó", "elektromos furgon hűtés",
    "elektromos hűtőautó átalakítás", "emissziómentes hűtőautó", "önellátó hűtőegység",
    "akkupakk hűtőegység", "elektromos hutoauto", "elektromos hutos furgon", "ehutoauto",
    "e-hutoauto", "zöld hűtőautó", "csendes hűtőautó", "belvárosi hűtőautó",
    "elektromos hűtőautó árak", "elektromos furgon hűtőberendezés",
  ],
  en: [
    "electric refrigerated van", "electric reefer van", "electric cooled van",
    "electric refrigerated vehicle", "EV refrigerated van", "EV reefer",
    "zero emission refrigerated van", "zero emission reefer", "electric cold chain van",
    "battery refrigerated van", "self-contained refrigeration unit", "electric van refrigeration",
    "electric refrigerated conversion", "electric chiller van", "emission free refrigerated transport",
  ],
  de: [
    "Elektro-Kühlfahrzeug", "Elektro-Kühltransporter", "elektrischer Kühltransporter",
    "Elektro Kühlfahrzeug Umbau", "emissionsfreier Kühltransport", "autarkes Kühlaggregat",
    "Elektrotransporter Kühlung", "Elektro-Kühlkoffer", "leiser Kühltransporter",
    "Elektro Kuhltransporter", "Elektro-Kuhlfahrzeug", "Kühltransporter Elektro Reichweite",
    "Elektro-Kühlfahrzeug Preise", "E-Transporter Kühlumbau",
  ],
  ro: [
    "autofrigorifică electrică", "autofrigorifica electrica", "furgon frigorific electric",
    "dubă frigorifică electrică", "duba frigorifica electrica", "vehicul frigorific electric",
    "agregat frigorific autonom", "transport frigorific electric", "transport refrigerat electric",
    "zero emisii frigorific", "autofrigorifice electrice", "autofrigorifica electrica pret",
  ],
};

export const ECO_PAGE_KEYWORDS: Record<EcoPage, Partial<Record<Lang, string[]>>> = {
  home: {
    hu: ["elektromos hűtőautó gyártás", "Autotherm elektromos hűtőautó", "eHűtőautó Szeged"],
    en: ["electric refrigerated van manufacturer", "Autotherm Zero Emission", "EV reefer Hungary"],
    de: ["Elektro-Kühlfahrzeug Hersteller", "Autotherm Elektro-Kühlfahrzeuge", "E-Kühltransporter Ungarn"],
    ro: ["producător autofrigorifice electrice", "Autotherm autofrigorifice electrice"],
  },
  why: {
    hu: ["miért elektromos hűtőautó", "elektromos hűtőautó előnyei", "dízel tiltás hűtőautó"],
    en: ["why electric refrigerated van", "electric reefer benefits", "diesel ban refrigerated"],
    de: ["warum Elektro-Kühlfahrzeug", "Elektro-Kühltransporter Vorteile", "Dieselfahrverbot Kühlfahrzeug"],
    ro: ["de ce autofrigorifică electrică", "de ce autofrigorifica electrica", "avantaje furgon electric frigorific"],
  },
  technology: {
    hu: ["önellátó hűtőegység működése", "akkupakk hűtés hatótáv", "ciklikus töltés hűtőegység"],
    en: ["self-contained refrigeration unit", "EV reefer battery pack", "cooling without range loss"],
    de: ["autarkes Kühlaggregat Funktion", "Akkupack Kühlung Reichweite", "Kühlung ohne Reichweitenverlust"],
    ro: ["agregat frigorific autonom funcționare", "agregat frigorific autonom functionare", "răcire fără pierdere autonomie"],
  },
  vehicles: {
    hu: ["átalakítható elektromos furgonok", "Mercedes eVito hűtős", "Fiat E-Ducato hűtőautó", "Ford E-Transit hűtős"],
    en: ["electric vans for refrigerated conversion", "Mercedes eVito refrigerated", "Fiat E-Ducato reefer"],
    de: ["umbaubare Elektrotransporter", "Mercedes eVito Kühlumbau", "Fiat E-Ducato Kühlfahrzeug"],
    ro: ["dube electrice transformabile frigorific", "Mercedes eVito frigorific", "Fiat E-Ducato frigorific"],
  },
  quote: {
    hu: ["elektromos hűtőautó árajánlat", "e-hűtőautó ár", "elektromos hűtős furgon árkérés"],
    en: ["electric refrigerated van quote", "EV reefer price", "request electric reefer quote"],
    de: ["Elektro-Kühlfahrzeug Angebot", "E-Kühltransporter Preis", "Angebot Elektro-Kühlumbau"],
    ro: ["ofertă autofrigorifică electrică", "oferta autofrigorifica electrica", "preț furgon frigorific electric"],
  },
};

/** Title, description, keywords, canonical, hreflang, Open Graph and
 * Twitter metadata for one page - mirrors buildPageMetadata on the main
 * site so ehutoauto.hu competes with the same arsenal. */
export function ecoMetadata(page: EcoPage, lang: Lang): Metadata {
  const { title, description } = ECO_DICTS[lang].seo[page];
  const path = ecoPath(page, lang);
  const canonical = `${ECO_SITE_URL}${path === "/" ? "" : path}`;

  const languages: Record<string, string> = {};
  for (const l of LANGS) {
    const p = ecoPath(page, l);
    languages[BCP47[l]] = `${ECO_SITE_URL}${p === "/" ? "" : p}`;
  }
  const defaultPath = ecoPath(page, ECO_DEFAULT_LANG);
  languages["x-default"] = `${ECO_SITE_URL}${defaultPath === "/" ? "" : defaultPath}`;

  const keywords = [...ECO_BASE_KEYWORDS[lang], ...(ECO_PAGE_KEYWORDS[page]?.[lang] ?? [])];
  const image = `${ECO_SITE_URL}/images/eco/builds/covers/ecitan.webp`;

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
      siteName: ecoName(lang),
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
 * The convertible electric vans, listed on the home strip and the vehicles
 * page: the best-known models, each shown with its manufacturer studio
 * shot (cut out and centred on a white 521×365 canvas so every card matches).
 * Finished Autotherm conversions are documented separately in ECO_BUILDS.
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

/**
 * Finished electric refrigerated conversions documented photo by photo.
 * `dir` is the folder under /images/eco/builds, `count` the number of
 * sequentially numbered photos, `cover` the 1-based cover photo.
 */
export const ECO_BUILDS: { id: string; make: string; model: string; dir: string; count: number; cover: number }[] = [
  { id: "ecitan", make: "Mercedes-Benz", model: "eCitan", dir: "ecitan", count: 17, cover: 14 },
  { id: "e-transit-custom", make: "Ford", model: "E-Transit Custom", dir: "build-002", count: 20, cover: 3 },
  { id: "e-expert", make: "Peugeot", model: "E-Expert", dir: "build-008", count: 16, cover: 3 },
  { id: "e-ducato", make: "Fiat", model: "E-Ducato", dir: "build-004", count: 16, cover: 8 },
];

/** Every electric van we convert, by name, for the home page marquee. */
export const ECO_MODELS: string[] = [
  ...ECO_VEHICLES.map((v) => `${v.make} ${v.model}`),
  ...ECO_BUILDS.map((b) => `${b.make} ${b.model}`),
];

export const ECO_MODELS_TITLE: Record<Lang, string> = {
  hu: "Elektromos alapjárművek, amelyekre építünk",
  en: "Electric base vehicles we build on",
  de: "Elektrische Basisfahrzeuge, auf die wir aufbauen",
  ro: "Vehicule electrice de bază pe care construim",
};

/** Photo paths for one finished build, in shooting order. */
export function ecoBuildPhotos(dir: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/images/eco/builds/${dir}/${String(i + 1).padStart(2, "0")}.webp`,
  );
}
