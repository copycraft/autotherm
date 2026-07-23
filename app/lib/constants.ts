/**
 * Company-wide constants - single source of truth for facts about Autotherm Kft.
 * Derived from the project specification (summary.md).
 */

export const FOUNDED_YEAR = 1992;

export const thisYear = new Date().getFullYear();

export function yearsSince(year: number = FOUNDED_YEAR): number {
  return new Date().getFullYear() - year;
}

export const COMPANY = {
  legalName: "AUTOTHERM Kereskedelmi és Szolgáltató Kft.",
  tradingNames: {
    hu: "Autotherm Kft.",
    en: "Autotherm Ltd.",
    de: "Autotherm GmbH",
    ro: "Autotherm SRL",
  } as Record<string, string>,
  founders: ["Csurgó László", "Dkfm. Peter Knerer"],
  address: {
    street: "Napos út 3.",
    postalCode: "6728",
    city: "Szeged",
    country: "HU",
    full: "6728 Szeged, Napos út 3.",
  },
  geo: {
    lat: 46.26767,
    lng: 20.12218,
  },
  phone: "+36 20 910 20 50",
  phoneHref: "tel:+36209102050",
  email: "autotherm@autotherm.hu",
  emailHref: "mailto:autotherm@autotherm.hu",
  website: "https://www.autotherm.hu",
  facebook: "https://www.facebook.com/rakterhutes/",
  openingHours: "08:00–16:30",
} as const;

export const STATS = {
  employees: 33,
  customers: 3000,
  annualConversions: 280,
  productionSpaceM2: 1500,
  productionHalls: 4,
} as const;

export const LANGS = ["hu", "en", "de", "ro"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export const LOCALES: Record<Lang, string> = {
  hu: "hu_HU",
  en: "en_US",
  de: "de_DE",
  ro: "ro_RO",
};

export const BCP47: Record<Lang, string> = {
  hu: "hu-HU",
  en: "en-US",
  de: "de-DE",
  ro: "ro-RO",
};
