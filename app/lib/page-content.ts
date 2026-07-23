import type { Lang } from "./constants";
import type { PageKey } from "./routes";

/**
 * Structured content for informational pages, rendered by the shared
 * InfoPage template. Only languages in which a page exists (see routes.ts)
 * carry content here.
 */

export type IconName =
  | "snowflake"
  | "shield"
  | "wrench"
  | "truck"
  | "clock"
  | "factory"
  | "medal"
  | "layers"
  | "thermometer"
  | "heart"
  | "check"
  | "spark";

export interface InfoFeature {
  icon: IconName;
  title: string;
  body: string;
}

export interface InfoSection {
  title: string;
  body: string[];
  bullets?: string[];
  image?: string;
}

export interface InfoPageContent {
  eyebrow: string;
  title: string;
  lead: string;
  heroImage?: string;
  features?: InfoFeature[];
  sections?: InfoSection[];
  gallery?: string[];
  cta: { title: string; body: string };
}

export const infoPages: Partial<
  Record<PageKey, Partial<Record<Lang, InfoPageContent>>>
> = {
  /* --------------------------------- ABOUT --------------------------------- */
  about: {
    hu: {
      eyebrow: "Kik vagyunk?",
      title: "Három évtized a hideg szolgálatában",
      lead: "Az Autotherm Kft.-t 1992-ben alapította Csurgó László és Dkfm. Peter Knerer Szegeden. Ma 33 munkatárssal, négy gyártócsarnokban, 1500 m²-en építjük Magyarország és Európa hűtőautóit.",
      heroImage: "/images/b2e2e8348e1b.jpg",
      features: [
        {
          icon: "factory",
          title: "1500 m² gyártótér",
          body: "Négy, célgépekkel felszerelt gyártócsarnok Szegeden - a szigeteléstől a végszerelésig mindent házon belül végzünk.",
        },
        {
          icon: "medal",
          title: "Hivatalos Carrier partner",
          body: "A Carrier Transicold hivatalos partnereként értékesítjük, építjük be és szervizeljük a Xarios és Supra raktérhűtőket.",
        },
        {
          icon: "heart",
          title: "3000+ elégedett ügyfél",
          body: "A sarki hentestől az országos hűtőlogisztikai flottákig - ügyfeleink többsége visszatérő megrendelő.",
        },
        {
          icon: "clock",
          title: "1995 óta Thermo King múlt",
          body: "Történelmi partnerségünk a Thermo Kinggel a kilencvenes évekig nyúlik vissza - a tapasztalat nálunk generációs tudás.",
        },
      ],
      sections: [
        {
          title: "A kezdetektől évi 280 járműig",
          body: [
            "1992-ben egy szegedi műhelyben kezdtük, ma évente több mint 280 járművet alakítunk át vagy építünk fel. A növekedés titka változatlan: pontos határidők, mérnöki precizitás és őszinte kommunikáció.",
            "A poliuretán szendvicspanelektől a mai elektromos járművek hűtési megoldásaiig: minden jármű úgy készül, mintha a sajátunk lenne.",
          ],
        },
        {
          title: "Amit ma kínálunk",
          body: [
            "Teljes palettát fedünk le a hűtött szállításban: hűtős furgonok, hűtődobozos felépítmények, haszonjármű felépítmények, elhunytszállító járművek és teljes körű Carrier–Daikin szerviz.",
          ],
          bullets: [
            "Hűtős furgon átalakítás minden elterjedt alapjárműre",
            "Egyedi méretű alvázas felépítmények 3,5 tonnáig",
            "Carrier és Daikin hűtőberendezések értékesítése és szervize",
            "Biztosítói kárjavítás és karbantartási szerződések",
          ],
        },
      ],
      gallery: [
        "/images/be3495baa194.jpg",
        "/images/be8bb6a35e77.jpg",
        "/images/d029c0586d66.jpg",
      ],
      cta: {
        title: "Ismerjük meg egymást!",
        body: "Mondja el, mit szállít - mi megtervezzük hozzá a tökéletes járművet.",
      },
    },
    en: {
      eyebrow: "Who we are",
      title: "Three decades in the service of cold",
      lead: "Autotherm Ltd. was founded in 1992 in Szeged, Hungary, by László Csurgó and Dkfm. Peter Knerer. Today 33 specialists build Europe's refrigerated vehicles across four production halls and 1,500 m².",
      heroImage: "/images/b2e2e8348e1b.jpg",
      features: [
        {
          icon: "factory",
          title: "1,500 m² production space",
          body: "Four purpose-equipped production halls in Szeged - from insulation to final assembly, everything happens in-house.",
        },
        {
          icon: "medal",
          title: "Official Carrier partner",
          body: "As an official Carrier Transicold partner we sell, install and service Xarios and Supra cooling units.",
        },
        {
          icon: "heart",
          title: "3,000+ satisfied clients",
          body: "From the corner butcher to nationwide cold-chain fleets - most of our customers keep coming back.",
        },
        {
          icon: "clock",
          title: "Thermo King heritage since 1995",
          body: "Our historic partnership with Thermo King reaches back to the nineties - experience here is generational knowledge.",
        },
      ],
      sections: [
        {
          title: "From a workshop to 280 vehicles a year",
          body: [
            "We started in a small Szeged workshop in 1992; today we convert or build more than 280 vehicles a year. The recipe never changed: precise deadlines, engineering rigour and honest communication.",
            "From early polyurethane sandwich panels to today's EV-ready cooling solutions: every vehicle is built as if it were our own.",
          ],
        },
        {
          title: "What we offer today",
          body: [
            "We cover the full spectrum of temperature-controlled transport: refrigerated vans, cooled box bodies, commercial vehicle bodies, deceased transport vehicles and complete Carrier–Daikin service.",
          ],
          bullets: [
            "Refrigerated conversions for every common base vehicle",
            "Custom-size chassis bodies up to 3.5 t",
            "Carrier and Daikin cooling unit sales and service",
            "Insurance claim repairs and maintenance contracts",
          ],
        },
      ],
      gallery: [
        "/images/be3495baa194.jpg",
        "/images/be8bb6a35e77.jpg",
        "/images/d029c0586d66.jpg",
      ],
      cta: {
        title: "Let's get acquainted!",
        body: "Tell us what you transport - we'll engineer the right vehicle for it.",
      },
    },
    de: {
      eyebrow: "Wer sind wir?",
      title: "Drei Jahrzehnte im Dienst der Kälte",
      lead: "Autotherm wurde 1992 in Szeged, Ungarn, von László Csurgó und Dkfm. Peter Knerer gegründet. Heute bauen 33 Spezialisten in vier Produktionshallen auf 1.500 m² die Kühlfahrzeuge Europas.",
      heroImage: "/images/b2e2e8348e1b.jpg",
      features: [
        {
          icon: "factory",
          title: "1.500 m² Produktionsfläche",
          body: "Vier zweckausgestattete Produktionshallen in Szeged - von der Isolierung bis zur Endmontage geschieht alles im Haus.",
        },
        {
          icon: "medal",
          title: "Offizieller Carrier Partner",
          body: "Als offizieller Carrier Transicold Partner verkaufen, montieren und warten wir Xarios- und Supra-Aggregate.",
        },
        {
          icon: "heart",
          title: "3.000+ zufriedene Kunden",
          body: "Vom Metzger an der Ecke bis zur landesweiten Kühlketten-Flotte - die meisten Kunden kommen wieder.",
        },
        {
          icon: "clock",
          title: "Thermo King Erbe seit 1995",
          body: "Unsere historische Partnerschaft mit Thermo King reicht in die Neunziger zurück - Erfahrung ist bei uns Generationenwissen.",
        },
      ],
      sections: [
        {
          title: "Von der Werkstatt zu 280 Fahrzeugen pro Jahr",
          body: [
            "1992 begannen wir in einer kleinen Szegediner Werkstatt; heute bauen oder rüsten wir jährlich über 280 Fahrzeuge um. Das Rezept blieb unverändert: präzise Termine, Ingenieursdisziplin und ehrliche Kommunikation.",
            "Von Polyurethan-Sandwichpaneelen bis zu heutigen E-Fahrzeug-Kühllösungen: Jedes Fahrzeug wird gebaut, als wäre es unser eigenes.",
          ],
        },
        {
          title: "Unser heutiges Angebot",
          body: [
            "Wir decken das gesamte Spektrum des temperaturgeführten Transports ab: Kühltransporter, Kühlkoffer, Nutzfahrzeugaufbauten, Bestattungswagen und kompletten Carrier–Daikin-Service.",
          ],
          bullets: [
            "Kühlumbauten für alle gängigen Basisfahrzeuge",
            "Fahrgestellaufbauten in Sondergrößen bis 3,5 t",
            "Verkauf und Service von Carrier- und Daikin-Aggregaten",
            "Versicherungsreparaturen und Wartungsverträge",
          ],
        },
      ],
      gallery: [
        "/images/be3495baa194.jpg",
        "/images/be8bb6a35e77.jpg",
        "/images/d029c0586d66.jpg",
      ],
      cta: {
        title: "Lernen wir uns kennen!",
        body: "Sagen Sie uns, was Sie transportieren - wir konstruieren das perfekte Fahrzeug dafür.",
      },
    },
    ro: {
      eyebrow: "Cine suntem noi?",
      title: "Trei decenii în slujba frigului",
      lead: "Autotherm a fost fondată în 1992 la Szeged, Ungaria, de László Csurgó și Dkfm. Peter Knerer. Astăzi, 33 de specialiști construiesc vehiculele frigorifice ale Europei în patru hale de producție, pe 1.500 m².",
      heroImage: "/images/b2e2e8348e1b.jpg",
      features: [
        {
          icon: "factory",
          title: "1.500 m² spațiu de producție",
          body: "Patru hale de producție echipate special, la Szeged - de la izolare la asamblarea finală, totul se face intern.",
        },
        {
          icon: "medal",
          title: "Partener oficial Carrier",
          body: "Ca partener oficial Carrier Transicold, vindem, montăm și întreținem unitățile Xarios și Supra.",
        },
        {
          icon: "heart",
          title: "3.000+ clienți mulțumiți",
          body: "De la măcelăria din colț la flote naționale de lanț frigorific - majoritatea clienților revin.",
        },
        {
          icon: "clock",
          title: "Moștenire Thermo King din 1995",
          body: "Parteneriatul nostru istoric cu Thermo King datează din anii '90 - experiența este la noi cunoaștere de generații.",
        },
      ],
      sections: [
        {
          title: "De la atelier la 280 de vehicule pe an",
          body: [
            "Am început în 1992 într-un mic atelier din Szeged; astăzi convertim sau construim peste 280 de vehicule pe an. Rețeta nu s-a schimbat: termene precise, rigoare inginerească și comunicare onestă.",
            "De la panouri sandwich din poliuretan la soluțiile de răcire pentru vehicule electrice de azi: fiecare vehicul este construit ca și cum ar fi al nostru.",
          ],
        },
        {
          title: "Ce oferim astăzi",
          body: [
            "Acoperim întregul spectru al transportului cu temperatură controlată: furgonete frigorifice, cutii frigorifice, suprastructuri comerciale, vehicule funerare și service complet Carrier–Daikin.",
          ],
          bullets: [
            "Conversii frigorifice pentru toate vehiculele de bază uzuale",
            "Suprastructuri pe șasiu la dimensiuni personalizate până la 3,5 t",
            "Vânzare și service unități Carrier și Daikin",
            "Reparații daune asigurare și contracte de întreținere",
          ],
        },
      ],
      gallery: [
        "/images/be3495baa194.jpg",
        "/images/be8bb6a35e77.jpg",
        "/images/d029c0586d66.jpg",
      ],
      cta: {
        title: "Să ne cunoaștem!",
        body: "Spuneți-ne ce transportați - noi proiectăm vehiculul potrivit pentru asta.",
      },
    },
  },

  /* -------------------------------- PRODUCTS -------------------------------- */
  products: {
    hu: {
      eyebrow: "Termékeink",
      title: "Járművek, amelyek tartják a hideget",
      lead: "Hűtős furgonok, hűtődobozos felépítmények, haszonjármű felépítmények és elhunytszállító járművek - mind egyedi igényekre méretezve, 3,5 tonnáig.",
      heroImage: "/images/e4566315cd28.jpg",
      features: [
        {
          icon: "snowflake",
          title: "Hűtős furgonok",
          body: "Fiat Ducato, Mercedes Sprinter, Ford Transit, Renault Master, VW Crafter és Iveco Daily átalakítások - fagyasztott (-18°C…-20°C), hűtött (0°C…+4°C) vagy több hőmérsékletű kivitelben.",
        },
        {
          icon: "layers",
          title: "Hűtődobozos felépítmények",
          body: "Könnyűszerkezetes szendvicspaneles dobozok 3,5 tonnás alvázakra, Carrier vagy Daikin hűtőegységgel, egyedi méretben.",
        },
        {
          icon: "truck",
          title: "Haszonjármű felépítmények",
          body: "Alumínium dobozok, platós-ponyvás és speciális felépítmények - alumínium, rozsdamentes vagy üvegszálas (GRP) belső burkolattal.",
        },
        {
          icon: "heart",
          title: "Elhunytszállító járművek",
          body: "Kegyeleti szempontból kifogástalan, +18°C-ra temperált, rozsdamentes belső terű járművek, akár többszintes kialakítással.",
        },
        {
          icon: "wrench",
          title: "Alvázas felépítmények",
          body: "Egyedi építésű 3,5 tonnás felépítmények bármilyen alvázra - a tervezéstől a forgalomba helyezésig.",
        },
        {
          icon: "shield",
          title: "Javítás és szerviz",
          body: "Felépítmények és hűtőberendezések javítása, karbantartása - Carrier és Daikin szakszerviz, mobil szerviz, éves felülvizsgálatok.",
        },
      ],
      sections: [
        {
          title: "Miből épül egy Autotherm jármű?",
          body: [
            "Minden felépítményünk hőhídmentes poliuretán szendvicspanelekből készül, élelmiszeripari minőségű, mosható belső felülettel. A hűtőberendezést a szállított áruhoz és az ajtónyitások gyakoriságához méretezzük - nem katalógusból, hanem hőtechnikai számítással.",
          ],
          bullets: [
            "HACCP-kompatibilis, higiénikus kialakítás",
            "LED raktérvilágítás és lecsapódásmentes szellőzés",
            "Erősített padló görgős konténerekhez",
            "Opcionális hőmérséklet-regisztráló (termográf)",
          ],
        },
      ],
      gallery: [
        "/images/e7f13b6c4bc5.jpg",
        "/images/fca243146ad0.jpg",
        "/images/db347b9ebd92.jpg",
      ],
      cta: {
        title: "Nem találja, amit keres?",
        body: "Speciális igénye van? Pont ez a specialitásunk. Kérjen egyedi ajánlatot!",
      },
    },
    en: {
      eyebrow: "Our products",
      title: "Vehicles that keep their cool",
      lead: "Refrigerated vans, cooled box bodies, commercial vehicle bodies and deceased transport vehicles - all engineered to your needs, up to 3.5 t.",
      heroImage: "/images/e4566315cd28.jpg",
      features: [
        {
          icon: "snowflake",
          title: "Refrigerated vans",
          body: "Fiat Ducato, Mercedes Sprinter, Ford Transit, Renault Master, VW Crafter and Iveco Daily conversions - frozen (-18°C…-20°C), chilled (0°C…+4°C) or multi-temperature.",
        },
        {
          icon: "layers",
          title: "Cooled box bodies",
          body: "Lightweight sandwich-panel boxes for 3.5 t chassis with Carrier or Daikin cooling units, built to custom dimensions.",
        },
        {
          icon: "truck",
          title: "Commercial vehicle bodies",
          body: "Aluminium boxes, flatbed-tarpaulin and special bodies - with aluminium, stainless steel or GRP interior lining.",
        },
        {
          icon: "heart",
          title: "Deceased transport vehicles",
          body: "Dignified vehicles tempered to +18°C with stainless steel interiors, up to multi-level configurations.",
        },
        {
          icon: "wrench",
          title: "Chassis bodies",
          body: "Custom-built 3.5 t bodies on any chassis make - from design to registration.",
        },
        {
          icon: "shield",
          title: "Repair & service",
          body: "Repair and maintenance of bodies and cooling units - authorized Carrier and Daikin service, mobile repair, annual inspections.",
        },
      ],
      sections: [
        {
          title: "What is an Autotherm vehicle made of?",
          body: [
            "Every body is built from thermal-bridge-free polyurethane sandwich panels with food-grade washable interior surfaces. Cooling units are sized to your cargo and door-opening frequency - by thermal calculation, not by catalogue.",
          ],
          bullets: [
            "HACCP-compatible hygienic design",
            "LED cargo lighting and condensation-free ventilation",
            "Reinforced floor for roll containers",
            "Optional temperature recorder (thermograph)",
          ],
        },
      ],
      gallery: [
        "/images/e7f13b6c4bc5.jpg",
        "/images/fca243146ad0.jpg",
        "/images/db347b9ebd92.jpg",
      ],
      cta: {
        title: "Can't find what you need?",
        body: "Special requirements are our speciality. Request a custom quote!",
      },
    },
    de: {
      eyebrow: "Kühlfahrzeug",
      title: "Fahrzeuge, die kühl bleiben",
      lead: "Kühltransporter, Kühlkoffer, Nutzfahrzeugaufbauten und Bestattungswagen - alle nach Ihren Anforderungen konstruiert, bis 3,5 t.",
      heroImage: "/images/e4566315cd28.jpg",
      features: [
        {
          icon: "snowflake",
          title: "Kühltransporter",
          body: "Umbauten für Fiat Ducato, Mercedes Sprinter, Ford Transit, Renault Master, VW Crafter und Iveco Daily - Tiefkühl (-18°C…-20°C), gekühlt (0°C…+4°C) oder Mehrtemperatur.",
        },
        {
          icon: "layers",
          title: "Kühlkoffer",
          body: "Leichte Sandwichpaneel-Koffer für 3,5-t-Fahrgestelle mit Carrier- oder Daikin-Aggregaten, in Sondermaßen gefertigt.",
        },
        {
          icon: "truck",
          title: "Nutzfahrzeugaufbauten",
          body: "Aluminiumkoffer, Pritsche mit Plane und Spezialaufbauten - mit Aluminium-, Edelstahl- oder GFK-Innenverkleidung.",
        },
        {
          icon: "heart",
          title: "Bestattungswagen",
          body: "Würdevolle, auf +18°C temperierte Fahrzeuge mit Edelstahl-Innenausbau, bis zu mehrstöckigen Konfigurationen.",
        },
        {
          icon: "wrench",
          title: "Fahrgestellaufbauten",
          body: "Individuell gebaute 3,5-t-Aufbauten auf jedem Fahrgestell - von der Konstruktion bis zur Zulassung.",
        },
        {
          icon: "shield",
          title: "Reparatur & Service",
          body: "Reparatur und Wartung von Aufbauten und Kühlaggregaten - autorisierter Carrier- und Daikin-Service, mobiler Service, Jahresinspektionen.",
        },
      ],
      sections: [
        {
          title: "Woraus besteht ein Autotherm-Fahrzeug?",
          body: [
            "Jeder Aufbau entsteht aus wärmebrückenfreien Polyurethan-Sandwichpaneelen mit lebensmittelechten, abwaschbaren Innenflächen. Die Kühlaggregate dimensionieren wir nach Ware und Türöffnungsfrequenz - per Wärmeberechnung, nicht nach Katalog.",
          ],
          bullets: [
            "HACCP-kompatible, hygienische Ausführung",
            "LED-Laderaumbeleuchtung und kondensfreie Belüftung",
            "Verstärkter Boden für Rollbehälter",
            "Optionaler Temperaturschreiber (Thermograph)",
          ],
        },
      ],
      gallery: [
        "/images/e7f13b6c4bc5.jpg",
        "/images/fca243146ad0.jpg",
        "/images/db347b9ebd92.jpg",
      ],
      cta: {
        title: "Nicht das Passende gefunden?",
        body: "Sonderwünsche sind unsere Spezialität. Fordern Sie ein individuelles Angebot an!",
      },
    },
    ro: {
      eyebrow: "Carosări & furgonete frigorifice",
      title: "Vehicule care își păstrează răceala",
      lead: "Furgonete frigorifice, cutii frigorifice, suprastructuri comerciale și vehicule funerare - toate proiectate după nevoile dumneavoastră, până la 3,5 t.",
      heroImage: "/images/e4566315cd28.jpg",
      features: [
        {
          icon: "snowflake",
          title: "Furgonete frigorifice",
          body: "Conversii Fiat Ducato, Mercedes Sprinter, Ford Transit, Renault Master, VW Crafter și Iveco Daily - congelare (-18°C…-20°C), refrigerare (0°C…+4°C) sau multi-temperatură.",
        },
        {
          icon: "layers",
          title: "Cutii frigorifice",
          body: "Cutii ușoare din panouri sandwich pentru șasiuri de 3,5 t, cu unități Carrier sau Daikin, la dimensiuni personalizate.",
        },
        {
          icon: "truck",
          title: "Suprastructuri comerciale",
          body: "Cutii din aluminiu, platforme cu prelată și suprastructuri speciale - cu interior din aluminiu, inox sau GRP.",
        },
        {
          icon: "heart",
          title: "Vehicule funerare",
          body: "Vehicule demne, temperate la +18°C, cu interior din inox, până la configurații pe mai multe niveluri.",
        },
        {
          icon: "wrench",
          title: "Suprastructuri pe șasiu",
          body: "Suprastructuri de 3,5 t construite la comandă pe orice marcă de șasiu - de la proiectare la înmatriculare.",
        },
        {
          icon: "shield",
          title: "Reparații & service",
          body: "Reparații și întreținere pentru suprastructuri și unități frigorifice - service autorizat Carrier și Daikin, service mobil, inspecții anuale.",
        },
      ],
      sections: [
        {
          title: "Din ce este făcut un vehicul Autotherm?",
          body: [
            "Fiecare suprastructură este construită din panouri sandwich din poliuretan, fără punți termice, cu suprafețe interioare lavabile de calitate alimentară. Unitățile frigorifice sunt dimensionate după marfă și frecvența deschiderii ușilor - prin calcul termic, nu după catalog.",
          ],
          bullets: [
            "Design igienic, compatibil HACCP",
            "Iluminare LED și ventilație fără condens",
            "Pardoseală ranforsată pentru containere mobile",
            "Termograf opțional (înregistrator de temperatură)",
          ],
        },
      ],
      gallery: [
        "/images/e7f13b6c4bc5.jpg",
        "/images/fca243146ad0.jpg",
        "/images/db347b9ebd92.jpg",
      ],
      cta: {
        title: "Nu găsiți ce căutați?",
        body: "Cerințele speciale sunt specialitatea noastră. Solicitați o ofertă personalizată!",
      },
    },
  },

  /* --------------------------------- SERVICE -------------------------------- */
  service: {
    hu: {
      eyebrow: "Szerviz",
      title: "Carrier és Daikin szakszerviz",
      lead: "Raktérhűtő berendezések szervizelése, javítása és karbantartása - eredeti alkatrészek raktárról, gyári diagnosztika, hibakód-olvasás.",
      heroImage: "/images/b05d04ca1183.jpg",
      features: [
        {
          icon: "wrench",
          title: "Gyári diagnosztika",
          body: "Hibakód-olvasás és teljes rendszerdiagnosztika Carrier és Daikin egységekhez - a hiba okát tárjuk fel a tünet helyett.",
        },
        {
          icon: "clock",
          title: "Gyors átfutás",
          body: "Tudjuk, hogy az álló hűtőautó pénzbe kerül. Előre egyeztetett időpont, raktárról elérhető alkatrészek, minimális állásidő.",
        },
        {
          icon: "truck",
          title: "Mobil szerviz",
          body: "Útközbeni meghibásodás? Mobil szervizünk országúton is elhárítja a hibát, hogy a rakomány ne olvadjon meg.",
        },
        {
          icon: "shield",
          title: "Karbantartási szerződések",
          body: "Éves felülvizsgálatok és flottaszintű karbantartási szerződések - tervezhető költségek, megelőzött meghibásodások.",
        },
      ],
      sections: [
        {
          title: "Mikor hozza be a járművét?",
          body: [
            "A raktérhűtő nem hűt eléggé, nem indul, jegesedik, vagy hibakódot dob? Ne várja meg, amíg a rakomány bánja - a legtöbb meghibásodás korai fázisban töredék áron javítható.",
          ],
          bullets: [
            "Szezonális átvizsgálás (téli/nyári üzem előtt)",
            "Hűtőközeg-töltés és tömörségvizsgálat",
            "Kondenzátor- és párologtató-tisztítás",
            "Hajtószíj, tengelykapcsoló és elektromos rendszer ellenőrzés",
          ],
        },
      ],
      cta: {
        title: "Szervizidőpontot egyeztetne?",
        body: "Hívjon minket munkanapokon 8:00 és 16:30 között, vagy írjon üzenetet!",
      },
    },
  },

  /* ----------------------------- CARRIER SERVICE ---------------------------- */
  carrierService: {
    hu: {
      eyebrow: "Carrier raktérhűtő",
      title: "Hivatalos Carrier Transicold képviselet",
      lead: "Carrier raktérhűtők értékesítése, beépítése és szervizelése - Xarios és Supra modellek, hőtechnikai méretezéssel, gyári garanciával.",
      heroImage: "/images/45196215f76f.jpg",
      features: [
        {
          icon: "snowflake",
          title: "Carrier Xarios",
          body: "Közvetlen hajtású egységek furgonokhoz - kompakt beépítés, -20°C-ig terjedő tartomány, halk működés.",
        },
        {
          icon: "thermometer",
          title: "Carrier Supra",
          body: "Önálló dízelmotoros aggregátok dobozos felépítményekhez - motorfüggetlen hűtés, hosszú távú bevetésre.",
        },
        {
          icon: "check",
          title: "Méretezés számítással",
          body: "A megfelelő hűtőegységet a raktér térfogata, a szigetelés és az ajtónyitások alapján méretezzük - garantált hőntartás.",
        },
        {
          icon: "shield",
          title: "Gyári garancia + szerviz",
          body: "Hivatalos partnerként gyári garanciával értékesítünk, és a teljes életciklus alatt szervizeljük az egységet.",
        },
      ],
      sections: [
        {
          title: "Beépítés, ahogy a gyár álmodta",
          body: [
            "A Carrier egységek beépítését gyári előírás szerint, dokumentáltan végezzük: erősített konzolok, professzionális hűtőköri szerelés, vákuumozás és teljesítménymérés átadás előtt.",
          ],
          bullets: [
            "Eredeti Carrier alkatrészek raktárról",
            "Beépítés 2-3 munkanap alatt",
            "Használt egységek beszámítása",
            "Országos szervizháttér",
          ],
        },
      ],
      cta: {
        title: "Melyik Carrier egység való Önnek?",
        body: "Küldje el a raktér méreteit és a szállított árut - díjmentesen méretezzük a hűtőegységet.",
      },
    },
  },

  /* --------------------------------- WHY US --------------------------------- */
  whyUs: {
    hu: {
      eyebrow: "Miért mi?",
      title: "Ezért választanak minket évtizedek óta",
      lead: "A hűtőautó bizalmi termék: az áruja, a határidői és a jó híre múlik rajta. Mi ezt a bizalmat 1992 óta építjük - járművenként.",
      heroImage: "/images/d029c0586d66.jpg",
      features: [
        {
          icon: "medal",
          title: "30+ év tapasztalat",
          body: "Több ezer átalakítás tapasztalata épül be minden új járműbe - a tipikus hibákat mi már 1995-ben kijavítottuk.",
        },
        {
          icon: "clock",
          title: "Árajánlat 12 órán belül",
          body: "Munkanapokon 12 órán belül részletes, műszaki dokumentációval ellátott ajánlatot kap - nem hasraütést.",
        },
        {
          icon: "spark",
          title: "Egyedi gyártás",
          body: "Nem katalógusból dolgozunk: a felépítményt az Ön árujához, útvonalaihoz és rakodási szokásaihoz tervezzük.",
        },
        {
          icon: "shield",
          title: "Garancia és szervizháttér",
          body: "Teljes körű garancia, saját szakszerviz, mobil szerviz és karbantartási szerződések - az átadás után sem engedjük el a kezét.",
        },
        {
          icon: "factory",
          title: "Minden házon belül",
          body: "Szigetelés, burkolás, hűtőgép-beépítés, elektromos rendszer - nincs alvállalkozói lánc, nincs felelősség-tologatás.",
        },
        {
          icon: "heart",
          title: "3000+ visszatérő ügyfél",
          body: "Legjobb referenciánk, hogy ügyfeleink flottabővítéskor is hozzánk térnek vissza.",
        },
      ],
      cta: {
        title: "Győződjön meg róla személyesen!",
        body: "Látogasson el szegedi telephelyünkre, vagy kérjen ajánlatot még ma.",
      },
    },
    en: {
      eyebrow: "Why us?",
      title: "Why clients have chosen us for decades",
      lead: "A refrigerated vehicle is a product of trust: your cargo, your deadlines and your reputation ride on it. We've been building that trust since 1992 - one vehicle at a time.",
      heroImage: "/images/d029c0586d66.jpg",
      features: [
        {
          icon: "medal",
          title: "30+ years of experience",
          body: "The experience of thousands of conversions is built into every new vehicle - we fixed the typical mistakes back in 1995.",
        },
        {
          icon: "clock",
          title: "Quote within 12 hours",
          body: "On workdays you receive a detailed quotation with technical documentation within 12 hours - not a guess.",
        },
        {
          icon: "spark",
          title: "Custom manufacturing",
          body: "We don't work from a catalogue: your body is engineered around your cargo, routes and loading habits.",
        },
        {
          icon: "shield",
          title: "Warranty & service backing",
          body: "Full warranty, our own authorized workshop, mobile service and maintenance contracts - we don't let go after handover.",
        },
        {
          icon: "factory",
          title: "Everything in-house",
          body: "Insulation, lining, cooling unit installation, electrics - no subcontractor chain, no passing the buck.",
        },
        {
          icon: "heart",
          title: "3,000+ returning clients",
          body: "Our best reference: customers come back to us when they expand their fleets.",
        },
      ],
      cta: {
        title: "See for yourself!",
        body: "Visit our Szeged facility, or request a quote today.",
      },
    },
    de: {
      eyebrow: "Warum gerade wir?",
      title: "Darum wählen uns Kunden seit Jahrzehnten",
      lead: "Ein Kühlfahrzeug ist ein Vertrauensprodukt: Ihre Ware, Ihre Termine und Ihr Ruf hängen daran. Dieses Vertrauen bauen wir seit 1992 auf - Fahrzeug für Fahrzeug.",
      heroImage: "/images/d029c0586d66.jpg",
      features: [
        {
          icon: "medal",
          title: "30+ Jahre Erfahrung",
          body: "Die Erfahrung aus Tausenden Umbauten steckt in jedem neuen Fahrzeug - die typischen Fehler haben wir schon 1995 behoben.",
        },
        {
          icon: "clock",
          title: "Angebot in 12 Stunden",
          body: "Werktags erhalten Sie innerhalb von 12 Stunden ein detailliertes Angebot mit technischer Dokumentation - keine Schätzung.",
        },
        {
          icon: "spark",
          title: "Maßgeschneiderte Fertigung",
          body: "Wir arbeiten nicht nach Katalog: Ihr Aufbau wird um Ihre Ware, Routen und Beladegewohnheiten herum konstruiert.",
        },
        {
          icon: "shield",
          title: "Garantie & Servicenetz",
          body: "Volle Garantie, eigene Fachwerkstatt, mobiler Service und Wartungsverträge - nach der Übergabe lassen wir nicht los.",
        },
        {
          icon: "factory",
          title: "Alles im Haus",
          body: "Isolierung, Verkleidung, Aggregat-Einbau, Elektrik - keine Subunternehmerkette, kein Verantwortungs-Pingpong.",
        },
        {
          icon: "heart",
          title: "3.000+ Stammkunden",
          body: "Unsere beste Referenz: Kunden kommen bei Flottenerweiterungen zu uns zurück.",
        },
      ],
      cta: {
        title: "Überzeugen Sie sich selbst!",
        body: "Besuchen Sie unser Werk in Szeged oder fordern Sie noch heute ein Angebot an.",
      },
    },
  },

  /* ---------------------------- COMMERCIAL BODIES ---------------------------- */
  commercialBodies: {
    hu: {
      eyebrow: "Haszonjármű felépítmények",
      title: "Felépítmények 3,5 tonnáig - pontosan méretre",
      lead: "Alumínium dobozok, hűtős dobozok, platós-ponyvás és speciális felépítmények bármilyen alvázra - a tervezéstől a forgalomba helyezésig.",
      heroImage: "/images/8bd1648f42cf.jpg",
      features: [
        {
          icon: "layers",
          title: "Alumínium doboz",
          body: "Könnyű, korrózióálló zárt doboz - maximális hasznos teher, minimális önsúly.",
        },
        {
          icon: "snowflake",
          title: "Hűtős doboz",
          body: "Szendvicspaneles, hőhídmentes hűtődoboz Carrier vagy Daikin egységgel, akár osztott raktérrel.",
        },
        {
          icon: "truck",
          title: "Platós-ponyvás",
          body: "Oldalról is rakodható kialakítás - építőipar, mezőgazdaság, általános fuvarozás.",
        },
        {
          icon: "spark",
          title: "Speciális felépítmények",
          body: "Élelmiszer-árusító járművek, műhelykocsik, egyedi funkciójú felépítmények - mondja el az ötletét, mi megépítjük.",
        },
      ],
      sections: [
        {
          title: "Belső burkolatok minden feladatra",
          body: [
            "A felépítmény belseje határozza meg a mindennapi használhatóságot. Három bevált burkolatrendszerrel dolgozunk, feladathoz igazítva:",
          ],
          bullets: [
            "Alumínium - ütésálló, ipari igénybevételre",
            "Rozsdamentes acél - hús- és gyógyszeripari előírásokhoz",
            "Üvegszál (GRP) - varratmentes, higiénikus, könnyen tisztítható",
          ],
        },
      ],
      gallery: [
        "/images/a51e2c833b3a.jpg",
        "/images/82308068d05b.jpg",
        "/images/785d3105c7c6.jpg",
      ],
      cta: {
        title: "Alváza már van?",
        body: "Küldje el az alváz típusát és a szállítási feladatot - 12 órán belül árajánlatot adunk a felépítményre.",
      },
    },
    en: {
      eyebrow: "Commercial vehicle bodies",
      title: "Bodies up to 3.5 tons - built exactly to size",
      lead: "Aluminium boxes, refrigerated boxes, flatbed-tarpaulin and special bodies on any chassis make - from design to registration.",
      heroImage: "/images/8bd1648f42cf.jpg",
      features: [
        {
          icon: "layers",
          title: "Aluminium box body",
          body: "Light, corrosion-resistant enclosed box - maximum payload, minimum kerb weight.",
        },
        {
          icon: "snowflake",
          title: "Refrigerated box",
          body: "Sandwich-panel, thermal-bridge-free refrigerated box with Carrier or Daikin unit, optionally with split compartments.",
        },
        {
          icon: "truck",
          title: "Flatbed with tarpaulin",
          body: "Side-loading design - construction, agriculture, general haulage.",
        },
        {
          icon: "spark",
          title: "Special vehicle bodies",
          body: "Food vending vehicles, workshop trucks, single-purpose custom bodies - tell us your idea, we'll build it.",
        },
      ],
      sections: [
        {
          title: "Interior linings for every job",
          body: [
            "The interior determines day-to-day usability. We work with three proven lining systems, matched to your task:",
          ],
          bullets: [
            "Aluminium - impact-resistant, for industrial use",
            "Stainless steel - for meat and pharmaceutical regulations",
            "GRP (fibreglass) - jointless, hygienic, easy to clean",
          ],
        },
      ],
      gallery: [
        "/images/a51e2c833b3a.jpg",
        "/images/82308068d05b.jpg",
        "/images/785d3105c7c6.jpg",
      ],
      cta: {
        title: "Already have a chassis?",
        body: "Send us the chassis type and your transport task - we'll quote the body within 12 hours.",
      },
    },
  },

  /* ------------------------------- BODY REPAIR ------------------------------- */
  bodyRepair: {
    hu: {
      eyebrow: "Járműfelépítmény javítás",
      title: "Sérült felépítmény? Gyorsan rendbe hozzuk.",
      lead: "Károsodott szendvicspanelek cseréje, horpadások, beázások és ajtószerkezetek javítása - akár teljes biztosítói ügyintézéssel.",
      heroImage: "/images/b2c54816a378.jpg",
      features: [
        {
          icon: "wrench",
          title: "Szendvicspanel csere",
          body: "Sérült panelek szakszerű cseréje az eredeti hőszigetelési érték helyreállításával - funkcionális javítás, nem felületi korrekció.",
        },
        {
          icon: "shield",
          title: "Biztosítói kárrendezés",
          body: "A kárfelvételtől a számlázásig intézzük a biztosítói ügymenetet - Önnek csak a kulcsot kell átadnia.",
        },
        {
          icon: "clock",
          title: "Minimális állásidő",
          body: "Előre lefoglalt anyag és időablak - a jármű csak addig áll, ameddig feltétlenül szükséges.",
        },
        {
          icon: "check",
          title: "Éves felülvizsgálat",
          body: "Megelőző karbantartás és állapotfelmérés - a kis hibák még kicsiként derüljenek ki.",
        },
      ],
      cta: {
        title: "Kár érte a felépítményt?",
        body: "Küldjön fotókat a sérülésről - előzetes javítási ajánlatot adunk akár aznap.",
      },
    },
  },

  /* -------------------------------- OUR SERVICE ------------------------------- */
  ourService: {
    hu: {
      eyebrow: "Szervizünk",
      title: "Teljes körű raktérhűtő szerviz Szegeden",
      lead: "Diagnosztika, javítás, karbantartás - a Carrier és a Daikin hivatalos szervizpartnereként, gyári alkatrészekkel és műszerezettséggel.",
      heroImage: "/images/0e90d9793302.jpg",
      features: [
        {
          icon: "wrench",
          title: "Diagnosztika",
          body: "Gyári diagnosztikai eszközök, hibakód-olvasás, hűtőköri nyomás- és hőmérsékletmérés.",
        },
        {
          icon: "snowflake",
          title: "Hűtőközeg-szerviz",
          body: "Hűtőközeg-töltés, tömörségvizsgálat és környezettudatos közegkezelés.",
        },
        {
          icon: "shield",
          title: "Garanciális javítás",
          body: "Carrier és Daikin garanciális javítások hivatalos partnerként - a garancia nálunk nem vész el.",
        },
        {
          icon: "clock",
          title: "Szezonális átvizsgálás",
          body: "Téli és nyári üzem előtti átvizsgálások, hogy a főszezonban ne érje meglepetés.",
        },
      ],
      sections: [
        {
          title: "Mit vizsgálunk az éves karbantartáskor?",
          body: [
            "Az éves felülvizsgálat a legolcsóbb biztosítás: a meghibásodások túlnyomó része előre jelezhető és megelőzhető.",
          ],
          bullets: [
            "Kompresszor és tengelykapcsoló állapot",
            "Hajtószíjak, csigák, rögzítések",
            "Kondenzátor és párologtató tisztítás",
            "Elektromos csatlakozások és vezérlés",
            "Hűtőközeg-mennyiség és rendszer-tömörség",
          ],
        },
      ],
      cta: {
        title: "Kérjen szervizidőpontot!",
        body: "Hívjon minket, vagy írja meg a hibajelenséget - visszahívjuk időponttal.",
      },
    },
  },

  /* ------------------------------ VAN ISOLATIONS ------------------------------ */
  vanIsolations: {
    en: {
      eyebrow: "Van isolations",
      title: "Insulation that holds the temperature - and its value",
      lead: "Professional van isolation and cooling unit installation with Carrier and Daikin systems, built for HACCP-compliant cold chain operation.",
      heroImage: "/images/79539d1d7438.jpg",
      features: [
        {
          icon: "layers",
          title: "Thermal-bridge-free build-up",
          body: "Vacuum-bonded panels in 50–80 mm thickness, engineered without thermal bridges - the temperature stays where it belongs.",
        },
        {
          icon: "snowflake",
          title: "Carrier & Daikin installation",
          body: "Factory-specified installation of direct-drive cooling units, sized by thermal calculation to your cargo bay.",
        },
        {
          icon: "check",
          title: "Food-grade interior",
          body: "Hygienic, washable GRP surfaces, sealed edges, LED lighting - ready for food safety audits.",
        },
        {
          icon: "shield",
          title: "Retrofit-friendly",
          body: "Insulation-only builds prepared for later cooling unit installation - grow your fleet in stages.",
        },
      ],
      sections: [
        {
          title: "What does a professional isolation include?",
          body: [
            "A van isolation is more than glued foam: it is a engineered system of insulation, vapour barriers, drainage and airflow that determines your operating costs for a decade.",
          ],
          bullets: [
            "50 mm walls / 80 mm option for freezer operation",
            "Reinforced, liquid-tight floor tray",
            "Condensation-managed ceiling with LED lighting",
            "Door heating frames for frozen operation",
          ],
        },
      ],
      cta: {
        title: "Ready to insulate your van?",
        body: "Send us your van type and target temperature - quote within 12 hours.",
      },
    },
  },

  /* ---------------------------- DECEASED TRANSPORT ---------------------------- */
  deceasedTransport: {
    en: {
      eyebrow: "Deceased transport",
      title: "Dignity, engineered",
      lead: "Temperature-controlled funeral transport vehicles with stainless steel interiors and multi-level configurations - respectful, hygienic, reliable.",
      heroImage: "/images/ae97125a0c4f.jpg",
      features: [
        {
          icon: "thermometer",
          title: "+18°C controlled cargo area",
          body: "Precise temperature control of the cargo compartment, engineered for regulatory compliance.",
        },
        {
          icon: "shield",
          title: "Stainless steel interior",
          body: "Fully washable, disinfectable stainless steel surfaces - hygiene without compromise.",
        },
        {
          icon: "layers",
          title: "Multi-level configurations",
          body: "Single or multi-level coffin platforms with secure fixation and smooth-glide loading systems.",
        },
        {
          icon: "heart",
          title: "Respectful execution",
          body: "Discreet exterior, dignified interior detailing - built with the sensitivity the task deserves.",
        },
      ],
      cta: {
        title: "Specialised requirements?",
        body: "We build deceased transport vehicles to individual specifications. Contact us for a consultation.",
      },
    },
  },

  /* ------------------------------- COOLED BODIES ------------------------------ */
  cooledBodies: {
    en: {
      eyebrow: "Refrigerated vehicle bodies",
      title: "Cooled box bodies, built to your specification",
      lead: "Custom cooled and refrigerated vehicle bodies for 3.5 t chassis - lightweight sandwich panels, Carrier or Daikin units, any dimension.",
      heroImage: "/images/82308068d05b.jpg",
      features: [
        {
          icon: "layers",
          title: "Lightweight sandwich panels",
          body: "High-density polyurethane cores with GRP skins - maximum insulation at minimum weight.",
        },
        {
          icon: "snowflake",
          title: "Carrier / Daikin integration",
          body: "Cooling units integrated at the design stage, not bolted on afterwards - clean lines, correct airflow.",
        },
        {
          icon: "thermometer",
          title: "Multi-temperature options",
          body: "Movable partition walls and dual-evaporator systems for split frozen/chilled operation.",
        },
        {
          icon: "check",
          title: "Custom dimensions",
          body: "Every box is manufactured to order - length, width, height and door layout exactly as your operation requires.",
        },
      ],
      cta: {
        title: "Have a chassis waiting?",
        body: "Send the chassis specification and your temperature requirements - detailed quote within 12 hours.",
      },
    },
  },
};

/* ------------------------------- Legal content ------------------------------- */

export interface LegalContent {
  title: string;
  intro: string;
  sections: { title: string; body: string[] }[];
}

export const legalPages: Record<"terms" | "privacy", LegalContent> = {
  terms: {
    title: "Általános Szerződési Feltételek",
    intro:
      "Jelen Általános Szerződési Feltételek (a továbbiakban: ÁSZF) az AUTOTHERM Kereskedelmi és Szolgáltató Kft. (6728 Szeged, Napos út 3.) által nyújtott gyártási, átalakítási és szerviz szolgáltatásokra vonatkoznak.",
    sections: [
      {
        title: "1. A szolgáltató adatai",
        body: [
          "Cégnév: AUTOTHERM Kereskedelmi és Szolgáltató Kft. Székhely és telephely: 6728 Szeged, Napos út 3. Telefon: +36 20 910 20 50. E-mail: autotherm@autotherm.hu.",
        ],
      },
      {
        title: "2. Megrendelés és szerződéskötés",
        body: [
          "Az árajánlat a kiállítástól számított 30 napig érvényes, kivéve, ha az ajánlat ettől eltérően rendelkezik. A szerződés a megrendelés írásbeli visszaigazolásával jön létre.",
          "A megrendelésben rögzített műszaki tartalom módosítása kizárólag írásban, mindkét fél jóváhagyásával lehetséges; a módosítás a vállalási határidőt és a vételárat érintheti.",
        ],
      },
      {
        title: "3. Árak és fizetési feltételek",
        body: [
          "Az árajánlatokban szereplő árak - eltérő megjelölés hiányában - nettó árak, és nem tartalmazzák az általános forgalmi adót.",
          "A gyártás megkezdésének feltétele az ajánlatban meghatározott előleg megfizetése. A fennmaradó vételár a jármű átadásakor esedékes.",
        ],
      },
      {
        title: "4. Vállalási határidő és átadás",
        body: [
          "A vállalási határidő az előleg beérkezésétől és valamennyi műszaki kérdés tisztázásától számítódik. Az átadás-átvétel jegyzőkönyvvel történik, amely tartalmazza a jármű műszaki paramétereit és a hűtőberendezés teljesítménymérésének eredményét.",
        ],
      },
      {
        title: "5. Jótállás és szavatosság",
        body: [
          "Az elvégzett munkára a jogszabályban előírt jótállást vállaljuk. A beépített hűtőberendezésekre a gyártó (Carrier, Daikin) gyári garanciális feltételei érvényesek.",
          "A jótállás nem terjed ki a rendeltetésellenes használatból, karbantartás elmulasztásából vagy külső sérülésből eredő hibákra.",
        ],
      },
      {
        title: "6. Egyéb rendelkezések",
        body: [
          "A jelen ÁSZF-ben nem szabályozott kérdésekben a Polgári Törvénykönyv és a vonatkozó magyar jogszabályok az irányadók. A felek a vitás kérdéseket elsősorban egyeztetés útján rendezik.",
        ],
      },
    ],
  },
  privacy: {
    title: "Adatkezelési tájékoztató",
    intro:
      "Az AUTOTHERM Kereskedelmi és Szolgáltató Kft. (6728 Szeged, Napos út 3.) mint adatkezelő, az Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR) alapján az alábbiak szerint tájékoztatja a weboldal látogatóit személyes adataik kezeléséről.",
    sections: [
      {
        title: "1. Az adatkezelő",
        body: [
          "Adatkezelő: AUTOTHERM Kereskedelmi és Szolgáltató Kft., 6728 Szeged, Napos út 3. E-mail: autotherm@autotherm.hu. Telefon: +36 20 910 20 50.",
        ],
      },
      {
        title: "2. A kezelt adatok köre és célja",
        body: [
          "Kapcsolatfelvételi és árajánlatkérő űrlapok: név, e-mail cím, telefonszám és az üzenet tartalma. Az adatkezelés célja a megkeresés megválaszolása és az árajánlat elkészítése.",
          "Az adatkezelés jogalapja az érintett hozzájárulása (GDPR 6. cikk (1) a) pont), illetve a szerződés előkészítése (GDPR 6. cikk (1) b) pont).",
        ],
      },
      {
        title: "3. Az adatkezelés időtartama",
        body: [
          "A kapcsolatfelvételi adatokat a megkeresés lezárását követő 1 évig, szerződéskötés esetén a számviteli jogszabályokban előírt megőrzési ideig kezeljük.",
        ],
      },
      {
        title: "4. Sütik (cookie-k)",
        body: [
          "A weboldal kizárólag a működéshez szükséges, illetve a felhasználói élményt javító sütiket használ. A sütik elfogadásáról vagy elutasításáról a látogató a süti-sávon dönthet.",
        ],
      },
      {
        title: "5. Az érintettek jogai",
        body: [
          "Az érintett kérelmezheti a rá vonatkozó személyes adatokhoz való hozzáférést, azok helyesbítését, törlését vagy kezelésének korlátozását, valamint tiltakozhat az adatkezelés ellen.",
          "Jogorvoslatért a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, 1055 Budapest, Falk Miksa utca 9-11.) fordulhat.",
        ],
      },
      {
        title: "6. Adatbiztonság",
        body: [
          "Az adatokat titkosított kapcsolaton keresztül továbbítjuk és korlátozott hozzáférésű rendszerekben tároljuk. Harmadik félnek adatot kizárólag jogszabályi kötelezettség alapján adunk át.",
        ],
      },
    ],
  },
};

/* ------------------------------ Gallery manifest ------------------------------ */

export interface GalleryImage {
  src: string;
  category: "vans" | "bodies" | "special";
}

export const galleryImages: GalleryImage[] = [
  { src: "/images/05b85e04c8d3.jpg", category: "vans" },
  { src: "/images/0e90d9793302.jpg", category: "vans" },
  { src: "/images/15f4103a8265.jpg", category: "vans" },
  { src: "/images/2948dab7dd9a.jpg", category: "vans" },
  { src: "/images/300aebed8e8e.jpg", category: "vans" },
  { src: "/images/310373572c3b.jpg", category: "vans" },
  { src: "/images/32b4cd177558.jpg", category: "vans" },
  { src: "/images/3cc963ec4181.jpg", category: "vans" },
  { src: "/images/45196215f76f.jpg", category: "bodies" },
  { src: "/images/4c7a44122714.jpg", category: "bodies" },
  { src: "/images/688500d4a01a.jpg", category: "bodies" },
  { src: "/images/6be9f7162b3b.jpg", category: "bodies" },
  { src: "/images/785d3105c7c6.jpg", category: "bodies" },
  { src: "/images/79539d1d7438.jpg", category: "vans" },
  { src: "/images/82308068d05b.jpg", category: "bodies" },
  { src: "/images/8bd1648f42cf.jpg", category: "bodies" },
  { src: "/images/a404687637b3.jpg", category: "vans" },
  { src: "/images/a51e2c833b3a.jpg", category: "bodies" },
  { src: "/images/a68af7b4ba26.jpg", category: "special" },
  { src: "/images/ae97125a0c4f.jpg", category: "special" },
  { src: "/images/b05d04ca1183.jpg", category: "vans" },
  { src: "/images/b2c54816a378.jpg", category: "bodies" },
  { src: "/images/b2e2e8348e1b.jpg", category: "special" },
  { src: "/images/be3495baa194.jpg", category: "special" },
  { src: "/images/be8bb6a35e77.jpg", category: "bodies" },
  { src: "/images/d029c0586d66.jpg", category: "vans" },
  { src: "/images/db347b9ebd92.jpg", category: "vans" },
  { src: "/images/e4566315cd28.jpg", category: "bodies" },
  { src: "/images/e7f13b6c4bc5.jpg", category: "special" },
  { src: "/images/fca243146ad0.jpg", category: "vans" },
];
