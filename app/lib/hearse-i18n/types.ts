import type { HearsePage } from "../hearse";

type TitleBody = { title: string; body: string };

/**
 * All text on halottszallito.hu, one object per language. The Hungarian copy
 * is the company's own from the original site; figures that age ({years},
 * {insulationYears}, {conversions}) are filled in at render time.
 */
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
    /** Shown on the contact card on the home and quote pages. */
    callIntro: string;
  };
  contactRole: string;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Second hero button, to the builds gallery. */
    buildsLabel: string;
    points: string[];
  };
  /** Production, cargo-space cooling, paperwork. */
  pillars: { eyebrow: string; items: TitleBody[] };
  /** Vastag Péter's welcome letter. */
  welcome: { greeting: string; body: string; name: string; role: string };
  /** The 3.5 t conversion summary with its six features. */
  conversion: { eyebrow: string; title: string; features: string[]; details: string };
  strip: { eyebrow: string; title: string; cta: string };
  /** See-what-you-get, 3-year insulation warranty. */
  guarantees: { eyebrow: string; title: string; items: TitleBody[] };
  testimonials: { eyebrow: string; title: string; items: { quote: string; name: string; role: string }[] };
  homeContact: { eyebrow: string; title: string };
  homeCta: TitleBody;
  product: {
    eyebrow: string;
    title: string;
    lead: string;
    specTitle: string;
    spec: string[];
    detailsTitle: string;
    /** Captions for the six detail photos, in HEARSE_DETAIL_PHOTOS order. */
    details: string[];
    coolingTitle: string;
    cooling: string[];
    ceremonialTitle: string;
    ceremonial: string[];
    cta: TitleBody;
  };
  builds: {
    eyebrow: string;
    title: string;
    lead: string;
    all: string;
    /** Spec tag for leather interiors. */
    leather: string;
    imageAlt: string;
    prev: string;
    next: string;
    cta: TitleBody;
  };
  why: {
    eyebrow: string;
    title: string;
    lead: string;
    reasonsTitle: string;
    /** Seven reasons; bodies may use {years}, {insulationYears}, {conversions}. */
    reasons: TitleBody[];
    oneHandTitle: string;
    oneHand: TitleBody[];
    quote: { text: string; author: string };
    cta: TitleBody;
  };
  quote: {
    eyebrow: string;
    title: string;
    lead: string;
    formTitle: string;
    vehiclePlaceholder: string;
    stepsTitle: string;
    steps: TitleBody[];
    fact: string;
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
