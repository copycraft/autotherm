import type { HearsePage } from "../hearse";

type TitleBody = { title: string; body: string };

/** All text on halottszallito.hu, one object per language. */
export interface HearseDict {
  nav: Record<HearsePage, string>;
  seo: Record<HearsePage, { title: string; description: string }>;
  common: {
    getQuote: string;
    openMenu: string;
    closeMenu: string;
    close: string;
    contactPerson: string;
    phone: string;
    email: string;
    /** Shown on the contact card next to the form and on the home page. */
    callIntro: string;
  };
  contactRole: string;
  /** "Pick-up and return" offer, on the home, builds and quote pages. */
  pickup: TitleBody;
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    lead: string;
    howItWorks: string;
    points: string[];
  };
  home: {
    introEyebrow: string;
    introTitle: string;
    introLead: string;
    introBody: string[];
    introLink: string;
    contactEyebrow: string;
    contactTitle: string;
    cta: TitleBody;
  };
  /** Eight items, matching HEARSE_FEATURE_ICONS. */
  features: TitleBody[];
  /** Shared by the home and "why us" pages. */
  case: { title: string; body: string[] };
  strip: { eyebrow: string; title: string; cta: string };
  why: {
    eyebrow: string;
    title: string;
    lead: string;
    logisticsEyebrow: string;
    logistics: string[];
    quote: string;
    benefitsTitle: string;
    /** Seven items, matching HEARSE_WHY_ICONS. */
    benefits: TitleBody[];
    bestEyebrow: string;
    best: string[];
    cargoEyebrow: string;
    cargo: string[];
    cta: TitleBody;
  };
  product: {
    eyebrow: string;
    title: string;
    lead: string;
    howTitle: string;
    steps: TitleBody[];
    compareEyebrow: string;
    compareTitle: string;
    driveLabel: string;
    drive: string[];
    ownLabel: string;
    own: string[];
    closing: string;
    cta: TitleBody;
  };
  builds: {
    eyebrow: string;
    title: string;
    lead: string;
    cardBody: string;
    otherEyebrow: string;
    otherTitle: string;
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
