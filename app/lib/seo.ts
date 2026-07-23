import type { Metadata } from "next";
import { BCP47, LANGS, LOCALES, type Lang } from "./constants";
import { alternatesFor, pathFor, type PageKey } from "./routes";

export const siteUrl = "https://www.autotherm.hu";

/* -------------------------------------------------------------------------- */
/*  Keyword corpus - the complete, battle-tested keyword sets per language.   */
/* -------------------------------------------------------------------------- */

export const baseKeywords: Record<Lang, string[]> = {
  hu: [
    "hűtőautó", "hűtős furgon", "fagyasztós autó", "raktérhűtő", "raktérszigetelés",
    "járműfelépítmény", "alvázas felépítmény", "hűtőberendezés", "Carrier szerviz",
    "Carrier hűtő", "Daikin hűtő", "hűtőgép szerviz", "hűtött logisztika",
    "elhunytszállító", "halottszállító", "hússzállító hűtőautó", "gyógyszerszállító",
    "fagyasztóautó", "hűtőautó gyártás", "hűtőautó szerviz", "hűtő felépítmény",
    "hőszigetelt doboz", "3.5T hűtőautó", "furgon átalakítás",
    "autotherm", "autotherm.hu", "hűtő autó", "hűtő kocsi", "fagyasztó kocsi",
    "hűtő jármű", "raktér hűtés", "raktér szigetelés", "hűtődoboz",
    "platós ponyvás", "alumínium doboz", "rozsdamentes burkolat", "üvegszálas burkolat",
    "hűtőberendezés beépítés", "raktérhűtő szerviz", "Carrier raktérhűtő",
    "hűtőegység javítás", "hűtőgép karbantartás", "hűtőkamion",
    "élelmiszer szállítás", "virág szállítás", "gyümölcs szállítás",
    "zöldség szállítás", "fagylalt szállítás", "gyógyszer szállítás",
    "hőmérséklet érzékeny szállítás", "hideg lánc", "cold chain",
    "hűtőautó Magyarország", "Szeged hűtőautó", "járműfelépítmény gyártás",
    "furgon szigetelés", "utólagos raktérszigetelés", "hűtő kapacitás",
    "hűtőautó eladó", "használt hűtőautó", "hűtős doboz",
    "speciális járműfelépítmény", "Felépítmény gyártás", "jármű átalakítás",
    "hűtőtechnika", "hűtőipar", "hűtött áru szállítás", "hűtőrendszer",
    "hütőautó", "hűtő autó gyártás", "hűtő furgon", "hűtő teherautó",
    "hűtőautó javítás", "hűtős furgon javítás", "raktérhűtő javítás",
    "élelmiszer autó", "street food jármű", "egyedi élelmiszer autó",
    "hőszigetelt élelmiszer autó", "rendezvény autó", "kültéri árusító autó",
    "koporsószállító", "temetkezési autó", "temetői jármű",
    "negatív hőmérséklet", "pozitív hőmérséklet", "fagyasztó hőmérséklet",
    "hűtött hőmérséklet", "több hőmérsékletű szállítás",
    "hőmérsékletszabályozás", "hőmérséklet szabályozó",
    "elektromos jármű hűtés", "elektromos autó hűtőrendszer",
    "EV hűtési megoldás", "elektromos furgon hűtés",
    "HACCP szabvány", "élelmiszerbiztonsági megfelelőség",
    "ár-érték arány", "költséghatékony hűtőautó",
    "jó ár-érték arányú hűtős furgon",
    "fagyasztó -18°C", "fagyasztó -20°C", "hűtött 0°C", "hűtött +4°C",
    "több rekeszes hűtőautó", "két hőmérsékletű szállítás", "osztott raktér",
    "magas tetős furgon", "hosszú tengelytáv", "kétkerék meghajtás",
    "Thermo King szerviz", "Zanotti hűtő",
    "Fiat Ducato hűtős átalakítás", "Mercedes Sprinter hűtős átalakítás",
    "Ford Transit hűtős átalakítás", "Renault Master hűtős átalakítás",
    "VW Crafter hűtős átalakítás", "Iveco Daily hűtős átalakítás",
    "tej szállítás", "üdítő szállítás", "sör szállítás", "bor szállítás",
    "csokoládé szállítás", "tenger gyümölcsei szállítás", "tejszínhab szállítás",
    "biztosítói kárfelvétel", "garanciális javítás", "karbantartási szerződés",
    "éves felülvizsgálat", "mobil szerviz", "útközbeni meghibásodás elhárítás",
    "távfelügyelet hőmérséklet", "hőmérséklet adatgyűjtés", "termográf",
    "ATP minősítés", "CE megfelelőség", "ISO szabvány",
    "használt hűtős furgon eladó", "használt hűtőautó eladó",
    "hűtős furgon bérlés", "hűtőautó bérlés",
    "egyedi méretű felépítmény", "testreszabott hűtőautó", "egyedi gyártás",
    "ausztria hűtőautó", "bécs hűtős furgon", "bajorország hűtőautó",
    "hűtőautó szerviz Magyarország", "flotta karbantartás",
    "alacsony fenntartási költség", "üzemanyag takarékos hűtőautó",
    "könnyű alumínium felépítmény", "rozsdamentes padló",
  ],
  en: [
    "refrigerated van", "cooled vehicle", "van isolation", "refrigerated vehicle body",
    "refrigerated body", "cooling unit installation", "Carrier service",
    "Carrier Transicold", "Daikin cooling", "vehicle body manufacturer",
    "commercial vehicle bodies", "box body", "aluminium box body",
    "insulated box body", "flatbed tarpaulin", "special vehicle bodies",
    "deceased transport vehicle", "cold logistics", "temperature controlled transport",
    "cold chain", "pharmaceutical transport", "meat transport refrigerated",
    "ice cream transport", "fruit vegetable transport", "flower transport",
    "3.5T refrigerated van", "refrigerated conversion",
    "stainless steel interior", "GRP interior", "chassis body",
    "refrigerated truck body", "cooling system service", "reefer van",
    "insulated van", "temperature controlled vehicle", "cold storage vehicle",
    "frozen food transport", "refrigerated truck", "cooler truck",
    "refrigerated box", "insulated box", "custom vehicle bodies",
    "van refrigeration", "autotherm", "refrigerated vehicle manufacturer",
    "Hungary refrigerated vehicles", "European cold logistics",
    "cooling unit repair", "refrigerated fleet", "temperature monitoring",
    "HACCP transport", "GDP transport", "cold distribution",
    "refrigerated cargo", "frozen transport", "chilled transport",
    "refrigerated vehicle repair", "reefer repair", "cooling unit service",
    "custom food truck", "food truck body", "custom food service vehicle",
    "insulated food truck", "mobile food truck",
    "hearse vehicle", "funeral transport",
    "coffin transport vehicle", "cemetery vehicle",
    "negative temperature transport", "positive temperature transport",
    "multi-temperature transport",
    "thermacontrol", "temperature control system",
    "electric vehicle cooling", "EV refrigerated van",
    "electric van cooling conversion", "universal EV cooling",
    "HACCP compliance", "food safety certified vehicle",
    "FRC compliance",
    "value for money refrigerated van",
    "cost effective refrigerated vehicle",
    "good price performance ratio",
    "frozen -18°C transport", "frozen -20°C transport",
    "chilled 0°C transport", "chilled +4°C transport",
    "multi compartment refrigerated van", "dual temperature van",
    "split temperature refrigerated body",
    "high roof van conversion", "long wheelbase", "single wheel van",
    "Thermo King service", "Zanotti cooling unit",
    "Fiat Ducato refrigerated conversion",
    "Mercedes Sprinter refrigerated conversion",
    "Ford Transit refrigerated conversion",
    "Renault Master refrigerated conversion",
    "VW Crafter refrigerated conversion",
    "Iveco Daily refrigerated conversion",
    "dairy transport refrigerated", "beverage transport cooled",
    "beer transport refrigerated", "wine transport temperature controlled",
    "chocolate transport cooled", "seafood transport refrigerated",
    "bakery delivery vehicle", "catering delivery vehicle",
    "insurance claim repair", "warranty service refrigerated",
    "maintenance contract", "annual inspection",
    "mobile repair service", "roadside breakdown refrigerated",
    "remote temperature monitoring", "temperature data logging",
    "thermograph refrigerated",
    "ATP certification", "CE marking", "ISO 9001",
    "used refrigerated van for sale", "second hand reefer van",
    "refrigerated van rental", "reefer rental",
    "custom size vehicle body", "bespoke refrigerated van",
    "tailor made refrigerated vehicle",
    "Austria refrigerated vehicles", "Vienna cooled van",
    "Bavaria refrigerated transport",
    "fleet maintenance refrigerated",
    "low maintenance refrigerated vehicle",
    "fuel efficient reefer",
    "lightweight box body", "stainless steel floor",
  ],
  de: [
    "Kühlfahrzeug", "Kühltransporter", "Kühlkoffer", "Kastenwagenisolierung",
    "Kühlaggregat", "Carrier Service", "Carrier Kühlaggregat", "Daikin Kühlung",
    "Nutzfahrzeugaufbauten", "Fahrgestellaufbauten", "Kofferaufbau",
    "Aluminiumkoffer", "Kühlkoffer Aufbau", "Isolierbox", "Pritschenaufbau Plane",
    "Spezialaufbauten", "Bestattungswagen", "Kühllogistik",
    "temperaturgeführte Transporte", "Kühlkette", "Pharmatransport",
    "Fleischtransport Kühlfahrzeug", "Eistransport", "Obst Gemüse Transport",
    "Blumen Transport", "3.5T Kühlfahrzeug", "Kühlumbau",
    "Edelstahl Innenverkleidung", "GFK Innenverkleidung",
    "Kühlaggregat Einbau", "Kühlfahrzeug Hersteller", "Kühlservice",
    "Kühlfahrzeug Reparatur", "Kühlfahrzeug Wartung", "Kühltransporter Umbau",
    "Nutzfahrzeugumbau", "Fahrzeugisolierung", "Kühlmaschine",
    "Kühlcontainer", "Tiefkühltransport", "Kühllager",
    "autotherm", "Kühlfahrzeug Ungarn", "gekühlter Transport",
    "Kühlaggregat Service", "Isolierfahrzeug", "Kastenwagen Kühlung",
    "Kühlfahrzeug Deutschland", "Kühlfahrzeug Europa",
    "Kühltransporter Reparatur",
    "Food Truck", "Speiseiswagen", "Imbisswagen",
    "gewerbliche Küche Fahrzeug", "mobile Küche",
    "Leichenwagen", "Friedhofsfahrzeug",
    "Sargtransport Fahrzeug",
    "Minusgrad Transport", "Plusgrad Transport",
    "Kühltransport", "Mehrtemperaturtransport",
    "Temperaturregelung", "Thermomanagement",
    "Elektrofahrzeug Kühlung", "E-Fahrzeug Kühlaggregat",
    "elektrischer Kühltransporter Umbau",
    "HACCP Konformität", "Lebensmittelsicherheit Fahrzeug",
    "FRC Konformität",
    "Preis-Leistungs-Verhältnis Kühlfahrzeug",
    "kosteneffizienter Kühltransporter",
    "gutes Preis-Leistungs-Verhältnis",
    "Gefrier -18°C Transport", "Gefrier -20°C Transport",
    "Kühl 0°C Transport", "Kühl +4°C Transport",
    "Mehrkammer Kühlfahrzeug", "Zweitemperatur Kühltransporter",
    "getrennter Kühlraum",
    "Hochdach Kastenwagen Umbau", "langer Radstand",
    "Thermo King Service", "Zanotti Kühlaggregat",
    "Fiat Ducato Kühlumbau", "Mercedes Sprinter Kühlumbau",
    "Ford Transit Kühlumbau", "Renault Master Kühlumbau",
    "VW Crafter Kühlumbau", "Iveco Daily Kühlumbau",
    "Milchtransport Kühlfahrzeug", "Getränketransport gekühlt",
    "Biertransport Kühlung", "Weintransport klimatisiert",
    "Schokoladentransport gekühlt", "Fischtransport Kühlung",
    "Bäckereizustellung Fahrzeug", "Catering Lieferfahrzeug",
    "Versicherungsreparatur", "Garantieservice Kühlung",
    "Wartungsvertrag", "Jahresinspektion Kühlfahrzeug",
    "mobiler Reparaturservice", "Pannenhilfe Kühltransporter",
    "Fernüberwachung Temperatur", "Temperaturaufzeichnung",
    "Thermograph Kühlung",
    "ATP Zertifizierung", "CE Kennzeichnung", "ISO 9001",
    "gebrauchter Kühltransporter kaufen",
    "Kühltransporter mieten",
    "Sondergröße Kofferaufbau", "maßgeschneiderter Kühltransporter",
    "Österreich Kühlfahrzeug", "Wien Kühltransporter",
    "Bayern Kühlfahrzeug",
    "Flottenwartung Kühlfahrzeuge",
    "niedrige Betriebskosten Kühlfahrzeug",
    "kraftstoffeffizienter Kühltransporter",
    "leichter Aluminiumkoffer", "Edelstahlboden",
  ],
  ro: [
    "vehicul frigorific", "furgon frigorific", "carosare frigorifice",
    "izolare frigorifică", "unitate frigorifică", "Carrier service",
    "Carrier frigorific", "Daikin frigorific", "suprastructuri comerciale",
    "suprastructuri vehicule", "cutie frigorifică", "cutie aluminiu",
    "platformă prelată", "suprastructuri speciale", "vehicul funerar",
    "logistică frigorifică", "transport temperatură controlată",
    "lanț rece", "transport farmaceutic", "transport carne",
    "transport înghețată", "transport fructe legume", "transport flori",
    "3.5T vehicul frigorific", "conversie frigorifică",
    "oțel inoxidabil interior", "fibră sticlă interior",
    "instalare unitate frigorifică", "producător carosări frigorifice",
    "service frigorific", "reparații frigorifice", "întreținere frigorifică",
    "autotherm", "carosări frigorifice Ungaria", "transport congelat",
    "transport refrigerat", "vehicul izoterm", "furgon izoterm",
    "carosabil frigorific", "caroserii frigorifice", "construcții carosări",
    "reparații vehicule frigorifice", "reparații furgon frigorific",
    "food truck personalizat", "vehicul pentru mâncare stradală",
    "autoutilitară alimentară", "food truck izolat",
    "transport sicrie", "dric",
    "transport temperatură negativă", "transport temperatură pozitivă",
    "transport multi-temperatură",
    "termocontrol", "control temperatură", "sistem reglare temperatură",
    "răcire vehicul electric", "vehicul electric frigorific",
    "soluție răcire EV", "furgon electric frigorific",
    "conformitate HACCP", "siguranță alimentară",
    "conformitate FRC",
    "raport calitate preț carosări frigorifice",
    "soluție rentabilă vehicul frigorific",
    "preț bun performanță",
    "congelat -18°C transport", "congelat -20°C transport",
    "refrigerat 0°C transport", "refrigerat +4°C transport",
    "multi-compartiment vehicul frigorific", "dublă temperatură",
    "compartimente separate temperatură",
    "plafon înalt furgon", "amanet lung",
    "Thermo King service", "Zanotti frigorific",
    "Fiat Ducato carosare frigorifică",
    "Mercedes Sprinter carosare frigorifică",
    "Ford Transit carosare frigorifică",
    "Renault Master carosare frigorifică",
    "VW Crafter carosare frigorifică",
    "Iveco Daily carosare frigorifică",
    "transport lactate", "transport băuturi",
    "transport bere", "transport vin",
    "transport ciocolată", "transport fructe mare",
    "livrare panificație", "livrare catering",
    "reparație daună asigurare", "service garanție",
    "contract întreținere", "inspecție anuală",
    "service mobil", "deplasare avarie",
    "monitorizare temperatură la distanță",
    "înregistrare temperatură", "termograf",
    "certificare ATP", "marcaj CE", "ISO 9001",
    "furgon frigorific second hand",
    "închiriere furgon frigorific",
    "dimensiuni personalizate suprastructură",
    "carosare frigorifică la comandă",
    "Austria vehicule frigorifice",
    "Viena furgon frigorific",
    "întreținere flotă frigorifică",
    "costuri reduse întreținere",
    "eficient consum combustibil",
    "suprastructură ușoară aluminiu", "pardoseală oțel inoxidabil",
  ],
};

/* -------------------------------------------------------------------------- */
/*  Per-page metadata, keyed by PageKey and language.                         */
/* -------------------------------------------------------------------------- */

type SeoEntry = {
  title: string;
  description: string;
  extraKeywords?: string[];
};

const DEFAULTS: Record<Lang, SeoEntry> = {
  hu: {
    title: "Autotherm Kft. – Hűtőautó gyártás, hűtős furgon átalakítás és Carrier szerviz",
    description:
      "Autotherm Kft. – 1992 óta hűtőautók, hűtős furgonok, elhunytszállító járművek gyártása és Carrier raktérhűtő szerviz. Egyedi járműfelépítmények 3,5 tonnáig.",
  },
  en: {
    title: "Autotherm Ltd. – Refrigerated Vehicle Body Manufacturer & Carrier Service",
    description:
      "Autotherm Ltd. – Since 1992, manufacturing refrigerated vans, deceased transport vehicles, van isolations and commercial vehicle bodies. Carrier Transicold sales and service.",
  },
  de: {
    title: "Autotherm GmbH – Kühlfahrzeug Hersteller & Carrier Service",
    description:
      "Autotherm GmbH – Seit 1992 Herstellung von Kühlfahrzeugen, Bestattungswagen, Kastenwagenisolierung und Nutzfahrzeugaufbauten. Carrier Transicold Verkauf und Service.",
  },
  ro: {
    title: "Autotherm SRL – Producător de carosări frigorifice și service Carrier",
    description:
      "Autotherm SRL – Din 1992 fabricăm carosări frigorifice, vehicule funerare, izolări furgonete și suprastructuri. Vânzare și service Carrier Transicold.",
  },
};

const PAGE_SEO: Partial<Record<PageKey, Partial<Record<Lang, SeoEntry>>>> = {
  home: {
    hu: {
      title: "Autotherm Kft. – Hűtőautó gyártás és hűtős furgon átalakítás 1992 óta",
      description:
        "Autotherm Kft. – Hűtőautók, hűtős furgonok, elhunytszállító járművek, raktérszigetelés és Carrier raktérhűtő szerviz. Egyedi járműfelépítmények 3,5 tonnáig.",
      extraKeywords: [
        "hűtőautó gyártás Budapest", "hűtős furgon Budapest", "hűtőautó árajánlat",
        "hűtős furgon árak", "hűtőautó gyártás Magyarország", "hűtőautó átalakítás ára",
        "furgon szigetelés árajánlat", "hűtőautó készítés", "hűtős furgon építés",
        "hűtött áru szállítás jármű", "hideg lánc járművek", "hűtőautó hőszigetelés",
        "fagyasztó kocsi építés", "3.5T hűtős autó", "kisteher hűtős autó",
        "raktérhűtő beszerelés",
      ],
    },
    en: {
      title: "Autotherm Ltd. – Refrigerated Van & Cooled Vehicle Body Manufacturer Since 1992",
      description:
        "Autotherm Ltd. – Manufacturing refrigerated vans, cooled vehicle bodies, van isolations, and deceased transport vehicles since 1992. Carrier Transicold service.",
      extraKeywords: [
        "refrigerated van manufacturer", "cooled vehicle body Hungary",
        "refrigerated truck builder", "refrigerated van conversion Hungary",
        "cooling unit installation Europe", "custom refrigerated vehicle builder",
        "temperature controlled vehicle manufacturer", "cold chain vehicle supplier",
        "van isolation specialist", "commercial refrigerated vehicles Hungary",
        "reefer van manufacturer", "insulated box body builder",
        "3.5T refrigerated truck body", "European refrigerated vehicle company",
      ],
    },
    de: {
      title: "Autotherm GmbH – Kühlfahrzeug Hersteller & Kühltransporter Umbau seit 1992",
      description:
        "Autotherm GmbH – Kühlfahrzeuge, Kühltransporter und Nutzfahrzeugaufbauten seit 1992. Offizieller Carrier Transicold Service. Angebot anfordern!",
      extraKeywords: [
        "Kühlfahrzeug Hersteller Ungarn", "Kühltransporter Umbau", "Kühlfahrzeug Angebot",
        "Kühlfahrzeugbau Ungarn", "gekühlter Transporter Hersteller",
        "Kastenwagen Kühlung Einbau", "Kühlfahrzeug Sonderanfertigung",
        "Nutzfahrzeugaufbauten 3.5T", "Kühlkoffer Hersteller Europa",
        "Bestattungswagen Hersteller Ungarn", "Carrier Kühlaggregat Vertrieb",
      ],
    },
    ro: {
      title: "Autotherm SRL – Producător de carosări frigorifice și furgonete frigorifice",
      description:
        "Autotherm SRL – Carosări frigorifice, furgonete frigorifice, vehicule funerare și suprastructuri din 1992. Service Carrier Transicold. Solicitați ofertă!",
      extraKeywords: [
        "carosări frigorifice Ungaria", "furgon frigorific producător",
        "carosabil frigorific", "producător carosări frigorifice Europa",
        "izolare furgon frigorific", "instalare unitate frigorifică",
        "vehicul transport temperatură controlată", "furgon congelat personalizat",
        "suprastructură frigorifică 3.5T", "vehicul transport decedați",
        "Carrier Transicold partener",
      ],
    },
  },
  about: {
    hu: {
      title: "Kik vagyunk? – Autotherm Kft. története | Hűtőautó gyártás 1992 óta",
      description:
        "Ismerje meg az Autotherm Kft. történetét! 1992 óta foglalkozunk hűtőautók gyártásával és Carrier raktérhűtő szervizzel Szegeden. 33 munkatárs, 3000+ elégedett ügyfél.",
      extraKeywords: [
        "Autotherm története", "hűtőautó gyártó cég", "Carrier képviselet Magyarország",
        "Autotherm Kft. Szeged", "hűtőautó gyártás története", "Csurgó László hűtőautó",
        "hűtőautó gyártó Magyarországon", "magyar hűtőautó gyártó", "hűtőipari cég Szeged",
        "raktérhűtő szerviz története", "hűtőgép szerviz múltja",
        "3000 elégedett ügyfél hűtőautó", "33 éve a hűtőiparban",
      ],
    },
    en: {
      title: "Who We Are – Autotherm Ltd. History | Refrigerated Vehicle Manufacturer Since 1992",
      description:
        "Learn about Autotherm Ltd. – founded in 1992 by László Csurgó. Carrier Transicold representation in Hungary. 3000+ satisfied clients.",
      extraKeywords: [
        "Autotherm history", "refrigerated vehicle company", "Carrier representation Hungary",
        "László Csurgó founder", "Peter Knerer founder",
        "Hungarian refrigerated vehicle manufacturer",
        "refrigerated vehicle company founded 1992", "Szeged vehicle body builder",
        "Carrier Transicold partner Hungary", "3000 customers refrigerated vehicles",
        "33 years refrigerated experience", "Thermo King history Autotherm",
      ],
    },
    de: {
      title: "Wer wir sind – Autotherm GmbH Geschichte | Kühlfahrzeug Hersteller",
      description:
        "Erfahren Sie mehr über Autotherm GmbH – gegründet 1992. Offizieller Carrier-Vertrieb in Ungarn. 3000+ zufriedene Kunden.",
      extraKeywords: [
        "Autotherm Geschichte", "Kühlfahrzeug Unternehmen", "Carrier Vertrieb Ungarn",
        "László Csurgó Gründer", "Peter Knerer Gründer", "Kühlfahrzeug Hersteller seit 1992",
        "Firmengeschichte Kühlfahrzeugbau", "Carrier Partner Ungarn Geschichte",
        "Thermo King Historie Autotherm", "3000 Kunden Kühlfahrzeuge",
        "Kühlservice Südugarn",
      ],
    },
    ro: {
      title: "Cine suntem noi? – Autotherm SRL | Producător de carosări frigorifice",
      description:
        "Aflați povestea Autotherm SRL – fondată în 1992. Reprezentanță Carrier în Ungaria. Peste 3000 de clienți mulțumiți.",
      extraKeywords: [
        "Autotherm istorie", "carosări frigorifice companie", "reprezentanță Carrier",
        "László Csurgó fondator", "Peter Knerer fondator",
        "companie carosări frigorifice 1992", "istorie Autotherm SRL",
        "partener Carrier Ungaria istorie", "3000 clienți carosări frigorifice",
        "experiență 32 ani carosări", "Thermo King service istorie",
      ],
    },
  },
  products: {
    hu: {
      title: "Termékeink – Hűtőautók, hűtős furgonok és járműfelépítmények | Autotherm",
      description:
        "Hűtős furgon átalakítás, alvázas járműfelépítmények, hússzállító és gyógyszerszállító hűtőautók, elhunytszállító járművek. Szigetelt felépítmények, egyedi gyártás.",
      extraKeywords: [
        "hűtőautó típusok", "hűtős furgon árak", "járműfelépítmény típusok",
        "3.5T hűtőautó katalógus", "Fiat Ducato hűtős átalakítás ára",
        "Mercedes Sprinter hűtős átalakítás", "Ford Transit hűtős átalakítás",
        "Renault Master hűtős furgon", "VW Crafter hűtős átalakítás",
        "Iveco Daily hűtős felépítmény", "alvázas hűtős doboz árak",
        "platós ponyvás felépítmény árak", "alumínium doboz felépítmény ára",
        "hűtőautó eladó", "hűtős furgon eladó", "fagyasztós autó árak",
        "teherszállító hűtős autó",
      ],
    },
    en: {
      title: "Our Products – Refrigerated Vans, Vehicle Bodies & Conversions | Autotherm",
      description:
        "Explore our range of refrigerated vans, chassis commercial bodies, deceased transport vehicles and van isolations. Custom-built insulated vehicle bodies.",
      extraKeywords: [
        "refrigerated van types", "commercial vehicle bodies", "cooled conversion",
        "Fiat Ducato refrigerated van", "Mercedes Sprinter chilled van",
        "Ford Transit reefer conversion", "Renault Master refrigerated",
        "VW Crafter cooled van", "Iveco Daily refrigerated body",
        "chassis body for sale", "aluminium box body prices",
        "flatbed tarpaulin body", "custom box body dimensions",
        "3.5T refrigerated box price",
      ],
    },
    de: {
      title: "Kühlfahrzeuge & Kühltransporter – Modelle und Konfiguration | Autotherm",
      description:
        "Kühlfahrzeuge, Kühltransporter und Nutzfahrzeugaufbauten bis 3,5T. Carrier/Daikin Kühlaggregate. Maßgeschneiderte Lösungen.",
      extraKeywords: [
        "Kühlfahrzeug Modelle", "Kühltransporter Konfiguration", "Kühlkoffer Aufbau",
        "Fiat Ducato Kühltransporter", "Mercedes Sprinter Kühlfahrzeug",
        "Ford Transit Kühlumbau", "Renault Master Kühlkoffer",
        "VW Crafter Kühltransporter", "Iveco Daily Kühlaufbau",
        "Fahrgestellaufbau Kühlkoffer", "Kühlkoffer Neubau",
        "Kühltransporter Sonderausstattung", "Isolierbox Aufbau 3.5T",
        "Kühlaggregat Auswahl", "Kühlfahrzeug Zubehör",
      ],
    },
    ro: {
      title: "Carosări și furgonete frigorifice – modele și opțiuni | Autotherm",
      description:
        "Carosări frigorifice, furgonete frigorifice și suprastructuri până la 3,5T. Unități frigorifice Carrier/Daikin. Soluții personalizate.",
      extraKeywords: [
        "carosări frigorifice modele", "furgon frigorific configurare",
        "suprastructuri frigorifice", "Fiat Ducato carosare frigorifică",
        "Mercedes Sprinter furgon frigorific", "Ford Transit izolare frigorifică",
        "Renault Master carosare frigorifică", "VW Crafter furgon frigorific",
        "Iveco Daily suprastructură frigorifică", "cutie frigorifică 3.5T",
        "platformă prelată frigorifică", "carosare frigorifică prețuri",
      ],
    },
  },
  service: {
    hu: {
      title: "Carrier és Daikin hűtőberendezés szerviz | Autotherm Kft.",
      description:
        "Carrier és Daikin raktérhűtő berendezések szervizelése, javítása, karbantartása. Eredeti alkatrészek raktárról. Hibakód olvasás, diagnosztika. Hívjon minket!",
      extraKeywords: [
        "Carrier szerviz Szeged", "Daikin szerviz", "raktérhűtő javítás",
        "hűtőgép karbantartás", "raktérhűtő hibakód", "Carrier hűtő nem hűt",
        "raktérhűtő nem indul", "hűtőberendezés javítás ára",
        "Carrier garanciális javítás", "raktérhűtő alkatrész rendelés",
        "Carrier Xarios javítás", "Carrier Supra javítás", "Daikin hűtőegység javítás",
        "hűtőgép diagnosztika", "raktérhűtő éves karbantartás",
        "sürgős hűtőgép szerviz", "raktérhűtő meghibásodás elhárítás",
        "hűtőberendezés téli üzemeltetés",
      ],
    },
  },
  carrierService: {
    hu: {
      title: "Carrier raktérhűtő szerviz – hűtőberendezés eladás, beépítés | Autotherm",
      description:
        "Carrier raktérhűtők értékesítése, beépítése és szervizelése. Xarios, Supra modellek. Hivatalos Carrier képviselet Magyarországon.",
      extraKeywords: [
        "Carrier raktérhűtő", "Carrier Xarios", "Carrier Supra", "raktérhűtő beépítés",
        "Carrier raktérhűtő árak", "Carrier Xarios 300 ára", "Carrier Supra 750 ára",
        "raktérhűtő vásárlás", "Carrier hivatalos képviselet",
        "raktérhűtő beszerelés ára", "új raktérhűtő beépítés",
        "Carrier raktérhűtő alkatrész", "raktérhűtő csere", "régi raktérhűtő eladó",
        "Carrier hűtőberendezés kiválasztás", "raktérhűtő kapacitás számítás",
      ],
    },
  },
  whyUs: {
    hu: {
      title: "Miért az Autotherm? – Hűtőautó gyártás | Előnyeink",
      description:
        "Miért válassza az Autotherm Kft.-t? Több mint 30 év tapasztalat, Carrier képviselet, gyors árajánlat, egyedi gyártás. Ismerje meg előnyeinket!",
      extraKeywords: [
        "miért autotherm", "autotherm előnyök", "hűtőautó gyártás tapasztalat",
        "melyik hűtőautó gyártót válasszam", "hűtőautó gyártó összehasonlítás",
        "jó hűtőautó gyártó", "megbízható hűtőautó gyártó", "hűtőautó garancia",
        "hűtőautó minőségbiztosítás", "hűtőautó referenciák",
        "hűtőautó vevői vélemények", "egyedi hűtőautó gyártás előnyei",
        "testreszabott hűtős furgon", "gyors szállítás hűtőautó",
        "pontos határidő hűtőautó gyártás", "hűtőautó vásárlás tanácsok",
      ],
    },
    en: {
      title: "Why Choose Autotherm? – 30+ Years of Refrigerated Vehicle Expertise",
      description:
        "30+ years of experience, official Carrier partnership, fast quotation, custom manufacturing. Discover our advantages.",
      extraKeywords: [
        "why choose Autotherm", "refrigerated vehicle advantages",
        "best refrigerated van company", "reliable refrigerated vehicle builder",
        "refrigerated van warranty", "custom vehicle body specialist",
        "fast delivery refrigerated van", "experienced refrigerated manufacturer",
        "Carrier authorized partner benefits", "quality refrigerated conversion",
        "Hungary refrigerated vehicle expert", "European refrigerated body builder",
      ],
    },
    de: {
      title: "Warum gerade wir? – 30+ Jahre Kühlfahrzeug Expertise | Autotherm",
      description:
        "Über 30 Jahre Erfahrung, offizielle Carrier-Partnerschaft, schnelle Angebote, maßgeschneiderte Fertigung. Unsere Vorteile.",
      extraKeywords: [
        "warum Autotherm", "Kühlfahrzeug Vorteile", "zuverlässiger Kühlfahrzeug Hersteller",
        "Kühlfahrzeug Garantie", "Carrier autorisierter Partner",
        "schnelle Lieferung Kühlfahrzeug", "Kühlfahrzeug Qualität",
        "Kühlfahrzeug Kundenbewertungen", "massgeschneiderter Kühltransporter",
        "Kühlfahrzeug Fachbetrieb", "Kühlfahrzeug langjährige Erfahrung",
      ],
    },
  },
  gallery: {
    hu: {
      title: "Galéria – elkészült hűtőautók és járműfelépítmények | Autotherm",
      description:
        "Tekintse meg elkészült hűtőautóink, hűtős furgonjaink és járműfelépítményeink galériáját. Képek a gyártási folyamatról és kész járművekről.",
      extraKeywords: [
        "hűtőautó képek", "hűtős furgon galéria", "járműfelépítmény képek",
        "hűtős furgon fotók", "elhunytszállító jármű képek", "alvázas felépítmény képek",
        "hűtőautó gyártás fotók", "Carrier beépítés képek", "raktérszigetelés fotók",
        "elkészült hűtőautók", "referencia képek hűtőautó",
        "hűtős furgon átalakítás képek", "kész hűtőautó galéria",
        "járműfelépítmény gyártás fotók",
      ],
    },
    en: {
      title: "Gallery – Completed Refrigerated Vehicles | Autotherm",
      description:
        "Browse our gallery of completed refrigerated vans, commercial vehicle bodies, and special conversions. See the quality of our workmanship.",
      extraKeywords: [
        "refrigerated van gallery", "cooled vehicle photos", "vehicle body pictures",
        "completed refrigerated vans", "van isolation before after",
        "refrigerated body examples", "commercial vehicle body gallery",
        "deceased transport vehicle photos", "custom refrigerated van images",
        "Autotherm vehicle portfolio", "chassis body installation photos",
        "cooling unit installation photos",
      ],
    },
    de: {
      title: "Galerie – Kühlfahrzeuge und Aufbauten | Autotherm",
      description:
        "Unsere fertiggestellten Kühlfahrzeuge, Kühltransporter und Nutzfahrzeugaufbauten in der Bildergalerie.",
      extraKeywords: [
        "Kühlfahrzeug Galerie", "Aufbauten Galerie", "Kühltransporter Bilder",
        "Kühlfahrzeug Fotos", "Kofferaufbau Bilder", "Bestattungswagen Galerie",
        "Kühlumbau Beispielbilder", "Nutzfahrzeugaufbau Fotos",
        "Carrier Einbau Bilder", "Kastenwagenisolierung Fotos",
        "Referenzbilder Kühlfahrzeuge",
      ],
    },
    ro: {
      title: "Galerie foto – carosări frigorifice și furgonete | Autotherm",
      description:
        "Galerie foto cu carosări frigorifice, furgonete frigorifice și suprastructuri finalizate de Autotherm SRL.",
      extraKeywords: [
        "carosări frigorifice foto", "furgon frigorific galerie",
        "suprastructuri imagini", "carosări frigorifice exemple",
        "furgon frigorific în lucru", "izolare furgon înainte după",
        "vehicul funerar fotografii", "Carrier instalare imagini",
        "carosări frigorifice portfolio", "producție carosări fotografii",
      ],
    },
  },
  contact: {
    hu: {
      title: "Kapcsolat – Autotherm Kft. Szeged | Hűtőautó gyártás és szerviz",
      description:
        "Vegye fel velünk a kapcsolatot! Autotherm Kft. – 6728 Szeged, Napos út 3. Tel: +36 20 910 20 50. Hűtőautó gyártás, Carrier szerviz egy helyen.",
      extraKeywords: [
        "Autotherm elérhetőség", "Autotherm Szeged", "hűtőautó Szeged",
        "Autotherm Kft. cím", "Autotherm Kft. telefonszám", "Autotherm Kft. email",
        "hűtőautó gyártó elérhetősége", "raktérhűtő szerviz Szeged",
        "Carrier szerviz elérhetőség", "hűtőautó gyártó telephely",
        "hűtőipari vállalat Szeged", "Autotherm Kft. nyitvatartás",
        "hűtőgép szerviz telefonszám",
      ],
    },
    en: {
      title: "Contact Us – Autotherm Ltd. Szeged, Hungary",
      description:
        "Contact Autotherm Ltd. – 6728 Szeged, Napos út 3, Hungary. Phone: +36 20 910 20 50. Refrigerated vehicle manufacturing and Carrier service.",
      extraKeywords: [
        "contact Autotherm", "Autotherm Szeged", "refrigerated vehicle Hungary",
        "Autotherm Ltd. address", "Autotherm phone number", "Autotherm email",
        "refrigerated vehicle manufacturer contact", "cooling unit service contact",
        "Szeged vehicle body builder", "Hungary refrigerated van company location",
        "Carrier service Hungary contact",
      ],
    },
    de: {
      title: "Kontakt – Autotherm GmbH Szeged, Ungarn",
      description:
        "Kontaktieren Sie Autotherm GmbH – 6728 Szeged, Napos út 3, Ungarn. Tel: +36 20 910 20 50. Kühlfahrzeug Herstellung und Carrier Service.",
      extraKeywords: [
        "Autotherm Kontakt", "Autotherm Szeged", "Kühlfahrzeug Ungarn",
        "Autotherm GmbH Adresse", "Autotherm Telefonnummer", "Autotherm Email",
        "Kühlfahrzeug Hersteller Kontakt", "Carrier Service Kontakt Ungarn",
        "Nutzfahrzeugaufbau Anfahrt", "Kühlfahrzeug Werk Ungarn",
      ],
    },
    ro: {
      title: "Contact – Autotherm SRL Szeged, Ungaria",
      description:
        "Contactați Autotherm SRL – 6728 Szeged, Napos út 3, Ungaria. Tel: +36 20 910 20 50. Producție carosări frigorifice și service Carrier.",
      extraKeywords: [
        "contact Autotherm", "Autotherm Szeged", "carosări frigorifice Ungaria",
        "Autotherm SRL adresă", "Autotherm telefon", "Autotherm email",
        "producător carosări frigorifice contact", "service Carrier contact Ungaria",
        "carosări frigorifice sediu",
      ],
    },
  },
  quotation: {
    hu: {
      title: "Árajánlatkérés – hűtőautó, hűtős furgon árajánlat | Autotherm",
      description:
        "Kérjen árajánlatot hűtőautóra, hűtős furgonra vagy járműfelépítményre! 12 órán belül részletes, műszaki dokumentációval ellátott árajánlatot adunk.",
      extraKeywords: [
        "hűtőautó árajánlat", "hűtős furgon árajánlat", "járműfelépítmény ár",
        "mennyibe kerül egy hűtős furgon", "hűtőautó árak 2025", "hűtőautó árlista",
        "hűtős furgon átalakítás ára", "raktérszigetelés árajánlat",
        "alvázas felépítmény árajánlat", "hűtőautó kalkulátor",
        "hűtős furgon finanszírozás", "hűtőautó lízing", "hűtős furgon részletre",
        "használt hűtőautó árajánlat", "egyedi hűtőautó árajánlat",
        "Carrier raktérhűtő árajánlat", "hűtőberendezés beépítés ára",
        "furgon szigetelés árajánlat", "hűtőautó gyártás árajánlat kérés",
        "árajánlat igénylés hűtőautó",
      ],
    },
    en: {
      title: "Request a Quotation – Refrigerated Vehicles & Conversions | Autotherm",
      description:
        "Request a free quotation for refrigerated vans, vehicle bodies, or van isolations. We provide detailed quotes with technical documentation within 12 hours.",
      extraKeywords: [
        "refrigerated van quote", "cooled vehicle price", "quotation vehicle body",
        "how much does a refrigerated van cost", "refrigerated van price list 2025",
        "refrigerated van conversion cost", "van isolation cost",
        "cooling unit installation price", "commercial vehicle body price",
        "custom refrigerated van pricing", "refrigerated vehicle financing",
        "reefer van lease", "request quote refrigerated body",
        "free quotation cooled vehicle", "12 hour quote refrigerated",
      ],
    },
    de: {
      title: "Angebot anfordern – Kühlfahrzeuge & Kühltransporter | Autotherm",
      description:
        "Fordern Sie ein kostenloses Angebot für Kühlfahrzeuge, Kühltransporter oder Nutzfahrzeugaufbauten an. Detailangebot innerhalb von 12 Stunden.",
      extraKeywords: [
        "Kühlfahrzeug Angebot", "Kühltransporter Preis", "Angebot Nutzfahrzeugaufbau",
        "Kühlfahrzeug Kosten", "Was kostet ein Kühltransporter",
        "Kühlfahrzeug Preisliste 2025", "Kühltransporter Umbau Preis",
        "Kastenwagenisolierung Kosten", "Kühlaggregat Einbau Preis",
        "Kofferaufbau Angebot", "Kühlfahrzeug Finanzierung",
        "Kühltransporter Leasing", "kostenloses Angebot Kühlfahrzeug",
      ],
    },
    ro: {
      title: "Cerere ofertă – carosări frigorifice și furgonete | Autotherm",
      description:
        "Solicitați o ofertă gratuită pentru carosări frigorifice, furgonete frigorifice sau suprastructuri. Ofertă detaliată în 12 ore.",
      extraKeywords: [
        "ofertă carosări frigorifice", "preț furgon frigorific",
        "cerere ofertă suprastructură", "cât costă un furgon frigorific",
        "preț carosare frigorifică 2025", "cost izolare furgon frigorific",
        "instalare unitate frigorifică preț", "carosare frigorifică financiare",
        "leasing furgon frigorific", "ofertă gratuită carosări frigorifice",
        "calcul preț furgon frigorific",
      ],
    },
  },
  blog: {
    hu: {
      title: "Hűtőautó Blog – hasznos tanácsok, hírek | Autotherm",
      description:
        "Hűtőautókkal kapcsolatos hasznos információk, tanácsok, hírek az Autotherm szakértőitől. Minden, amit a hűtött szállításról tudni érdemes.",
      extraKeywords: [
        "hűtőautó blog", "hűtött szállítás tanácsok", "raktérhűtő tippek",
        "hűtőautó karbantartás tippek", "raktérhűtő használati tanácsok",
        "hűtős furgon üzemeltetés", "hűtött logisztika cikkek",
        "hűtőautó téli üzemeltetés", "raktérhűtő nyári karbantartás",
        "hűtőautó hibaelhárítás", "Carrier hűtőberendezés tippek",
        "hűtős szállítás szabályai", "hűtőautó vásárlási tanácsok",
        "hűtött áru szállítás előírások", "hőmérséklet érzékeny szállítás tippek",
      ],
    },
    en: {
      title: "Cooled Vehicle Blog – Tips, News & Insights | Autotherm",
      description:
        "Read our blog for expert tips, news and insights about refrigerated vehicles, cold logistics, van isolations and temperature-controlled transport.",
      extraKeywords: [
        "cooled vehicle blog", "refrigerated transport tips", "cold logistics blog",
        "refrigerated van maintenance", "cooling unit troubleshooting",
        "winter operation refrigerated van", "summer cooling van tips",
        "food transport temperature guidelines", "HACCP transport compliance",
        "refrigerated vehicle buying guide", "van conversion tips",
        "cold chain best practices", "temperature controlled logistics advice",
      ],
    },
    de: {
      title: "Kühlfahrzeug Blog – Tipps, Neuigkeiten & Einblicke | Autotherm",
      description:
        "Lesen Sie unseren Blog mit Expertentipps, Neuigkeiten und Einblicken zu Kühlfahrzeugen, Kühllogistik und temperaturgeführten Transporten.",
      extraKeywords: [
        "Kühlfahrzeug Blog", "Kühllogistik Tipps", "temperaturgeführter Transport",
        "Kühlfahrzeug Wartung Tipps", "Kühlaggregat Störung",
        "Kühltransporter Winterbetrieb", "Kühlkette Einhaltung Tipps",
        "Lebensmitteltransport Vorschriften", "Kühlfahrzeug Kaufberatung",
        "Kastenwagenisolierung Ratgeber", "Kühllogistik Ratgeber",
        "HACCP Transport Konformität",
      ],
    },
    ro: {
      title: "Blog – Vehicule frigorifice – Sfaturi și noutăți | Autotherm",
      description:
        "Citiți blogul nostru pentru sfaturi de specialitate, noutăți și informații despre vehiculele frigorifice, logistica rece și transportul cu temperatură controlată.",
      extraKeywords: [
        "blog vehicule frigorifice", "sfaturi transport frigorific",
        "logistică rece blog", "mentenanță furgon frigorific",
        "depanare unitate frigorifică", "operare iarnă furgon frigorific",
        "sfaturi răcire vară", "transport alimente temperatură",
        "conformitate HACCP transport", "ghid cumpărare vehicul frigorific",
      ],
    },
  },
  commercialBodies: {
    hu: {
      title: "Haszonjármű felépítmények – dobozos és platós felépítmények | Autotherm",
      description:
        "Haszonjármű felépítmények 3,5 tonnáig: alumínium doboz, hűtős doboz, platós-ponyvás felépítmény. Hőszigetelt felépítmények, egyedi méretre gyártva.",
      extraKeywords: [
        "haszonjármű felépítmény", "dobozos felépítmény", "platós felépítmény",
        "alvázas felépítmény árak", "alumínium doboz felépítmény",
        "platós ponyvás felépítmény ára", "hűtős doboz felépítmény",
        "Billenő platós felépítmény", "zárt dobozos felépítmény",
        "hőszigetelt doboz felépítmény", "egyedi felépítmény gyártás",
        "tehergépkocsi felépítmény", "kisteher felépítmény",
        "3.5T alvázas felépítmény", "felépítmény gyártó Magyarország",
      ],
    },
    en: {
      title: "3.5 Ton Chassis Commercial Vehicle Bodies | Autotherm",
      description:
        "Aluminium box bodies, refrigerated boxes, flatbed with tarpaulin for 3.5T chassis. Stainless steel or GRP interior lining.",
      extraKeywords: [
        "commercial vehicle body 3.5T", "aluminium box body", "chassis body",
        "3.5T box body prices", "aluminium body dimensions",
        "refrigerated box body 3.5T", "flatbed tarpaulin body 3.5T",
        "insulated box body 3.5T", "chassis cab body builder",
        "custom aluminium truck body", "lightweight box body construction",
        "GRP lined box body", "stainless steel interior body",
        "3.5T body manufacturer Hungary",
      ],
    },
  },
  bodyRepair: {
    hu: {
      title: "Járműfelépítmény javítás – sérült felépítmények javítása | Autotherm",
      description:
        "Sérült járműfelépítmények javítása, károsodott szendvics panelek cseréje. Gyors és szakszerű javítás, akár biztosítói ügyintézéssel.",
      extraKeywords: [
        "járműfelépítmény javítás", "felépítmény javítás", "szendvics panel csere",
        "hűtős doboz javítás", "alumínium felépítmény javítás",
        "platós felépítmény javítás", "felépítmény sérülés javítás",
        "biztosítói kárrendezés felépítmény", "szendvics panel javítás ára",
        "hűtőautó baleset javítás", "felépítmény horpadás javítás",
        "járműfelépítmény festés", "felépítmény karbantartás",
      ],
    },
  },
  ourService: {
    hu: {
      title: "Szervizünk – Carrier és Daikin hűtő szerviz | Autotherm Kft.",
      description:
        "Teljes körű raktérhűtő szerviz: diagnosztika, javítás, karbantartás. Carrier és Daikin hivatalos szervizpartnere. Gyors, pontos, megbízható.",
      extraKeywords: [
        "hűtő szerviz", "raktérhűtő szerviz", "Carrier javítás", "Daikin javítás",
        "raktérhűtő diagnosztika", "hűtőberendezés szerviz árak",
        "raktérhűtő éves felülvizsgálat", "hűtőberendezés karbantartás ára",
        "Carrier előírás szerinti karbantartás", "raktérhűtő téliesítés",
        "raktérhűtő klíma szerviz", "hűtőrendszer fertőtlenítés",
        "raktérhűtő alkatrész utánrendelés", "Carrier szerviz díj",
        "hűtőautó szerviz költség",
      ],
    },
  },
  configurator: {
    hu: {
      title: "Járműkonfigurátor – állítsa össze saját hűtőautóját | Autotherm",
      description:
        "Állítsa össze saját hűtőautóját online konfigurátorunkkal! Válasszon márkát, típust, felépítményt, hűtőberendezést és belső burkolatot.",
      extraKeywords: [
        "hűtőautó konfigurátor", "járműkonfigurátor", "hűtőautó összeállítás",
        "online hűtőautó építő", "hűtős furgon konfigurátor",
        "jármű felépítmény konfigurátor", "hűtőautó extrák választás",
        "hűtőautó egyedi igények", "hűtőautó típus választás",
        "raktérhűtő konfigurátor", "Carrier hűtőberendezés választás",
        "furgon méret kalkulátor", "hűtős furgon összeállítás online",
      ],
    },
    en: {
      title: "Vehicle Configurator – Build Your Own Refrigerated Van | Autotherm",
      description:
        "Configure your own refrigerated vehicle online. Choose brand, model, body type, cooling unit and interior lining.",
      extraKeywords: [
        "refrigerated van configurator", "vehicle configurator",
        "custom refrigerated van builder", "online van configurator",
        "build your own refrigerated van", "van configuration tool",
        "cooling unit selection", "refrigerated van options",
        "custom body type configurator",
      ],
    },
    de: {
      title: "Fahrzeugkonfigurator – Bauen Sie Ihren eigenen Kühltransporter | Autotherm",
      description:
        "Konfigurieren Sie Ihr eigenes Kühlfahrzeug online. Wählen Sie Marke, Modell, Aufbauart, Kühlaggregat und Innenausstattung.",
      extraKeywords: [
        "Kühlfahrzeug Konfigurator", "Fahrzeugkonfigurator",
        "Kühltransporter Konfiguration", "Online Konfigurator Kühlfahrzeug",
        "Kühlkoffer Konfigurator", "Kühlaggregat Auswahl", "Aufbauart Konfigurator",
      ],
    },
    ro: {
      title: "Configurator vehicul – Construiți propriul furgon frigorific | Autotherm",
      description:
        "Configurați propriul vehicul frigorific online. Alegeți marcă, model, tip caroserie, unitate frigorifică și izolație interioară.",
      extraKeywords: [
        "configurator furgon frigorific", "configurator vehicul",
        "constructor furgon frigorific", "configurator online furgon",
        "selectare unitate frigorifică", "configurator tip caroserie",
      ],
    },
  },
  vanIsolations: {
    en: {
      title: "Van Isolations & Cooling Unit Installation | Autotherm",
      description:
        "Professional van isolation and cooling unit installation. Carrier and Daikin systems. Perfect for cold logistics and temperature-controlled transport.",
      extraKeywords: [
        "van isolation", "cooling unit installation", "refrigerated van conversion",
        "van insulation kit", "aftermarket van refrigeration",
        "panel van refrigeration", "Carrier van installation",
        "Daikin van installation", "vacuum bonded panel insulation",
        "50mm insulation van", "80mm insulation van", "food grade van lining",
        "hygienic van conversion", "washable van interior",
        "LED lighting refrigerated van", "van temperature control install",
      ],
    },
  },
  deceasedTransport: {
    en: {
      title: "Deceased Transport Vehicles – Specialized Manufacturing | Autotherm",
      description:
        "Deceased transport vehicles with temperature control, stainless steel interior, multi-level configurations.",
      extraKeywords: [
        "deceased transport vehicle", "funeral transport vehicle", "mortuary vehicle",
        "hearse vehicle", "coffin transport van", "deceased removal vehicle",
        "funeral director vehicle", "temperature controlled mortuary van",
        "stainless steel funeral vehicle", "multi level coffin transport",
        "respectful transport vehicle", "body transport vehicle",
        "funeral home vehicle", "mortuary van conversion",
        "deceased transport manufacturer",
      ],
    },
  },
  cooledBodies: {
    en: {
      title: "Cooled & Refrigerated Vehicle Bodies – Custom Manufacturing | Autotherm",
      description:
        "Custom cooled and refrigerated vehicle bodies for 3.5T chassis. Carrier/Daikin cooling units. Built to your specifications.",
      extraKeywords: [
        "refrigerated vehicle bodies", "cooled chassis bodies",
        "insulated vehicle bodies", "custom refrigerated body 3.5T",
        "cooled box body dimensions", "refrigerated truck body manufacturer",
        "custom temperature controlled body", "Carrier truck body integration",
        "Daikin truck body installation", "bespoke refrigerated body",
        "3.5T cooled body builder", "insulated panel body construction",
        "aluminium refrigerated body", "GRP refrigerated body",
      ],
    },
  },
  terms: {
    hu: {
      title: "Általános Szerződési Feltételek (ÁSZF) | Autotherm Kft.",
      description:
        "Az Autotherm Kft. Általános Szerződési Feltételei. Tartalmazza a megrendelésre, fizetésre, jótállásra és szavatosságra vonatkozó rendelkezéseket.",
      extraKeywords: [
        "ÁSZF", "általános szerződési feltételek", "Autotherm ÁSZF",
        "hűtőautó vásárlási feltételek", "hűtőautó garancia feltételek",
        "hűtőautó szállítási feltételek", "hűtőautó fizetési módok",
        "hűtőautó jótállás", "Autotherm Kft. szerződési feltételek",
      ],
    },
  },
  privacy: {
    hu: {
      title: "Adatkezelési tájékoztató | Autotherm Kft.",
      description:
        "Az Autotherm Kft. adatkezelési tájékoztatója. Tájékozódjon személyes adatai kezeléséről, az adatvédelemről és az Ön jogairól.",
      extraKeywords: [
        "adatkezelés", "adatvédelem", "GDPR", "adatkezelési tájékoztató",
        "Autotherm adatkezelés", "személyes adatok kezelése",
        "adatvédelmi szabályzat", "GDPR tájékoztató Autotherm",
      ],
    },
  },
};

/* -------------------------------------------------------------------------- */
/*  Metadata builder                                                          */
/* -------------------------------------------------------------------------- */

export function getSeoEntry(key: PageKey, lang: Lang): SeoEntry {
  return PAGE_SEO[key]?.[lang] ?? DEFAULTS[lang];
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}

/**
 * Build a complete Next.js Metadata object for a page:
 * title, description, merged keywords, canonical, hreflang alternates
 * (only languages where the page actually exists), Open Graph and Twitter.
 */
export function buildPageMetadata(key: PageKey, lang: Lang): Metadata {
  const entry = getSeoEntry(key, lang);
  const canonicalPath = pathFor(key, lang) ?? `/${lang}`;
  const canonical = absoluteUrl(canonicalPath);

  const languages: Record<string, string> = {};
  const alts = alternatesFor(key);
  for (const l of LANGS) {
    const p = alts[l];
    if (p) languages[BCP47[l]] = absoluteUrl(p);
  }
  const defaultPath = alts.hu ?? canonicalPath;
  languages["x-default"] = absoluteUrl(defaultPath);

  const keywords = [...baseKeywords[lang], ...(entry.extraKeywords ?? [])];

  return {
    title: entry.title,
    description: entry.description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      locale: LOCALES[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => LOCALES[l]),
      siteName: "Autotherm",
      title: entry.title,
      description: entry.description,
      url: canonical,
      images: [
        {
          url: absoluteUrl("/images/autotherm-logo.png"),
          width: 800,
          height: 600,
          alt: "Autotherm",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: [absoluteUrl("/images/autotherm-logo.png")],
    },
  };
}
