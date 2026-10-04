import type { EcoDict } from "./types";

const individual = "Individuelle Anforderungen verlangen individuelle Lösungen.";
const tagline = "Die Zukunft ist grün – oder gar nicht.";
const approach =
  "Um die Reichweite zu erhalten, setzen wir bei Transportern mit 6 m³ Laderaum auf ein autarkes Kühlaggregat mit eigenem, zyklisch geladenem Akkupack.";
const efficient =
  "Neben der planbaren Reichweite des Elektrotransporters und der sicheren Kühlung sind es unsere Kühlumbauten mit Garantie, die die von uns umgebauten Elektro-Kühlfahrzeuge wirklich effizient machen.";
const pickupBody =
  "Nutzen Sie unser Angebot zur Abholung und Rückführung Ihres Fahrzeugs – für einen umfassenden, sorgenfreien Service!";

export const de: EcoDict = {
  nav: {
    home: "Startseite",
    why: "Warum elektrisch?",
    technology: "Technologie",
    vehicles: "Fahrzeuge",
    quote: "Angebot anfordern",
  },
  seo: {
    home: {
      title: "Elektro-Kühlfahrzeug mit autarkem Kühlaggregat | Zero Emission – Autotherm",
      description:
        "Kühlumbau von Elektrotransportern mit autarkem Kühlaggregat und eigenem Akkupack – unveränderte Reichweite, emissionsfreier und leiser Kühltransport. Autotherm GmbH.",
    },
    why: {
      title: "Warum ein Elektro-Kühlfahrzeug? | Zero Emission – Autotherm",
      description:
        "Emissionsfrei, leise und wirtschaftlich: Warum das Elektro-Kühlfahrzeug eine gute Wahl für die Frischelogistik in der Innenstadt und im Umland ist.",
    },
    technology: {
      title: "Autarkes Kühlaggregat mit eigenem Akkupack | Zero Emission – Autotherm",
      description:
        "So funktioniert das autarke Kühlaggregat mit zyklisch geladenem Akkupack: Die Kühlung zehrt nicht am Antriebsakku, die Kühlkette hält auch im Stand.",
    },
    vehicles: {
      title: "Umbaubare Elektrotransporter | Zero Emission – Autotherm",
      description:
        "Peugeot E-Partner, Citroën ë-Berlingo, Opel Combo Electric, Toyota Proace City Electric, Nissan Townstar EV, BYD ETP3, Kia PV5 Cargo, Mercedes-Benz eVito und eSprinter – Umbau von Elektrotransportern zu Kühlfahrzeugen.",
    },
    quote: {
      title: "Angebot anfordern – Elektro-Kühlfahrzeug | Zero Emission – Autotherm",
      description:
        "Fordern Sie ein Angebot für den Kühlumbau Ihres Elektrotransporters mit autarkem Kühlaggregat an. Individuelle Lösung, mit Abhol- und Rückführungsservice.",
    },
  },
  common: {
    getQuote: "Angebot anfordern",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    close: "Schließen",
    contactPerson: "Ansprechpartner",
    phone: "Telefon",
    email: "E-Mail",
    callIntro: "Wenn Sie lieber telefonisch ein Angebot anfordern möchten, wenden Sie sich an unseren Kollegen.",
  },
  contactRole: "Vertrieb – Elektro-Kühlfahrzeuge",
  pickup: { title: "Abholung und Rückführung", body: pickupBody },
  hero: {
    eyebrow: "Autotherm · Elektro-Kühlfahrzeuge",
    title: "Elektro-Kühlfahrzeug",
    tagline,
    lead: "Der Markt für elektrisch angetriebene Nutzfahrzeuge wächst rasant. Bei Autotherm arbeiten wir daran, mit Weiterentwicklungen und neuen Technologien die beste Lösung für unsere Kunden zu finden.",
    howItWorks: "Wie funktioniert es?",
    points: ["Emissionsfrei und leise", "Unveränderte Reichweite", "Autarker Akkupack"],
  },
  home: {
    introEyebrow: "Maßgeschneiderte Elektro-Kühlfahrzeuge",
    introTitle: individual,
    introLead: "Kühlfahrzeug-Umbauten für den Frischwarentransport mit autarkem Kühlaggregat.",
    introBody: [
      `Als Hersteller von Kühlfahrzeugen sieht auch die Autotherm GmbH die Zukunft in elektrisch angetriebenen Transportern. ${approach}`,
      efficient,
    ],
    introLink: "So funktioniert die Technik",
    contactEyebrow: "Persönliche Beratung",
    contactTitle: "Sie denken an ein anderes Modell? Fragen Sie unseren Kollegen.",
    cta: {
      title: "Fordern Sie jetzt unser Angebot an!",
      body: "Elektro-Kühlfahrzeug mit autarkem Kühlaggregat! Nutzen Sie unser Angebot zur Abholung und Rückführung Ihres Fahrzeugs – für einen umfassenden, sorgenfreien Service.",
    },
  },
  features: [
    { title: "Autarker Akkupack", body: "Das Kühlaggregat läuft mit einem eigenen Akku, nicht mit dem Antriebsakku des Fahrzeugs." },
    { title: "Unveränderte Reichweite", body: "Da die Kühlung nicht am Antriebsakku zehrt, sinkt die Reichweite des Transporters nicht." },
    { title: "Zyklisch geladener Akkupack", body: "Der Akkupack wird zyklisch geladen, so steht die Kühlung jederzeit zur Verfügung." },
    { title: "Akku- + Netzkühlung", body: "Betrieb über den Akku und über das Stromnetz möglich." },
    { title: "Lange Kühllaufzeit", body: "In wenigen Stunden aufgeladen, mit langer Kühllaufzeit." },
    { title: "Emissionsfrei und leise", body: "Keine Abgase und kein Motorlärm – ideal für die Zustellung in der Innenstadt." },
    { title: "Planbar und sicher", body: "Planbare Reichweite und sichere Kühlung auf jeder Tour." },
    { title: "Mit Garantie und zuverlässig", body: "Kühlumbau mit Garantie von Autotherm, dem Kühlfahrzeug-Spezialisten seit 1992." },
  ],
  case: {
    title: "Ist das Elektro-Kühlfahrzeug eine Alternative? Eindeutig: JA!",
    body: [
      "Die Vorteile liegen auf der Hand: Elektrische Kühltransporter sind emissionsfrei, leise und gut für das Image und den Geldbeutel des Unternehmens. Die Frischelogistik braucht jedoch vor allem zwei Dinge: Zuverlässigkeit bei der Temperaturregelung und die bestmögliche Ausnutzung der Reichweite.",
      "Elektro-Kühlfahrzeuge eignen sich besonders für den Innenstadtverkehr oder für Lieferungen aus Großstädten ins Umland. Ob Sie Fleisch, Backwaren, Obst, Gemüse oder andere gekühlte Lebensmittel transportieren – mit einem elektrischen Kühltransporter erreichen Sie die gleiche Kühlleistung wie mit herkömmlichen isolierten Kastenwagen. Elektro-Kühlfahrzeuge sind in wenigen Stunden aufgeladen und bieten eine lange Kühllaufzeit.",
      "Und der Vorteil eines Kühlaggregats mit eigenem Akkupack: Die Kühlkette reißt selbst bei stehendem Fahrzeug nicht ab, weil das Aggregat weiterläuft – und das ganz ohne Reichweitenverlust!",
    ],
  },
  strip: {
    eyebrow: "Umbaubare Modelle",
    title: "Elektrotransporter, die wir zu Kühlfahrzeugen umbauen",
    cta: "Alle Fahrzeuge",
  },
  why: {
    eyebrow: "Warum elektrisch?",
    title: tagline,
    lead: "Die Frischelogistik steht vor vielen neuen Herausforderungen: Fahrverbote für Dieselfahrzeuge sowie zunehmender Lärm und Luftverschmutzung in den Städten verlangen neue Lösungen, etwa elektrisch angetriebene Transporter.",
    logisticsEyebrow: "Stadtlogistik im Wandel",
    logistics: [
      "Die Nachfrage nach frischen Lebensmitteln steigt, Lieferketten sind komplexer geworden und immer mehr Menschen lassen sich Waren nach Hause liefern – eine effiziente Logistik wird immer wichtiger.",
      "Zum Verbrennungsmotor gibt es inzwischen Alternativen: Immer mehr Hersteller bieten elektrisch angetriebene Nutzfahrzeuge an.",
    ],
    quote: "Doch wie praxistauglich sind die Fahrzeuge auf dem Markt? Sind sie überhaupt wirtschaftlich?",
    benefitsTitle: "Die Vorteile liegen auf der Hand",
    benefits: [
      { title: "Emissionsfrei", body: "Ohne lokale Emissionen unterwegs – auch dort, wo Diesel eingeschränkt werden." },
      { title: "Leise", body: "Leiser Betrieb für die Zustellung in der Innenstadt sowie früh morgens oder spät abends." },
      { title: "Gut für das Image", body: "Eine grüne Flotte ist eine starke Botschaft an Partner und Kunden." },
      { title: "Gut für den Geldbeutel", body: "Der elektrische Kühltransporter schont auch das Firmenbudget." },
    ],
    bestEyebrow: "Wo er sich am meisten lohnt",
    best: ["Innenstadtverkehr", "Lieferungen aus Großstädten ins Umland"],
    cargoEyebrow: "Für alle gekühlten Waren",
    cargo: ["Fleisch", "Backwaren", "Obst", "Gemüse", "Andere gekühlte Lebensmittel"],
    cta: {
      title: "Steigen Sie im Kühltransport auf Grün um!",
      body: "Elektro-Kühlfahrzeug mit autarkem Kühlaggregat – fordern Sie ein individuelles Angebot an.",
    },
  },
  technology: {
    eyebrow: "Technologie",
    title: "Autarkes Kühlaggregat mit eigenem Akkupack",
    lead: approach,
    howTitle: "So funktioniert es",
    steps: [
      { title: "Eigener Akkupack", body: "Das Kühlaggregat wird von einem separaten, eigenen Akkupack versorgt – nicht vom Antriebsakku des Fahrzeugs." },
      { title: "Zyklisches Laden", body: "Der Akkupack wird zyklisch geladen und kann auch am Stromnetz betrieben werden: Akku- + Netzkühlung." },
      { title: "Kühlung auch im Stand", body: "Die Kühlkette reißt auch bei stehendem Fahrzeug nicht ab – das Aggregat läuft weiter." },
      { title: "Unveränderte Reichweite", body: "Da die Kühlung nicht am Antriebsakku zehrt, bleibt die Reichweite des Transporters planbar." },
    ],
    compareEyebrow: "Warum nicht über den Antriebsakku?",
    compareTitle: "Die Kühlung soll nicht an der Reichweite zehren",
    driveLabel: "Kühlung über den Antriebsakku",
    drive: ["Die Kühlenergie geht von der Reichweite des Fahrzeugs ab", "Die tägliche Route ist schwerer planbar"],
    ownLabel: "Mit autarkem Akkupack – Autotherm",
    own: [
      "Unveränderte Reichweite",
      "Die Kühlkette hält auch im Stand",
      "Läuft mit Akku und am Stromnetz",
      "In wenigen Stunden aufgeladen, lange Kühllaufzeit",
    ],
    closing: efficient,
    cta: {
      title: "Welche Lösung passt zu Ihrer Flotte?",
      body: "Unser Kollege erklärt Ihnen, wie wir Ihren Elektrotransporter zum Kühlfahrzeug umbauen.",
    },
  },
  vehicles: {
    eyebrow: "Fahrzeuge",
    title: "Umbaubare Elektrotransporter",
    lead: "Die folgenden Elektrotransporter bauen wir mit autarkem Kühlaggregat zu Kühlfahrzeugen um. Sie denken an ein anderes Modell? Fragen Sie unseren Kollegen.",
    cardBody: "Kühlumbau mit autarkem Kühlaggregat mit eigenem Akkupack.",
    otherEyebrow: "Anderes Modell?",
    otherTitle: individual,
    cta: {
      title: "Fordern Sie jetzt unser Angebot an!",
      body: "Elektro-Kühlfahrzeug mit autarkem Kühlaggregat!",
    },
  },
  quote: {
    eyebrow: "Angebot anfordern",
    title: "Fordern Sie jetzt unser Angebot an!",
    lead: "Elektro-Kühlfahrzeug mit autarkem Kühlaggregat! Individuelle Anforderungen verlangen individuelle Lösungen – schreiben Sie uns, für welches Fahrzeug und welche gekühlten Waren Sie eine Lösung suchen.",
    formTitle: "Angebotsformular",
    vehiclePlaceholder: "z. B. Citroën ë-Berlingo, Kia PV5 Cargo",
  },
  footer: {
    tagline: "Elektro-Kühlfahrzeuge mit autarkem Kühlaggregat – von der Autotherm GmbH, dem Kühlfahrzeug-Spezialisten seit {year}.",
    mainSite: "Autotherm-Kühlfahrzeuge",
    menu: "Menü",
    navLabel: "Fußzeile",
    rights: "alle Rechte vorbehalten",
    terms: "AGB",
    privacy: "Datenschutz",
  },
};
