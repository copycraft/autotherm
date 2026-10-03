import type { IconName } from "./page-content";

/**
 * ehutoauto.hu - the electric refrigerated vehicle site.
 *
 * Same app as hutoautok.hu: next.config.ts rewrites requests on the eco host to
 * the app/(eco)/eco route tree, which has its own root layout, green theme
 * (data-theme="eco" in globals.css), navigation and pages. Hungarian only.
 *
 * Copy is the company's own from the original ehutoauto.hu site, regrouped
 * into pages; no specs or figures beyond what they published.
 *
 * Links are written for the eco domain ("/technologia"). Preview locally at
 * http://eco.localhost:<port>/ so they resolve the same way.
 */

export const ECO_SITE_URL = "https://ehutoauto.hu";
export const ECO_NAME = "eHűtőautó";

/** Public paths on the eco domain. */
export const ECO_PATHS = {
  home: "/",
  why: "/miert-elektromos",
  technology: "/technologia",
  vehicles: "/jarmuvek",
  quote: "/arajanlatkeres",
} as const;

export type EcoPage = keyof typeof ECO_PATHS;

export const ECO_NAV: { key: EcoPage; label: string }[] = [
  { key: "home", label: "Főoldal" },
  { key: "why", label: "Miért elektromos?" },
  { key: "technology", label: "Technológia" },
  { key: "vehicles", label: "Járművek" },
  { key: "quote", label: "Árajánlatkérés" },
];

/** Sales contact for electric conversions (from the original site). */
export const ECO_CONTACT = {
  name: "Busa Ádám",
  role: "Értékesítés – elektromos hűtőautók",
  phone: "+36 20 223 1316",
  phoneHref: "tel:+36202231316",
  email: "busa.adam@autotherm.hu",
  emailHref: "mailto:busa.adam@autotherm.hu",
};

/** The main site, for cross-links (legal pages, company info). */
export const MAIN_SITE_URL = "https://hutoautok.hu";

export const ECO_FEATURES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "layers",
    title: "Önellátó akkupakk",
    body: "A hűtőegység saját akkumulátorról működik, nem a jármű hajtóakkujáról.",
  },
  {
    icon: "truck",
    title: "Változatlan hatótáv",
    body: "Mivel a hűtés nem a hajtóakkuból fogyaszt, a furgon hatótávja nem csökken.",
  },
  {
    icon: "clock",
    title: "Ciklikus töltésű akkupakk",
    body: "Az akkupakk ciklikusan töltődik, így a hűtés folyamatosan rendelkezésre áll.",
  },
  {
    icon: "spark",
    title: "Akkis + hálózati hűtő",
    body: "Akkumulátorról és elektromos hálózatról is üzemeltethető.",
  },
  {
    icon: "thermometer",
    title: "Hosszú hűtési üzemidő",
    body: "Pár órán belül feltölthető, és hosszú hűtési üzemidővel rendelkezik.",
  },
  {
    icon: "heart",
    title: "Emissziómentes és csendes",
    body: "Nincs kipufogógáz és motorzaj – ideális a belvárosi kiszállításhoz.",
  },
  {
    icon: "check",
    title: "Kiszámítható és biztonságos",
    body: "Kiszámítható hatótáv és biztonságos hűtés minden fuvaron.",
  },
  {
    icon: "shield",
    title: "Garanciális és megbízható",
    body: "Garanciális hűtős átalakítás az Autotherm-től, 1992 óta a hűtőautók szakértőjétől.",
  },
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

/** Shared by the home and "why electric" pages. */
export const ECO_CASE = {
  title: "Alternatíva az elektromos hűtőautó? Egyértelműen: IGEN!",
  body: [
    "Az előnyök nyilvánvalóak: Az elektromos hűtős furgonok emissziómentesek, csendesek és jót tesznek a cég arculatának és zsebének. A friss termékek logisztikájának azonban mindenekelőtt két dologra van szüksége: Megbízhatóságra a hőmérséklet-szabályozásban és a hatótávolság maximális kihasználására.",
    "Az elektromos hűtőautók különösen alkalmasak a belváros forgalomban vagy a nagyvárosokból a környező területekre való kiszállításokhoz. Függetlenül attól, hogy húst, süteményt, gyümölcsöt, zöldséget vagy más hűtött ételt szállít, egy elektromos hűtős furgonnal ugyanolyan jó hűtési teljesítményt érhet el, mint a szokásos szigetelt dobozos kisteherautóknál. Az elektromos hűtőautók pár órán belül feltölthetőek és hosszú hűtési üzemidővel rendelkeznek.",
    "Az önálló akkupakkal rendelkező hűtőegység előnye pedig azt jelenti, hogy a hűtési láncolat akár egy álló jármű esetében sem szakad meg, mert az egység tovább működik – mindez hatótávolság csökkenés nélkül!",
  ],
};

export const ECO_SEO: Record<EcoPage, { title: string; description: string }> = {
  home: {
    title: "Elektromos hűtőautó önellátó hűtőegységgel | eHűtőautó – Autotherm",
    description:
      "Elektromos furgonok hűtős átalakítása önellátó, saját akkupakkal működő hűtőegységgel – változatlan hatótáv, emissziómentes és csendes hűtött szállítás. Autotherm Kft.",
  },
  why: {
    title: "Miért elektromos hűtőautó? | eHűtőautó – Autotherm",
    description:
      "Emissziómentes, csendes és gazdaságos: miért jó választás az elektromos hűtőautó a belvárosi és elővárosi frissáru-logisztikában.",
  },
  technology: {
    title: "Önellátó hűtőegység saját akkupakkal | eHűtőautó – Autotherm",
    description:
      "Így működik az önellátó, ciklikus töltésű akkupakkal rendelkező hűtőegység: a hűtés nem a hajtóakkuból fogyaszt, a hűtési lánc álló járműnél sem szakad meg.",
  },
  vehicles: {
    title: "Átalakítható elektromos furgonok | eHűtőautó – Autotherm",
    description:
      "Peugeot E-Partner, Citroën ë-Berlingo, Opel Combo Electric, Toyota Proace City Electric, Nissan Townstar EV, BYD ETP3, Kia PV5 Cargo, Mercedes-Benz eVito és eSprinter – elektromos furgonok hűtőautóvá alakítása.",
  },
  quote: {
    title: "Árajánlatkérés – elektromos hűtőautó | eHűtőautó – Autotherm",
    description:
      "Kérjen árajánlatot elektromos hűtőautó átalakításra önellátó hűtőegységgel. Személyre szabott megoldás, átvételi és visszaküldési szolgáltatással.",
  },
};
