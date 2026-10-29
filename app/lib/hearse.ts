import type { Metadata } from "next";
import { BCP47, FOUNDED_YEAR, LANGS, STATS, yearsSince, type Lang } from "./constants";
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
 * Preview locally at http://halottszallito.localhost:<port>/ so links resolve the same way.
 */

export const HEARSE_SITE_URL = "https://halottszallito.hutoautok.hu";
/**
 * Brand name per language: Hungarian keeps the original Halottszállító, the
 * other languages use Mortecontrol.
 */
export function hearseName(lang: Lang): string {
  return lang === "hu" ? "Halottszállító" : "Mortecontrol";
}
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

/* -------------------------------------------------------------------------- */
/*  Keyword corpus - base terms per language plus per-page extras, the same   */
/*  pattern as baseKeywords / extraKeywords on the main site. ASCII variants   */
/*  included: a large share of queries are typed without accents.             */
/* -------------------------------------------------------------------------- */

export const HEARSE_BASE_KEYWORDS: Record<Lang, string[]> = {
  hu: [
    "halottszállító", "halottszállító autó", "halottasautó", "halottas autó",
    "halottaskocsi", "halottszállító jármű", "elhunytszállító", "elhunytszállító autó",
    "koporsószállító", "pompaautó", "temetkezési autó", "temetői jármű",
    "kegyeleti jármű", "halottszállítás", "halottszallito", "halottszallito auto",
    "halottasauto", "halottas auto", "halottaskocsi gyártás", "halottszállító gyártás",
    "hűtős halottas autó", "díszített halottaskocsi", "halottszállító furgon",
    "halottszállító átalakítás", "halottas autó átalakítás", "halottas autó árak",
    "halottszállító autó ára", "használt halottas autó", "halottszállító bérlés",
  ],
  en: [
    "hearse", "hearse van", "funeral vehicle", "funeral van", "mortuary van",
    "removal van", "deceased transport vehicle", "coffin transport", "funeral transport",
    "hearse conversion", "hearse manufacturer", "funeral car", "mortuary vehicle",
    "body removal vehicle", "deceased removal van", "funeral director vehicle",
    "temperature controlled funeral van", "refrigerated hearse", "cooled funeral vehicle",
    "hearse builder", "custom hearse", "hearse for sale", "funeral vehicle conversion",
  ],
  de: [
    "Leichenwagen", "Bestattungswagen", "Überführungswagen", "Überführungsfahrzeug",
    "Bestattungsfahrzeug", "Leichenwagen Umbau", "Bestattungswagen Hersteller",
    "Leichenwagen kaufen", "Überführungswagen kaufen", "Sargtransport",
    "Bestattungsfahrzeug Umbau", "gekühlter Leichenwagen", "Leichenwagen mit Kühlung",
    "Ueberfuehrungswagen", "Leichenwagen Hersteller", "Bestattungswagen Umbau",
    "Friedhofsfahrzeug", "Trauerfahrzeug", "Leichenwagen Preise",
  ],
  ro: [
    "mașină funerară", "masina funerara", "mașini funerare", "masini funerare",
    "dric", "vehicul funerar", "transport funerar", "transport decedați",
    "transport decedati", "mașină transport decedați", "masina transport decedati",
    "autovehicul funerar", "sicriu transport", "transport sicrie",
    "mașină funerară preț", "masina funerara pret", "dric preț", "servicii funerare auto",
    "mașină funerară frigorifică", "masina funerara frigorifica",
  ],
};

export const HEARSE_PAGE_KEYWORDS: Record<HearsePage, Partial<Record<Lang, string[]>>> = {
  home: {
    hu: ["halottszállító gyártás Szeged", "halottasautó gyártás Magyarország", "Autotherm halottszállító", "piacvezető halottaskocsi gyártó"],
    en: ["hearse manufacturer Hungary", "Autotherm funeral vehicles", "market leading hearse builder"],
    de: ["Bestattungswagen Hersteller Ungarn", "Autotherm Bestattungsfahrzeuge", "Marktführer Leichenwagen"],
    ro: ["producător mașini funerare Ungaria", "Autotherm mașini funerare", "lider mașini funerare"],
  },
  why: {
    hu: ["miért halottszállító Autotherm", "halottaskocsi gyártás tapasztalat", "halottszállító garancia"],
    en: ["why choose hearse builder", "hearse building experience", "funeral vehicle warranty"],
    de: ["warum Bestattungswagen Autotherm", "Leichenwagen Erfahrung", "Bestattungswagen Garantie"],
    ro: ["de ce mașină funerară Autotherm", "experiență mașini funerare", "garanție mașină funerară", "garanție masina funerara"],
  },
  product: {
    hu: ["halottszállító műszaki tartalom", "raktérhűtés halottas autó", "+18 fok halottszállító", "rozsdamentes halottas autó"],
    en: ["hearse specification", "funeral van cooling", "stainless steel hearse interior"],
    de: ["Bestattungswagen Ausstattung", "Leichenwagen Kühlung", "Edelstahl Leichenwagen"],
    ro: ["dotări mașină funerară", "dotari masina funerara", "răcire mașină funerară", "racire masina funerara"],
  },
  builds: {
    hu: ["Mercedes Vito halottszállító", "Ford Transit halottas autó", "halottszállító képek", "elkészült halottas autók"],
    en: ["Mercedes Vito hearse", "Ford Transit funeral van", "hearse conversions gallery"],
    de: ["Mercedes Vito Leichenwagen", "Ford Transit Bestattungswagen", "Bestattungswagen Galerie"],
    ro: ["Mercedes Vito mașină funerară", "Mercedes Vito masina funerara", "Ford Transit dric", "galerie mașini funerare"],
  },
  quote: {
    hu: ["halottasautó árajánlat", "halottszállító ár", "halottas autó árkérés", "pompaautó árajánlat"],
    en: ["hearse quote", "funeral vehicle price", "request hearse quote"],
    de: ["Leichenwagen Angebot", "Bestattungswagen Preis", "Angebot Bestattungsfahrzeug"],
    ro: ["ofertă mașină funerară", "oferta masina funerara", "preț dric", "pret dric", "cerere ofertă dric"],
  },
};

/** Open Graph / Twitter image per page (files under public/). */
export const HEARSE_OG_IMAGES: Record<HearsePage, string> = {
  home: "/images/hearse/hero.webp",
  why: "/images/hearse/hero.webp",
  product: "/images/hearse/steel-lining.webp",
  builds: "/images/hearse/builds/01-1.webp",
  quote: "/images/hearse/hero.webp",
};
export function hearseMetadata(page: HearsePage, lang: Lang): Metadata {
  const { title, description } = HEARSE_DICTS[lang].seo[page];
  const path = hearsePath(page, lang);
  const canonical = `${HEARSE_SITE_URL}${path === "/" ? "" : path}`;

  const languages: Record<string, string> = {};
  for (const l of LANGS) {
    const p = hearsePath(page, l);
    languages[BCP47[l]] = `${HEARSE_SITE_URL}${p === "/" ? "" : p}`;
  }
  const defaultPath = hearsePath(page, HEARSE_DEFAULT_LANG);
  languages["x-default"] = `${HEARSE_SITE_URL}${defaultPath === "/" ? "" : defaultPath}`;

  const keywords = [...HEARSE_BASE_KEYWORDS[lang], ...(HEARSE_PAGE_KEYWORDS[page]?.[lang] ?? [])];
  const image = `${HEARSE_SITE_URL}${HEARSE_OG_IMAGES[page]}`;

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
      siteName: hearseName(lang),
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

/** Fills the figures that age in the copy: {years}, {insulationYears}, {conversions}. */
export function fillHearseFigures(text: string): string {
  return text
    .replace("{years}", String(yearsSince(FOUNDED_YEAR)))
    .replace("{insulationYears}", String(yearsSince(INSULATION_SINCE)))
    .replace("{conversions}", String(STATS.annualConversions));
}

/** Van insulation started in 1995, with the Thermo King years (see "why us"). */
const INSULATION_SINCE = 1995;

/** Production, cooling, paperwork - the three pillars on the home page. */
export const HEARSE_PILLAR_ICONS: IconName[] = ["factory", "thermometer", "check"];

/** Detail photos on the product page, in the order of `product.details`. */
export const HEARSE_DETAIL_PHOTOS = [
  "/images/hearse/pull-out-tray.webp",
  "/images/hearse/coffin-tray.webp",
  "/images/hearse/steel-lining.webp",
  "/images/hearse/urn-holder.webp",
  "/images/hearse/rails.webp",
  "/images/hearse/waeco-controller.webp",
];

export interface HearseBuild {
  make: string;
  model: string;
  /** Spec tags as the company names them (length, fit-out, cooler, year). */
  spec: string[];
  leather?: boolean;
  photos: number;
}

/**
 * Finished conversions from the original site's gallery, newest first.
 * Photos are /images/hearse/builds/NN-K.webp (NN = position here, K = 1..photos).
 */
export const HEARSE_BUILDS: HearseBuild[] = [
  { make: "Mercedes-Benz", model: "Vito", spec: ["L2", "SF50", "2020"], leather: true, photos: 4 },
  { make: "Peugeot", model: "Expert", spec: ["L2", "SF30", "2020"], photos: 3 },
  { make: "Peugeot", model: "Expert", spec: ["L3", "SF30", "2020"], photos: 4 },
  { make: "Mercedes-Benz", model: "Vito", spec: ["SF50", "Waeco", "2020"], photos: 4 },
  { make: "Mercedes-Benz", model: "Vito", spec: ["SF50", "Waeco", "2018"], photos: 4 },
  { make: "Mercedes-Benz", model: "Vito", spec: ["SF50", "Waeco"], photos: 4 },
  { make: "Mercedes-Benz", model: "Vito", spec: ["SF50"], photos: 4 },
  { make: "Volkswagen", model: "Transporter", spec: ["SF50", "Waeco"], photos: 4 },
  { make: "Ford", model: "Transit Custom", spec: ["SF50", "Waeco"], photos: 4 },
  { make: "Mercedes-Benz", model: "Vito", spec: ["SF50", "Waeco"], photos: 4 },
  { make: "Mercedes-Benz", model: "Vito", spec: ["SF50", "Waeco", "2018"], photos: 4 },
  { make: "Mercedes-Benz", model: "Vito", spec: ["SF50", "Waeco"], photos: 4 },
  { make: "Volkswagen", model: "Transporter", spec: ["SF50", "Waeco"], photos: 4 },
  { make: "Opel", model: "Vivaro", spec: [], photos: 4 },
  { make: "Ford", model: "Transit Custom", spec: [], photos: 4 },
  { make: "Ford", model: "Transit Custom", spec: [], photos: 4 },
  { make: "Ford", model: "Transit Custom", spec: ["SF50", "Waeco"], photos: 4 },
  { make: "Mercedes-Benz", model: "Vito", spec: [], photos: 4 },
];

/** Distinct base vehicles in the build archive, for the home page marquee. */
export const HEARSE_MODELS: string[] = [
  ...new Set(HEARSE_BUILDS.map((b) => `${b.make} ${b.model}`)),
];

export const HEARSE_MODELS_TITLE: Record<Lang, string> = {
  hu: "Alapjárművek, amelyekre építünk",
  en: "Base vehicles we build on",
  de: "Basisfahrzeuge, auf die wir aufbauen",
  ro: "Vehicule de bază pe care construim",
};

export function buildPhoto(index: number, photo = 1): string {
  return `/images/hearse/builds/${String(index + 1).padStart(2, "0")}-${photo}.webp`;
}

/** "L2 · leather · SF50 · 2020" in the given language. */
export function buildSpec(build: HearseBuild, lang: Lang): string {
  const tags = [...build.spec];
  if (build.leather) tags.splice(1, 0, HEARSE_DICTS[lang].builds.leather);
  return tags.join(" · ");
}
