import type { PharmaPage } from "../pharma";

type TitleBody = { title: string; body: string };

/** All text on the Pharmacontrol site, one object per language. */
export interface PharmaDict {
  nav: Record<PharmaPage, string>;
  seo: Record<PharmaPage, { title: string; description: string }>;
  common: {
    getQuote: string;
    openMenu: string;
    closeMenu: string;
    close: string;
    contactPerson: string;
    phone: string;
    email: string;
    callIntro: string;
  };
  contactRole: string;
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    lead: string;
    solutions: string;
    points: string[];
  };
  home: {
    introEyebrow: string;
    introTitle: string;
    introLead: string;
    introBody: string[];
    introLink: string;
    rangesEyebrow: string;
    rangesTitle: string;
    /** Three temperature ranges: label, title, body. */
    ranges: { temp: string; title: string; body: string }[];
    featuresEyebrow: string;
    featuresTitle: string;
    galleryEyebrow: string;
    galleryTitle: string;
    electric: { eyebrow: string; title: string; body: string; link: string };
    contactEyebrow: string;
    contactTitle: string;
    cta: TitleBody;
  };
  /** Six items, matching PHARMA_FEATURE_ICONS. */
  features: TitleBody[];
  why: {
    eyebrow: string;
    title: string;
    lead: string;
    reqEyebrow: string;
    reqTitle: string;
    /** Four requirements. */
    reqs: TitleBody[];
    note: string;
    stepsEyebrow: string;
    stepsTitle: string;
    /** Four steps. */
    steps: TitleBody[];
    quote: string;
    cta: TitleBody;
  };
  solutions: {
    eyebrow: string;
    title: string;
    lead: string;
    vehiclesEyebrow: string;
    vehiclesTitle: string;
    /** Three vehicle classes. */
    vehicles: TitleBody[];
    optionsEyebrow: string;
    optionsTitle: string;
    options: string[];
    electricTitle: string;
    electricBody: string;
    electricLink: string;
    cta: TitleBody;
  };
  quote: {
    eyebrow: string;
    title: string;
    lead: string;
    formTitle: string;
    vehiclePlaceholder: string;
  };
  footer: {
    /** "{year}" is replaced with the founding year. */
    tagline: string;
    mainSite: string;
    menu: string;
    navLabel: string;
    rights: string;
    terms: string;
    privacy: string;
  };
}
