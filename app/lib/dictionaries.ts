import type { Lang } from "./constants";
import type { PageKey } from "./routes";

/**
 * UI dictionary - every string rendered in the shared chrome, homepage,
 * forms and configurator, in all four languages. Nothing is hardcoded
 * inside JSX; components always destructure from these objects.
 */

export interface Dict {
  langName: string;
  nav: Partial<Record<PageKey, string>>;
  common: {
    getQuote: string;
    callUs: string;
    writeUs: string;
    learnMore: string;
    readMore: string;
    viewAll: string;
    back: string;
    next: string;
    openMenu: string;
    closeMenu: string;
    scrollDown: string;
    workdays: string;
    address: string;
    phone: string;
    email: string;
    openingHours: string;
    since: string;
    netPrices: string;
  };
  footer: {
    menuTitle: string;
    contactTitle: string;
    mapTitle: string;
    mapAria: string;
    rights: string;
    copyright: string;
    tagline: string;
  };
  cookie: {
    text: string;
    accept: string;
    decline: string;
  };
  form: {
    name: string;
    email: string;
    phone: string;
    message: string;
    messagePlaceholder: string;
    vehicle: string;
    vehiclePlaceholder: string;
    tempRange: string;
    tempOptions: { value: string; label: string }[];
    submit: string;
    sending: string;
    success: string;
    successDetail: string;
    error: string;
    requiredNote: string;
    privacyNote: string;
  };
  configurator: {
    title: string;
    subtitle: string;
    steps: [string, string, string, string, string];
    stepOf: string;
    summaryTitle: string;
    total: string;
    netNote: string;
    emptySummary: string;
    requestQuote: string;
    restart: string;
    cargoVolume: string;
    payload: string;
    tempRange: string;
    included: string;
    quoteHint: string;
    configLabel: string;
  };
  home: {
    hero: {
      eyebrow: string;
      titleA: string;
      titleB: string;
      lead: string;
      ctaPrimary: string;
      ctaSecondary: string;
      badge: string;
    };
    stats: {
      years: string;
      customers: string;
      conversions: string;
      employees: string;
      customersSuffix: string;
      conversionsSuffix: string;
      yearsSuffix: string;
    };
    products: {
      eyebrow: string;
      title: string;
      lead: string;
      items: { title: string; body: string; href: PageKey; image: string }[];
    };
    process: {
      eyebrow: string;
      title: string;
      lead: string;
      steps: { title: string; body: string }[];
    };
    video: {
      eyebrow: string;
      title: string;
      lead: string;
    };
    partners: {
      eyebrow: string;
      title: string;
      lead: string;
      carrier: string;
      daikin: string;
      autoclima: string;
    };
    configuratorTeaser: {
      eyebrow: string;
      title: string;
      lead: string;
      cta: string;
    };
    ctaBand: {
      title: string;
      body: string;
      primary: string;
      secondary: string;
    };
  };
  gallery: {
    eyebrow: string;
    title: string;
    lead: string;
    all: string;
    categories: { id: string; label: string }[];
    close: string;
    prev: string;
    nextImg: string;
    imageAlt: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    lead: string;
    formTitle: string;
    infoTitle: string;
    gps: string;
  };
  quotationPage: {
    eyebrow: string;
    title: string;
    lead: string;
    promiseTitle: string;
    promiseBody: string;
    bullets: string[];
  };
  blogPage: {
    eyebrow: string;
    title: string;
    lead: string;
    empty: string;
    published: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  stickyCta: string;
}

export const dictionaries: Record<Lang, Dict> = {
  /* ------------------------------------------------------------------ HU --- */
  hu: {
    langName: "Magyar",
    nav: {
      home: "Kezdőlap",
      about: "Kik vagyunk?",
      products: "Termékeink",
      service: "Szerviz",
      carrierService: "Raktérhűtő szerviz",
      whyUs: "Miért mi?",
      gallery: "Galéria",
      contact: "Kapcsolat",
      quotation: "Ajánlatkérés",
      blog: "Blog",
      configurator: "Konfigurátor",
      commercialBodies: "Haszonjármű felépítmények",
      bodyRepair: "Felépítmény javítás",
      ourService: "Szervizünk",
      terms: "ÁSZF",
      privacy: "Adatkezelés",
    },
    common: {
      getQuote: "Árajánlatot kérek",
      callUs: "Hívjon minket",
      writeUs: "Írjon nekünk",
      learnMore: "Tudjon meg többet",
      readMore: "Tovább olvasom",
      viewAll: "Összes megtekintése",
      back: "Vissza",
      next: "Tovább",
      openMenu: "Menü megnyitása",
      closeMenu: "Menü bezárása",
      scrollDown: "Görgessen lejjebb",
      workdays: "Munkanapokon",
      address: "Cím",
      phone: "Telefon",
      email: "E-mail",
      openingHours: "Nyitvatartás",
      since: "óta",
      netPrices: "Az árak nettó irányárak.",
    },
    footer: {
      menuTitle: "Menü",
      contactTitle: "Elérhetőségek",
      mapTitle: "Térkép",
      mapAria: "Autotherm telephely a térképen",
      rights: "minden jog fenntartva",
      copyright:
        "Az oldal, vagy egy részének másolása, sokszorosítása, bármilyen célú fel- és átdolgozása, kereskedelmi forgalomba hozatala tilos.",
      tagline: "Hűtőautók és járműfelépítmények gyártása 1992 óta.",
    },
    cookie: {
      text: "Weboldalunk sütiket használ a felhasználói élmény javítása érdekében. Az oldal használatával elfogadja az adatkezelési tájékoztatóban foglaltakat.",
      accept: "Elfogadom",
      decline: "Elutasítom",
    },
    form: {
      name: "Név",
      email: "E-mail cím",
      phone: "Telefonszám",
      message: "Üzenet",
      messagePlaceholder: "Írja le, miben segíthetünk…",
      vehicle: "Jármű / felépítmény",
      vehiclePlaceholder: "Pl. Fiat Ducato L2H2 hűtős átalakítás",
      tempRange: "Kívánt hőmérséklet-tartomány",
      tempOptions: [
        { value: "frozen", label: "Fagyasztott (-18°C … -20°C)" },
        { value: "chilled", label: "Hűtött (0°C … +4°C)" },
        { value: "multi", label: "Több hőmérsékletű / osztott raktér" },
        { value: "insulated", label: "Csak szigetelés (izoterm)" },
        { value: "funeral", label: "Elhunytszállító (+18°C)" },
      ],
      submit: "Üzenet elküldése",
      sending: "Küldés folyamatban…",
      success: "Köszönjük megkeresését!",
      successDetail:
        "Üzenetét megkaptuk – munkanapokon 12 órán belül részletes választ küldünk.",
      error:
        "Hiba történt a küldés közben. Kérjük, próbálja újra, vagy hívjon minket telefonon.",
      requiredNote: "A csillaggal jelölt mezők kitöltése kötelező.",
      privacyNote:
        "Az űrlap elküldésével elfogadja adatkezelési tájékoztatónkat.",
    },
    configurator: {
      title: "Járműkonfigurátor",
      subtitle:
        "Állítsa össze saját hűtőautóját öt lépésben – azonnali, tájékoztató jellegű árkalkulációval.",
      steps: ["Márka", "Modell", "Felépítmény", "Hűtőberendezés", "Burkolat"],
      stepOf: "lépés",
      summaryTitle: "Az Ön konfigurációja",
      total: "Becsült összesen",
      netNote: "Nettó irányár – a pontos ajánlatot 12 órán belül elkészítjük.",
      emptySummary: "Válasszon a lehetőségek közül a kalkuláció indításához.",
      requestQuote: "Árajánlatot kérek erre a konfigurációra",
      restart: "Újrakezdés",
      cargoVolume: "Raktér",
      payload: "Hasznos teher",
      tempRange: "Hőmérséklet",
      included: "Alapár tartalmazza",
      quoteHint:
        "Az ajánlatkérő űrlapba automatikusan bemásoljuk az összeállítást.",
      configLabel: "Konfiguráció",
    },
    home: {
      hero: {
        eyebrow: "Hűtőautó gyártás • Szeged • 1992 óta",
        titleA: "Hidegben is",
        titleB: "forró teljesítmény.",
        lead: "Hűtőautók, hűtős furgonok és egyedi járműfelépítmények gyártása 3,5 tonnáig – hivatalos Carrier Transicold partnerként, több mint 30 év tapasztalattal.",
        ctaPrimary: "Árajánlatot kérek",
        ctaSecondary: "Konfigurátor indítása",
        badge: "Hivatalos Carrier Transicold partner",
      },
      stats: {
        years: "év tapasztalat",
        customers: "elégedett ügyfél",
        conversions: "átalakítás évente",
        employees: "szakértő munkatárs",
        customersSuffix: "+",
        conversionsSuffix: "+",
        yearsSuffix: "+",
      },
      products: {
        eyebrow: "Termékeink",
        title: "Egy jármű. Ezer megoldás.",
        lead: "Az utcai árusítástól a gyógyszerlogisztikáig – minden hőmérséklet-érzékeny feladatra építünk járművet.",
        items: [
          {
            title: "Hűtős furgonok",
            body: "Raktérszigetelés és hűtőberendezés beépítés Fiat, Mercedes, Ford, Renault, VW és Iveco furgonokba – fagyasztott, hűtött vagy több hőmérsékletű kivitelben.",
            href: "products",
            image: "/images/a404687637b3.jpg",
          },
          {
            title: "Hűtős doboz felépítmények",
            body: "Könnyűszerkezetes szendvicspaneles hűtődobozok 3,5 tonnás alvázakra, Carrier vagy Daikin hűtőegységgel, egyedi méretben.",
            href: "products",
            image: "/images/82308068d05b.jpg",
          },
          {
            title: "Haszonjármű felépítmények",
            body: "Alumínium dobozok, platós-ponyvás és speciális felépítmények – alumínium, rozsdamentes vagy üvegszálas belső burkolattal.",
            href: "commercialBodies",
            image: "/images/8bd1648f42cf.jpg",
          },
          {
            title: "Elhunytszállító járművek",
            body: "Kegyeleti szempontból is kifogástalan, temperált (+18°C), rozsdamentes kialakítású elhunytszállító járművek, akár többszintes kivitelben.",
            href: "products",
            image: "/images/ae97125a0c4f.jpg",
          },
          {
            title: "Carrier raktérhűtő szerviz",
            body: "Xarios és Supra raktérhűtők értékesítése, beépítése és szervizelése – eredeti alkatrészek raktárról, diagnosztika, hibakód-olvasás.",
            href: "service",
            image: "/images/b05d04ca1183.jpg",
          },
          {
            title: "Felépítmény javítás",
            body: "Sérült szendvicspanelek cseréje, biztosítói kárügyintézés, éves felülvizsgálatok és karbantartási szerződések.",
            href: "bodyRepair",
            image: "/images/b2c54816a378.jpg",
          },
        ],
      },
      process: {
        eyebrow: "Így dolgozunk",
        title: "Az ajánlattól az átadásig",
        lead: "Kiszámítható folyamat, pontos határidők – ezért választ minket évente 280+ megrendelő.",
        steps: [
          {
            title: "Igényfelmérés",
            body: "Felmérjük a szállítási feladatot: áru, hőmérséklet, útvonalak, rakodási szokások.",
          },
          {
            title: "Árajánlat 12 órán belül",
            body: "Részletes, műszaki dokumentációval ellátott árajánlatot készítünk – ingyen.",
          },
          {
            title: "Gyártás",
            body: "1500 m²-en, négy gyártócsarnokban, 33 szakember precíz munkájával épül a járműve.",
          },
          {
            title: "Átadás és garancia",
            body: "Bejáratott átadási protokoll, teljes körű garancia és országos szervizháttér.",
          },
        ],
      },
      video: {
        eyebrow: "Betekintés",
        title: "Nézze meg, hogyan készül",
        lead: "Kamerával kísértük végig egy hűtős furgon átalakítását – a csupasz lemezfaltól a -20°C-os raktérig.",
      },
      partners: {
        eyebrow: "Hűtéstechnikai partnereink",
        title: "A világ vezető hűtőmárkái. Egy műhelyben.",
        lead: "Hivatalos Carrier Transicold partnerként értékesítünk, beépítünk és szervizelünk – emellett Daikin és Autoclima egységek javítását is vállaljuk.",
        carrier: "Hivatalos partner – értékesítés, beépítés, szerviz",
        daikin: "Daikin hűtőegységek szervize és javítása",
        autoclima: "Autoclima hűtőegységek javítása és karbantartása",
      },
      configuratorTeaser: {
        eyebrow: "Online konfigurátor",
        title: "Építse meg hűtőautóját lépésről lépésre.",
        lead: "Válasszon márkát, modellt, felépítményt, hűtőberendezést és burkolatot – a kalkulátor valós időben számolja az irányárat.",
        cta: "Konfigurátor indítása",
      },
      ctaBand: {
        title: "Kérjen árajánlatot még ma!",
        body: "Munkanapokon 12 órán belül részletes, műszaki dokumentációval ellátott árajánlatot küldünk.",
        primary: "Árajánlatkérés",
        secondary: "+36 20 910 20 50",
      },
    },
    gallery: {
      eyebrow: "Galéria",
        title: "Referencia munkáink",
      lead: "Elkészült hűtőautók, felépítmények és speciális átalakítások – válogatás az elmúlt évek munkáiból.",
      all: "Összes",
      categories: [
        { id: "vans", label: "Hűtős furgonok" },
        { id: "bodies", label: "Felépítmények" },
        { id: "special", label: "Speciális átalakítások" },
      ],
      close: "Bezárás",
      prev: "Előző kép",
      nextImg: "Következő kép",
      imageAlt: "Autotherm referencia munka",
    },
    contactPage: {
      eyebrow: "Kapcsolat",
      title: "Beszéljünk a projektjéről",
      lead: "Kérdése van? Hívjon minket, írjon e-mailt, vagy töltse ki az űrlapot – munkanapokon 12 órán belül válaszolunk.",
      formTitle: "Üzenetküldés",
      infoTitle: "Elérhetőségeink",
      gps: "GPS: 46° 16.060' N, 20° 7.331' E",
    },
    quotationPage: {
      eyebrow: "Árajánlatkérés",
      title: "Ingyenes, részletes árajánlat 12 órán belül",
      lead: "Írja le, milyen járműre vagy felépítményre van szüksége – mi pedig műszaki dokumentációval ellátott, pontos ajánlatot készítünk.",
      promiseTitle: "Mit tartalmaz az ajánlat?",
      promiseBody:
        "Az ajánlat tartalmazza a műszaki tartalmat, a rétegrendet, a hűtőberendezés méretezését és a vállalási határidőt.",
      bullets: [
        "Részletes műszaki dokumentáció",
        "Hűtőteljesítmény-méretezés a szállított áruhoz",
        "Fix vállalási határidő",
        "Finanszírozási lehetőségek",
      ],
    },
    blogPage: {
      eyebrow: "Hűtőautó blog",
      title: "Tudás a hűtött szállításról",
      lead: "Hasznos tanácsok, karbantartási tippek és hírek az Autotherm szakértőitől.",
      empty:
        "Hamarosan érkeznek az első bejegyzések – nézzen vissza később!",
      published: "Közzétéve",
    },
    notFound: {
      title: "Az oldal nem található",
      body: "A keresett oldal nem létezik vagy elköltözött. Nézze meg kezdőlapunkat, vagy kérjen árajánlatot!",
      cta: "Vissza a kezdőlapra",
    },
    stickyCta: "Árajánlatkérés",
  },

  /* ------------------------------------------------------------------ EN --- */
  en: {
    langName: "English",
    nav: {
      home: "Home",
      about: "Who we are",
      products: "Our products",
      whyUs: "Why us?",
      gallery: "Gallery",
      contact: "Contact",
      quotation: "Quotation",
      blog: "Blog",
      configurator: "Configurator",
      commercialBodies: "Commercial vehicle bodies",
      vanIsolations: "Van isolations",
      deceasedTransport: "Deceased transport",
      cooledBodies: "Refrigerated bodies",
    },
    common: {
      getQuote: "Request a quote",
      callUs: "Call us",
      writeUs: "Write to us",
      learnMore: "Learn more",
      readMore: "Read more",
      viewAll: "View all",
      back: "Back",
      next: "Next",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      scrollDown: "Scroll down",
      workdays: "Workdays",
      address: "Address",
      phone: "Phone",
      email: "Email",
      openingHours: "Opening hours",
      since: "since",
      netPrices: "Prices are net guide prices.",
    },
    footer: {
      menuTitle: "Menu",
      contactTitle: "Contact",
      mapTitle: "Map",
      mapAria: "Autotherm headquarters on the map",
      rights: "all rights reserved",
      copyright:
        "Copying, reproduction, adaptation, or commercial distribution of this site or any part thereof is prohibited.",
      tagline: "Manufacturing refrigerated vehicles and bodies since 1992.",
    },
    cookie: {
      text: "We use cookies to improve your experience. By using this site you accept our privacy policy.",
      accept: "Accept",
      decline: "Decline",
    },
    form: {
      name: "Name",
      email: "Email address",
      phone: "Phone number",
      message: "Message",
      messagePlaceholder: "Tell us how we can help…",
      vehicle: "Vehicle / body",
      vehiclePlaceholder: "E.g. Fiat Ducato L2H2 refrigerated conversion",
      tempRange: "Required temperature range",
      tempOptions: [
        { value: "frozen", label: "Frozen (-18°C … -20°C)" },
        { value: "chilled", label: "Chilled (0°C … +4°C)" },
        { value: "multi", label: "Multi-temperature / split cargo bay" },
        { value: "insulated", label: "Insulation only (isothermal)" },
        { value: "funeral", label: "Deceased transport (+18°C)" },
      ],
      submit: "Send message",
      sending: "Sending…",
      success: "Thank you for your enquiry!",
      successDetail:
        "We received your message - we reply within 12 hours on workdays.",
      error:
        "Something went wrong while sending. Please try again or call us directly.",
      requiredNote: "Fields marked with an asterisk are required.",
      privacyNote: "By submitting this form you accept our privacy policy.",
    },
    configurator: {
      title: "Vehicle configurator",
      subtitle:
        "Build your own refrigerated vehicle in five steps - with an instant guide-price calculation.",
      steps: ["Brand", "Model", "Body type", "Cooling unit", "Lining"],
      stepOf: "step",
      summaryTitle: "Your configuration",
      total: "Estimated total",
      netNote: "Net guide price - we prepare your exact quote within 12 hours.",
      emptySummary: "Pick an option to start the calculation.",
      requestQuote: "Request a quote for this configuration",
      restart: "Start over",
      cargoVolume: "Cargo volume",
      payload: "Payload",
      tempRange: "Temperature",
      included: "Included in base price",
      quoteHint: "Your configuration is copied into the quotation form automatically.",
      configLabel: "Configuration",
    },
    home: {
      hero: {
        eyebrow: "Refrigerated vehicle manufacturing • Since 1992",
        titleA: "Cold inside.",
        titleB: "Hot performance.",
        lead: "Refrigerated vans, cooled vehicle bodies and custom commercial conversions up to 3.5 t - built by an official Carrier Transicold partner with 30+ years of experience.",
        ctaPrimary: "Request a quote",
        ctaSecondary: "Launch configurator",
        badge: "Official Carrier Transicold partner",
      },
      stats: {
        years: "years of experience",
        customers: "satisfied customers",
        conversions: "conversions per year",
        employees: "expert employees",
        customersSuffix: "+",
        conversionsSuffix: "+",
        yearsSuffix: "+",
      },
      products: {
        eyebrow: "Our products",
        title: "One vehicle. A thousand solutions.",
        lead: "From street food to pharmaceutical logistics - we build a vehicle for every temperature-sensitive job.",
        items: [
          {
            title: "Refrigerated vans",
            body: "Van isolation and cooling unit installation for Fiat, Mercedes, Ford, Renault, VW and Iveco - frozen, chilled or multi-temperature.",
            href: "products",
            image: "/images/a404687637b3.jpg",
          },
          {
            title: "Refrigerated box bodies",
            body: "Lightweight sandwich-panel refrigerated boxes for 3.5 t chassis with Carrier or Daikin cooling units, built to custom dimensions.",
            href: "cooledBodies",
            image: "/images/82308068d05b.jpg",
          },
          {
            title: "Commercial vehicle bodies",
            body: "Aluminium boxes, flatbed-tarpaulin and special bodies - with aluminium, stainless steel or GRP interior lining.",
            href: "commercialBodies",
            image: "/images/8bd1648f42cf.jpg",
          },
          {
            title: "Deceased transport vehicles",
            body: "Dignified, temperature-controlled (+18°C) funeral transport vehicles with stainless steel interiors, up to multi-level configurations.",
            href: "deceasedTransport",
            image: "/images/ae97125a0c4f.jpg",
          },
          {
            title: "Van isolations",
            body: "Thermal-bridge-free insulation with hygienic washable lining - ready for HACCP-compliant cold chain operation.",
            href: "vanIsolations",
            image: "/images/b05d04ca1183.jpg",
          },
          {
            title: "Carrier sales & service",
            body: "Sales, installation and service of Carrier Xarios and Supra units - original parts from stock, diagnostics, error-code reading.",
            href: "products",
            image: "/images/b2c54816a378.jpg",
          },
        ],
      },
      process: {
        eyebrow: "How we work",
        title: "From quote to handover",
        lead: "A predictable process with precise deadlines - the reason 280+ clients choose us every year.",
        steps: [
          {
            title: "Needs assessment",
            body: "We map your transport task: cargo, temperature, routes and loading habits.",
          },
          {
            title: "Quote within 12 hours",
            body: "A detailed, free quotation with full technical documentation.",
          },
          {
            title: "Manufacturing",
            body: "Built across 1,500 m² and four production halls by 33 specialists.",
          },
          {
            title: "Handover & warranty",
            body: "A proven handover protocol, full warranty and nationwide service backing.",
          },
        ],
      },
      video: {
        eyebrow: "Behind the scenes",
        title: "Watch how it's built",
        lead: "We filmed a full refrigerated van conversion - from bare metal panels to a -20°C cargo bay.",
      },
      partners: {
        eyebrow: "Cooling partners",
        title: "Carrier, Daikin, Autoclima. One workshop.",
        lead: "As an official Carrier Transicold partner we sell, install and service - and we also repair Daikin and Autoclima units.",
        carrier: "Official partner - sales, installation, service",
        daikin: "Service and repair of Daikin cooling units",
        autoclima: "Service and repair of Autoclima cooling units",
      },
      configuratorTeaser: {
        eyebrow: "Online configurator",
        title: "Build your refrigerated van step by step.",
        lead: "Pick a brand, model, body type, cooling unit and lining - the calculator computes your guide price in real time.",
        cta: "Launch configurator",
      },
      ctaBand: {
        title: "Request your quote today!",
        body: "We send a detailed quotation with technical documentation within 12 hours on workdays.",
        primary: "Request a quote",
        secondary: "+36 20 910 20 50",
      },
    },
    gallery: {
      eyebrow: "Gallery",
        title: "Completed projects",
      lead: "Completed refrigerated vans, vehicle bodies and special conversions - a selection from recent years.",
      all: "All",
      categories: [
        { id: "vans", label: "Refrigerated vans" },
        { id: "bodies", label: "Vehicle bodies" },
        { id: "special", label: "Special conversions" },
      ],
      close: "Close",
      prev: "Previous image",
      nextImg: "Next image",
      imageAlt: "Autotherm reference work",
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Let's talk about your project",
      lead: "Questions? Call us, send an email or fill in the form - we reply within 12 hours on workdays.",
      formTitle: "Send a message",
      infoTitle: "Contact details",
      gps: "GPS: 46° 16.060' N, 20° 7.331' E",
    },
    quotationPage: {
      eyebrow: "Quotation",
      title: "Free, detailed quotation within 12 hours",
      lead: "Describe the vehicle or body you need - we prepare an exact quote with full technical documentation.",
      promiseTitle: "What does the quote include?",
      promiseBody:
        "Your quote includes the technical content, panel build-up, cooling unit sizing and a committed deadline.",
      bullets: [
        "Detailed technical documentation",
        "Cooling capacity sizing for your cargo",
        "Fixed delivery deadline",
        "Financing options",
      ],
    },
    blogPage: {
      eyebrow: "Cooled vehicle blog",
      title: "Knowledge on refrigerated transport",
      lead: "Practical tips, maintenance advice and news from the Autotherm experts.",
      empty: "The first posts are coming soon - check back later!",
      published: "Published",
    },
    notFound: {
      title: "Page not found",
      body: "The page you are looking for does not exist or has moved. Visit our homepage or request a quote!",
      cta: "Back to homepage",
    },
    stickyCta: "Get quotation",
  },

  /* ------------------------------------------------------------------ DE --- */
  de: {
    langName: "Deutsch",
    nav: {
      home: "Startseite",
      about: "Wer sind wir?",
      products: "Kühlfahrzeug",
      whyUs: "Warum gerade wir?",
      gallery: "Galerie",
      contact: "Kontakt",
      quotation: "Anfrage",
      blog: "Blog",
      configurator: "Konfigurator",
    },
    common: {
      getQuote: "Angebot anfordern",
      callUs: "Rufen Sie uns an",
      writeUs: "Schreiben Sie uns",
      learnMore: "Mehr erfahren",
      readMore: "Weiterlesen",
      viewAll: "Alle ansehen",
      back: "Zurück",
      next: "Weiter",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      scrollDown: "Nach unten scrollen",
      workdays: "Werktags",
      address: "Adresse",
      phone: "Telefon",
      email: "E-Mail",
      openingHours: "Öffnungszeiten",
      since: "seit",
      netPrices: "Preise sind Netto-Richtpreise.",
    },
    footer: {
      menuTitle: "Menü",
      contactTitle: "Kontakt",
      mapTitle: "Karte",
      mapAria: "Autotherm Standort auf der Karte",
      rights: "alle Rechte vorbehalten",
      copyright:
        "Das Kopieren, die Vervielfältigung, die Bearbeitung oder die kommerzielle Verbreitung dieser Website oder eines Teils davon ist untersagt.",
      tagline: "Kühlfahrzeuge und Aufbauten seit 1992.",
    },
    cookie: {
      text: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Durch die Nutzung dieser Seite akzeptieren Sie unsere Datenschutzerklärung.",
      accept: "Akzeptieren",
      decline: "Ablehnen",
    },
    form: {
      name: "Name",
      email: "E-Mail-Adresse",
      phone: "Telefonnummer",
      message: "Nachricht",
      messagePlaceholder: "Beschreiben Sie, wie wir helfen können…",
      vehicle: "Fahrzeug / Aufbau",
      vehiclePlaceholder: "z. B. Fiat Ducato L2H2 Kühlumbau",
      tempRange: "Gewünschter Temperaturbereich",
      tempOptions: [
        { value: "frozen", label: "Tiefkühl (-18°C … -20°C)" },
        { value: "chilled", label: "Gekühlt (0°C … +4°C)" },
        { value: "multi", label: "Mehrtemperatur / geteilter Laderaum" },
        { value: "insulated", label: "Nur Isolierung (isotherm)" },
        { value: "funeral", label: "Bestattungswagen (+18°C)" },
      ],
      submit: "Nachricht senden",
      sending: "Wird gesendet…",
      success: "Vielen Dank für Ihre Anfrage!",
      successDetail:
        "Wir haben Ihre Nachricht erhalten - werktags antworten wir innerhalb von 12 Stunden.",
      error:
        "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
      requiredNote: "Mit Stern markierte Felder sind Pflichtfelder.",
      privacyNote:
        "Mit dem Absenden akzeptieren Sie unsere Datenschutzerklärung.",
    },
    configurator: {
      title: "Fahrzeugkonfigurator",
      subtitle:
        "Konfigurieren Sie Ihr Kühlfahrzeug in fünf Schritten - mit sofortiger Richtpreis-Kalkulation.",
      steps: ["Marke", "Modell", "Aufbauart", "Kühlaggregat", "Verkleidung"],
      stepOf: "Schritt",
      summaryTitle: "Ihre Konfiguration",
      total: "Geschätzte Summe",
      netNote:
        "Netto-Richtpreis - Ihr genaues Angebot erstellen wir innerhalb von 12 Stunden.",
      emptySummary: "Wählen Sie eine Option, um die Kalkulation zu starten.",
      requestQuote: "Angebot für diese Konfiguration anfordern",
      restart: "Neu beginnen",
      cargoVolume: "Laderaum",
      payload: "Nutzlast",
      tempRange: "Temperatur",
      included: "Im Grundpreis enthalten",
      quoteHint:
        "Ihre Konfiguration wird automatisch in das Anfrageformular übernommen.",
      configLabel: "Konfiguration",
    },
    home: {
      hero: {
        eyebrow: "Kühlfahrzeugbau • Seit 1992",
        titleA: "Innen eiskalt.",
        titleB: "Leistung glühend heiß.",
        lead: "Kühlfahrzeuge, Kühlkoffer und individuelle Nutzfahrzeugaufbauten bis 3,5 t - gebaut von einem offiziellen Carrier Transicold Partner mit über 30 Jahren Erfahrung.",
        ctaPrimary: "Angebot anfordern",
        ctaSecondary: "Konfigurator starten",
        badge: "Offizieller Carrier Transicold Partner",
      },
      stats: {
        years: "Jahre Erfahrung",
        customers: "zufriedene Kunden",
        conversions: "Umbauten pro Jahr",
        employees: "Fachkräfte",
        customersSuffix: "+",
        conversionsSuffix: "+",
        yearsSuffix: "+",
      },
      products: {
        eyebrow: "Unsere Produkte",
        title: "Ein Fahrzeug. Tausend Lösungen.",
        lead: "Vom Street Food bis zur Pharmalogistik - wir bauen für jede temperatursensible Aufgabe das passende Fahrzeug.",
        items: [
          {
            title: "Kühltransporter",
            body: "Kastenwagenisolierung und Aggregat-Einbau für Fiat, Mercedes, Ford, Renault, VW und Iveco - Tiefkühl-, Kühl- oder Mehrtemperatur-Ausführung.",
            href: "products",
            image: "/images/a404687637b3.jpg",
          },
          {
            title: "Kühlkoffer-Aufbauten",
            body: "Leichte Sandwichpaneel-Kühlkoffer für 3,5-t-Fahrgestelle mit Carrier- oder Daikin-Aggregaten, in Sondermaßen gefertigt.",
            href: "products",
            image: "/images/82308068d05b.jpg",
          },
          {
            title: "Nutzfahrzeugaufbauten",
            body: "Aluminiumkoffer, Pritsche mit Plane und Spezialaufbauten - mit Aluminium-, Edelstahl- oder GFK-Innenverkleidung.",
            href: "products",
            image: "/images/8bd1648f42cf.jpg",
          },
          {
            title: "Bestattungswagen",
            body: "Würdevolle, temperierte (+18°C) Bestattungsfahrzeuge mit Edelstahl-Innenausbau, auch mehrstöckig.",
            href: "products",
            image: "/images/ae97125a0c4f.jpg",
          },
          {
            title: "Carrier Verkauf & Service",
            body: "Verkauf, Einbau und Service von Carrier Xarios- und Supra-Aggregaten - Originalteile ab Lager, Diagnose, Fehlercode-Auslesen.",
            href: "products",
            image: "/images/b05d04ca1183.jpg",
          },
          {
            title: "Aufbau-Reparatur",
            body: "Austausch beschädigter Sandwichpaneele, Versicherungsabwicklung, Jahresinspektionen und Wartungsverträge.",
            href: "products",
            image: "/images/b2c54816a378.jpg",
          },
        ],
      },
      process: {
        eyebrow: "So arbeiten wir",
        title: "Vom Angebot bis zur Übergabe",
        lead: "Ein planbarer Prozess mit präzisen Terminen - deshalb wählen uns jährlich 280+ Auftraggeber.",
        steps: [
          {
            title: "Bedarfsanalyse",
            body: "Wir erfassen Ihre Transportaufgabe: Ware, Temperatur, Routen und Beladegewohnheiten.",
          },
          {
            title: "Angebot in 12 Stunden",
            body: "Ein detailliertes, kostenloses Angebot mit vollständiger technischer Dokumentation.",
          },
          {
            title: "Fertigung",
            body: "Gebaut auf 1.500 m² in vier Produktionshallen von 33 Spezialisten.",
          },
          {
            title: "Übergabe & Garantie",
            body: "Bewährtes Übergabeprotokoll, volle Garantie und landesweiter Service.",
          },
        ],
      },
      video: {
        eyebrow: "Einblick",
        title: "Sehen Sie, wie es entsteht",
        lead: "Wir haben einen kompletten Kühlumbau gefilmt - vom blanken Blech bis zum -20°C-Laderaum.",
      },
      partners: {
        eyebrow: "Kältetechnik-Partner",
        title: "Carrier, Daikin, Autoclima. Eine Werkstatt.",
        lead: "Als offizieller Carrier Transicold Partner verkaufen, montieren und warten wir - zusätzlich reparieren wir Daikin- und Autoclima-Aggregate.",
        carrier: "Offizieller Partner - Verkauf, Einbau, Service",
        daikin: "Service und Reparatur von Daikin-Aggregaten",
        autoclima: "Service und Reparatur von Autoclima-Aggregaten",
      },
      configuratorTeaser: {
        eyebrow: "Online-Konfigurator",
        title: "Bauen Sie Ihren Kühltransporter Schritt für Schritt.",
        lead: "Wählen Sie Marke, Modell, Aufbauart, Kühlaggregat und Verkleidung - der Rechner ermittelt Ihren Richtpreis in Echtzeit.",
        cta: "Konfigurator starten",
      },
      ctaBand: {
        title: "Fordern Sie noch heute Ihr Angebot an!",
        body: "Werktags senden wir Ihnen innerhalb von 12 Stunden ein detailliertes Angebot mit technischer Dokumentation.",
        primary: "Angebot anfordern",
        secondary: "+36 20 910 20 50",
      },
    },
    gallery: {
      eyebrow: "Galerie",
        title: "Abgeschlossene Projekte",
      lead: "Fertiggestellte Kühlfahrzeuge, Aufbauten und Spezialumbauten - eine Auswahl der letzten Jahre.",
      all: "Alle",
      categories: [
        { id: "vans", label: "Kühltransporter" },
        { id: "bodies", label: "Aufbauten" },
        { id: "special", label: "Spezialumbauten" },
      ],
      close: "Schließen",
      prev: "Vorheriges Bild",
      nextImg: "Nächstes Bild",
      imageAlt: "Autotherm Referenzarbeit",
    },
    contactPage: {
      eyebrow: "Kontakt",
      title: "Sprechen wir über Ihr Projekt",
      lead: "Fragen? Rufen Sie an, schreiben Sie eine E-Mail oder nutzen Sie das Formular - werktags antworten wir innerhalb von 12 Stunden.",
      formTitle: "Nachricht senden",
      infoTitle: "Kontaktdaten",
      gps: "GPS: 46° 16.060' N, 20° 7.331' E",
    },
    quotationPage: {
      eyebrow: "Anfrage",
      title: "Kostenloses Detailangebot in 12 Stunden",
      lead: "Beschreiben Sie das benötigte Fahrzeug oder den Aufbau - wir erstellen ein präzises Angebot mit vollständiger technischer Dokumentation.",
      promiseTitle: "Was enthält das Angebot?",
      promiseBody:
        "Ihr Angebot enthält den technischen Inhalt, den Paneelaufbau, die Aggregat-Dimensionierung und einen verbindlichen Termin.",
      bullets: [
        "Detaillierte technische Dokumentation",
        "Kälteleistungs-Dimensionierung für Ihre Ware",
        "Fester Liefertermin",
        "Finanzierungsmöglichkeiten",
      ],
    },
    blogPage: {
      eyebrow: "Kühlfahrzeug Blog",
      title: "Wissen rund um den Kühltransport",
      lead: "Praktische Tipps, Wartungshinweise und Neuigkeiten von den Autotherm-Experten.",
      empty: "Die ersten Beiträge folgen in Kürze - schauen Sie bald wieder vorbei!",
      published: "Veröffentlicht",
    },
    notFound: {
      title: "Seite nicht gefunden",
      body: "Die gesuchte Seite existiert nicht oder wurde verschoben. Besuchen Sie unsere Startseite oder fordern Sie ein Angebot an!",
      cta: "Zur Startseite",
    },
    stickyCta: "Angebot anfordern",
  },

  /* ------------------------------------------------------------------ RO --- */
  ro: {
    langName: "Română",
    nav: {
      home: "Acasă",
      about: "Cine suntem noi?",
      products: "Carosări & furgonete",
      gallery: "Galerie foto",
      contact: "Contact",
      quotation: "Cerere ofertă",
      blog: "Blog",
      configurator: "Configurator",
    },
    common: {
      getQuote: "Solicită ofertă",
      callUs: "Sunați-ne",
      writeUs: "Scrieți-ne",
      learnMore: "Aflați mai multe",
      readMore: "Citește mai mult",
      viewAll: "Vezi toate",
      back: "Înapoi",
      next: "Continuă",
      openMenu: "Deschide meniul",
      closeMenu: "Închide meniul",
      scrollDown: "Derulați în jos",
      workdays: "În zilele lucrătoare",
      address: "Adresă",
      phone: "Telefon",
      email: "E-mail",
      openingHours: "Program",
      since: "din",
      netPrices: "Prețurile sunt orientative, nete.",
    },
    footer: {
      menuTitle: "Meniu",
      contactTitle: "Contact",
      mapTitle: "Hartă",
      mapAria: "Sediul Autotherm pe hartă",
      rights: "toate drepturile rezervate",
      copyright:
        "Copierea, reproducerea, adaptarea sau distribuția comercială a acestui site sau a oricărei părți a acestuia este interzisă.",
      tagline: "Producem vehicule frigorifice și suprastructuri din 1992.",
    },
    cookie: {
      text: "Folosim cookie-uri pentru a vă îmbunătăți experiența. Prin utilizarea acestui site acceptați politica noastră de confidențialitate.",
      accept: "Accept",
      decline: "Refuz",
    },
    form: {
      name: "Nume",
      email: "Adresă de e-mail",
      phone: "Număr de telefon",
      message: "Mesaj",
      messagePlaceholder: "Descrieți cum vă putem ajuta…",
      vehicle: "Vehicul / suprastructură",
      vehiclePlaceholder: "Ex. Fiat Ducato L2H2 carosare frigorifică",
      tempRange: "Interval de temperatură dorit",
      tempOptions: [
        { value: "frozen", label: "Congelat (-18°C … -20°C)" },
        { value: "chilled", label: "Refrigerat (0°C … +4°C)" },
        { value: "multi", label: "Multi-temperatură / compartimentat" },
        { value: "insulated", label: "Doar izolare (izoterm)" },
        { value: "funeral", label: "Transport funerar (+18°C)" },
      ],
      submit: "Trimite mesajul",
      sending: "Se trimite…",
      success: "Vă mulțumim pentru solicitare!",
      successDetail:
        "Am primit mesajul dumneavoastră - răspundem în 12 ore în zilele lucrătoare.",
      error:
        "A apărut o eroare la trimitere. Vă rugăm încercați din nou sau sunați-ne direct.",
      requiredNote: "Câmpurile marcate cu asterisc sunt obligatorii.",
      privacyNote:
        "Prin trimiterea formularului acceptați politica noastră de confidențialitate.",
    },
    configurator: {
      title: "Configurator vehicul",
      subtitle:
        "Configurați propriul vehicul frigorific în cinci pași - cu un calcul instant de preț orientativ.",
      steps: ["Marcă", "Model", "Tip caroserie", "Unitate frigorifică", "Căptușeală"],
      stepOf: "pasul",
      summaryTitle: "Configurația dumneavoastră",
      total: "Total estimat",
      netNote:
        "Preț orientativ net - oferta exactă o pregătim în 12 ore.",
      emptySummary: "Alegeți o opțiune pentru a porni calculul.",
      requestQuote: "Solicită ofertă pentru această configurație",
      restart: "Reîncepe",
      cargoVolume: "Volum marfă",
      payload: "Sarcină utilă",
      tempRange: "Temperatură",
      included: "Inclus în prețul de bază",
      quoteHint:
        "Configurația este copiată automat în formularul de ofertă.",
      configLabel: "Configurație",
    },
    home: {
      hero: {
        eyebrow: "Producție vehicule frigorifice • Din 1992",
        titleA: "Frig înăuntru.",
        titleB: "Performanță fierbinte.",
        lead: "Furgonete frigorifice, carosări și suprastructuri comerciale personalizate până la 3,5 t - construite de un partener oficial Carrier Transicold cu peste 30 de ani de experiență.",
        ctaPrimary: "Solicită ofertă",
        ctaSecondary: "Pornește configuratorul",
        badge: "Partener oficial Carrier Transicold",
      },
      stats: {
        years: "ani de experiență",
        customers: "clienți mulțumiți",
        conversions: "conversii pe an",
        employees: "specialiști",
        customersSuffix: "+",
        conversionsSuffix: "+",
        yearsSuffix: "+",
      },
      products: {
        eyebrow: "Produsele noastre",
        title: "Un vehicul. O mie de soluții.",
        lead: "De la street food la logistică farmaceutică - construim vehicule pentru orice sarcină sensibilă la temperatură.",
        items: [
          {
            title: "Furgonete frigorifice",
            body: "Izolare și montaj de unități frigorifice pentru Fiat, Mercedes, Ford, Renault, VW și Iveco - congelare, refrigerare sau multi-temperatură.",
            href: "products",
            image: "/images/a404687637b3.jpg",
          },
          {
            title: "Cutii frigorifice",
            body: "Cutii frigorifice ușoare din panouri sandwich pentru șasiuri de 3,5 t, cu unități Carrier sau Daikin, la dimensiuni personalizate.",
            href: "products",
            image: "/images/82308068d05b.jpg",
          },
          {
            title: "Suprastructuri comerciale",
            body: "Cutii din aluminiu, platforme cu prelată și suprastructuri speciale - cu interior din aluminiu, inox sau GRP.",
            href: "products",
            image: "/images/8bd1648f42cf.jpg",
          },
          {
            title: "Vehicule funerare",
            body: "Vehicule funerare demne, cu temperatură controlată (+18°C) și interior din inox, până la configurații pe mai multe niveluri.",
            href: "products",
            image: "/images/ae97125a0c4f.jpg",
          },
          {
            title: "Vânzare & service Carrier",
            body: "Vânzare, montaj și service pentru unitățile Carrier Xarios și Supra - piese originale din stoc, diagnoză, citire coduri de eroare.",
            href: "products",
            image: "/images/b05d04ca1183.jpg",
          },
          {
            title: "Reparații suprastructuri",
            body: "Înlocuirea panourilor sandwich deteriorate, gestionarea daunelor de asigurare, inspecții anuale și contracte de întreținere.",
            href: "products",
            image: "/images/b2c54816a378.jpg",
          },
        ],
      },
      process: {
        eyebrow: "Cum lucrăm",
        title: "De la ofertă la predare",
        lead: "Un proces predictibil, cu termene precise - motivul pentru care 280+ de clienți ne aleg în fiecare an.",
        steps: [
          {
            title: "Evaluarea nevoilor",
            body: "Analizăm sarcina de transport: marfă, temperatură, rute și obiceiuri de încărcare.",
          },
          {
            title: "Ofertă în 12 ore",
            body: "O ofertă detaliată, gratuită, cu documentație tehnică completă.",
          },
          {
            title: "Producție",
            body: "Construit pe 1.500 m², în patru hale de producție, de 33 de specialiști.",
          },
          {
            title: "Predare & garanție",
            body: "Protocol de predare verificat, garanție completă și suport de service.",
          },
        ],
      },
      video: {
        eyebrow: "În culise",
        title: "Priviți cum se construiește",
        lead: "Am filmat o conversie frigorifică completă - de la tabla goală până la compartimentul de -20°C.",
      },
      partners: {
        eyebrow: "Parteneri frigorifici",
        title: "Cele mai importante mărci de refrigerare. Un singur atelier.",
        lead: "Ca partener oficial Carrier Transicold vindem, montăm și întreținem - și reparăm și unități Daikin și Autoclima.",
        carrier: "Partener oficial - vânzare, montaj, service",
        daikin: "Service și reparații unități Daikin",
        autoclima: "Service și reparații unități Autoclima",
      },
      configuratorTeaser: {
        eyebrow: "Configurator online",
        title: "Construiți furgonul frigorific pas cu pas.",
        lead: "Alegeți marca, modelul, tipul de caroserie, unitatea frigorifică și căptușeala - calculatorul afișează prețul orientativ în timp real.",
        cta: "Pornește configuratorul",
      },
      ctaBand: {
        title: "Solicitați oferta chiar astăzi!",
        body: "În zilele lucrătoare trimitem în 12 ore o ofertă detaliată, cu documentație tehnică.",
        primary: "Cerere ofertă",
        secondary: "+36 20 910 20 50",
      },
    },
    gallery: {
      eyebrow: "Galerie foto",
        title: "Proiecte finalizate",
      lead: "Furgonete frigorifice, suprastructuri și conversii speciale finalizate - o selecție din ultimii ani.",
      all: "Toate",
      categories: [
        { id: "vans", label: "Furgonete frigorifice" },
        { id: "bodies", label: "Suprastructuri" },
        { id: "special", label: "Conversii speciale" },
      ],
      close: "Închide",
      prev: "Imaginea anterioară",
      nextImg: "Imaginea următoare",
      imageAlt: "Lucrare de referință Autotherm",
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Să discutăm despre proiectul dumneavoastră",
      lead: "Aveți întrebări? Sunați-ne, trimiteți un e-mail sau completați formularul - răspundem în 12 ore în zilele lucrătoare.",
      formTitle: "Trimiteți un mesaj",
      infoTitle: "Date de contact",
      gps: "GPS: 46° 16.060' N, 20° 7.331' E",
    },
    quotationPage: {
      eyebrow: "Cerere ofertă",
      title: "Ofertă gratuită și detaliată în 12 ore",
      lead: "Descrieți vehiculul sau suprastructura de care aveți nevoie - pregătim o ofertă exactă, cu documentație tehnică completă.",
      promiseTitle: "Ce include oferta?",
      promiseBody:
        "Oferta include conținutul tehnic, structura panourilor, dimensionarea unității frigorifice și un termen ferm.",
      bullets: [
        "Documentație tehnică detaliată",
        "Dimensionarea capacității frigorifice pentru marfa dumneavoastră",
        "Termen de livrare fix",
        "Opțiuni de finanțare",
      ],
    },
    blogPage: {
      eyebrow: "Blog vehicule frigorifice",
      title: "Cunoștințe despre transportul frigorific",
      lead: "Sfaturi practice, recomandări de întreținere și noutăți de la experții Autotherm.",
      empty: "Primele articole vor apărea în curând - reveniți mai târziu!",
      published: "Publicat",
    },
    notFound: {
      title: "Pagina nu a fost găsită",
      body: "Pagina căutată nu există sau a fost mutată. Vizitați pagina principală sau solicitați o ofertă!",
      cta: "Înapoi la pagina principală",
    },
    stickyCta: "Cerere ofertă",
  },
};

export function getDict(lang: Lang): Dict {
  return dictionaries[lang] ?? dictionaries.hu;
}
