import type { HearseDict } from "./types";

const quoteBody = "Halottszállító és pompaautó átalakítás egyedi igényekre szabva!";
const pickupBody =
  "Vegye igénybe járművének átvételi és visszaküldési ajánlatunkat egy átfogó és gondtalan szolgáltatáshoz!";
const individual = "Az egyedi igények egyedi megoldásokat igényelnek.";
const tagline = "Az örökkévalóság jegyében.";
const approach =
  "3,5 tonnás haszonjárművek halottszállító rakterének kialakítása: AT Strong® hőszigetelés, rozsdamentes vagy üvegszálas bevonat, rejtett raktérhűtés, amely kánikulában is garantált +18 °C fokot tart.";
const efficient =
  "A kegyeleti szolgáltatásokhoz méltó, csendes és megbízható hűtés, a garanciális átalakítás és a teljes körű ügyintézés teszi igazán hatékonnyá az általunk épített halottszállító járműveket.";

export const hu: HearseDict = {
  nav: {
    home: "Főoldal",
    why: "Miért mi?",
    product: "Termékünk",
    builds: "Halottas autók",
    quote: "Ajánlatkérés",
  },
  seo: {
    home: {
      title: "Halottszállító autó gyártás, pompaautó átalakítás | Halottszállító – Autotherm",
      description:
        "Elhunyt szállító és pompaautó gyártás, halottszállító furgonok átalakítása rejtett raktérhűtéssel, teljes ügyintézéssel. Autotherm Kft.",
    },
    why: {
      title: "Miért mi? Halottaskocsi gyártás 1992 óta | Halottszállító – Autotherm",
      description:
        "Egyedülálló garanciák, piacvezető gyorsaság, igényes kivitelezés: miért az Autotherm a halottszállító autók gyártója.",
    },
    product: {
      title: "Elhunyt szállító hűtőautó: AT Strong® szigetelés, +18 °C hűtés | Halottszállító",
      description:
        "Így készül a halottszállító raktér: AT Strong® hőszigetelés, rozsdamentes vagy üvegszálas bevonat, rejtett raktérhűtés, koporsótálca és urnatartó.",
    },
    builds: {
      title: "Halottas autók: elkészült átalakításaink képekben | Halottszállító – Autotherm",
      description:
        "Ford Transit, Ford Custom, Mercedes Vito és további halottszállító átalakítások – nézze meg elkészült halottas autóinkat.",
    },
    quote: {
      title: "Halottasautó árak – gyors árajánlat pompaautó átalakításra | Halottszállító",
      description:
        "Kérjen árajánlatot halottszállító és pompaautó átalakításra. Személyre szabott megoldás, 12 órán belüli ajánlatküldés.",
    },
  },
  common: {
    getQuote: "Árajánlatot kérek",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    close: "Bezárás",
    contactPerson: "Kapcsolattartó",
    phone: "Telefon",
    email: "E-mail",
    callIntro: "Ha inkább telefonon szeretne árajánlatot kérni, keresse kollégánkat.",
  },
  contactRole: "Értékesítés – halottszállító autók",
  pickup: { title: "Átvétel és visszaküldés", body: pickupBody },
  hero: {
    eyebrow: "Autotherm · Halottszállító autók",
    title: "Halottszállító autó",
    tagline,
    lead: "Halottszállító és pompaautó gyártás, hűtőautó átalakítás és raktérhűtő szerviz – egyedi igényekre szabva, egy méltó koporsós vagy hamvasztásos szertartáshoz.",
    howItWorks: "Hogyan készül?",
    points: ["Rejtett raktérhűtés", "Teljes ügyintézés", "Egyedülálló garanciák"],
  },
  home: {
    introEyebrow: "Személyre szabott halottszállítók",
    introTitle: individual,
    introLead: "Elhunyt szállító átalakítások 3,5 tonnás haszonjárművekbe.",
    introBody: [
      `Halottszállító autó gyártó cégként az Autotherm Kft. a kegyeletteljes, méltó búcsú szolgálatában áll. ${approach}`,
      efficient,
    ],
    introLink: "Így készül a termékünk",
    contactEyebrow: "Személyes tanácsadás",
    contactTitle: "Más típusban gondolkodik? Kérdezze kollégánkat.",
    cta: {
      title: "Kérje árajánlatunkat most!",
      body: "Halottszállító és pompaautó átalakítás egyedi igényekre szabva! Vegye igénybe járművének átvételi és visszaküldési ajánlatunkat egy átfogó és gondtalan szolgáltatáshoz.",
    },
  },
  features: [
    { title: "AT Strong® hőszigetelés", body: "Saját fejlesztésű szigetelési technológia, amelyre 3 év garanciát vállalunk." },
    { title: "Rejtett raktérhűtés", body: "Kánikulában is garantált +18 °C fok a raktérben, észrevétlenül beépítve." },
    { title: "Rozsdamentes bevonat", body: "Rozsdamentes vagy üvegszálas bevonat – higiénikus, mosható, méltó kivitel." },
    { title: "Koporsótálca és sínek", body: "Kihúzható koporsótálca, rögzítősínek és urnatartó a biztonságos szállításhoz." },
    { title: "Több szintes változat", body: "Egy- és többszintes kialakítás, speciális megoldások egyedi igényekre." },
    { title: "Ford és Mercedes alapok", body: "Ford Transit, Custom és Mercedes Vito alapokra építve – bevált típusok." },
    { title: "Gyors kivitelezés", body: "Piacvezető gyorsaság, évi több száz átalakítás rutinjával." },
    { title: "Garanciális és megbízható", body: "Pénzvisszafizetési garancia és 3 éves szigetelési garancia az Autotherm-től." },
  ],
  case: {
    title: "Halottszállító az Autotherm-től? Egyértelműen: IGEN!",
    body: [
      "Az előnyök nyilvánvalóak: az Autotherm halottszállító autói méltóak, csendesek és megbízhatóak – jót tesznek a kegyeleti szolgáltatás színvonalának és a cég megítélésének. Az elhunytak szállításához azonban mindenekelőtt két dolog kell: megbízhatóság a hűtésben és méltóság a kivitelben.",
      "A halottszállító autók különösen alkalmasak a kegyeleti szolgáltatások napi feladataira: akár koporsós, akár hamvasztásos szertartáshoz készülnek. Függetlenül attól, hogy Ford Transit, Custom vagy Mercedes Vito az alapjármű, egy Autotherm átalakítással ugyanolyan igényes hűtést és kivitelt kap, mint a legnagyobb európai gyártóknál.",
      "A rejtett raktérhűtés előnye pedig azt jelenti, hogy a kegyeletteljes +18 °C fok kánikulában is tartható – mindez csendesen, észrevétlenül!",
    ],
  },
  strip: {
    eyebrow: "Elkészült átalakítások",
    title: "Halottas autók, amelyeket átépítettünk",
    cta: "Minden jármű",
  },
  why: {
    eyebrow: "Miért mi?",
    title: "7 érv, miért minket válasszon",
    lead: "Magyarország egyik vezető halott szállító autók és hűtőautók átalakításával foglalkozó vállalkozása vagyunk – 1992 óta.",
    logisticsEyebrow: "Honnan jövünk",
    logistics: [
      "Cégünk 1992-ben Autotherm Kft. néven alakult meg. A Carrier, majd a Thermo King hűtőberendezések szervizeként váltunk Dél-Magyarország meghatározó hűtőgép szervizévé.",
      "Ma 1500 m²-en, 4 üzemcsarnokban folyik a gyártás: felépítménygyártás, utólagos szigetelés, vasanyagok megmunkálása, raktérhűtők beépítése és szervize.",
    ],
    quote: "25 éve a szakmában – garanciáink, amelyekkel senki más nem mer előállni.",
    benefitsTitle: "Az előnyök nyilvánvalóak",
    benefits: [
      { title: "25 éve a szakmában", body: "1992 óta építünk hűtős és halottszállító járműveket – több ezer elégedett ügyfél." },
      { title: "Garanciáink", body: "Pénzvisszafizetési garancia, 3 éves szigetelési garancia és az „Azt kapja, amit lát” garancia." },
      { title: "Egy kézben minden", body: "Felépítménygyártás és hűtős szakterület cégen belül – gyorsan, rugalmasan." },
      { title: "0–24 órás szerviz", body: "24 órás készenlét raktérhűtő gondokra, saját szervizmúlttal." },
      { title: "Ügyfélszolgálat", body: "Ingyen hívható zöldszám és gyors, precíz árajánlatadás 12 órán belül." },
      { title: "Darabszám", body: "Évi több száz átalakítás – piacvezetők a 3,5 tonnás kategóriában." },
      { title: "Üzletfilozófiánk", body: "„Többet tenni a világért, mint amennyit a világ tesz érted – ez a siker.”" },
    ],
    bestEyebrow: "Amire a legbüszkébbek vagyunk",
    best: ["Pénzvisszafizetési garancia", "3 éves raktérszigetelési garancia"],
    cargoEyebrow: "Minden kegyeleti feladatra",
    cargo: ["Koporsós szertartás", "Hamvasztásos szertartás", "Elhunyt szállítás", "Pompaautó szolgáltatás", "Koszorúszállítás"],
    cta: {
      title: "Válassza a méltó minőséget!",
      body: "Halottszállító és pompaautó átalakítás egyedi igényekre szabva – kérjen személyre szabott ajánlatot.",
    },
  },
  product: {
    eyebrow: "Termékünk",
    title: "Elhunyt szállító hűtőautó",
    lead: approach,
    howTitle: "Így készül",
    steps: [
      { title: "AT Strong® szigetelés", body: "Saját fejlesztésű hőszigetelés, amelyre Magyarországon egyedülállóan 3 év garanciát adunk." },
      { title: "Rozsdamentes bevonat", body: "Rozsdamentes vagy üvegszálas burkolat: higiénikus, mosható, esztétikus raktér." },
      { title: "Rejtett raktérhűtés", body: "A hűtőberendezés rejtve épül be, kánikulában is garantált +18 °C fokkal." },
      { title: "Koporsótálca és rögzítés", body: "Kihúzható koporsótálca, sínek és urnatartó – biztonságos, méltó szállítás." },
    ],
    compareEyebrow: "Miért rejtett hűtés?",
    compareTitle: "A hűtés ne látszódjon, csak működjön",
    driveLabel: "Látható, utólagos klíma",
    drive: ["Zajos, feltűnő kültéri egység", "Nehézkes tisztítás, toldozott burkolat"],
    ownLabel: "Rejtett raktérhűtés – Autotherm",
    own: [
      "Észrevétlen beépítés",
      "Kánikulában is garantált +18 °C",
      "Könnyen mosható, higiénikus raktér",
      "Műszaki tervdokumentáció és vizsgáztatás",
    ],
    closing: efficient,
    cta: {
      title: "Kíváncsi, melyik megoldás illik a szolgálatához?",
      body: "Kollégánk elmondja, hogyan alakítjuk át az Ön járművét halottszállítóvá.",
    },
  },
  builds: {
    eyebrow: "Halottas autók",
    title: "Elkészült átalakításaink képekben",
    lead: "Az alábbi halottszállító átalakításokat készítettük – Ford Transit, Ford Custom, Mercedes Vito és további típusok. Más típusban gondolkodik? Kérdezze kollégánkat.",
    cardBody: "Halottszállító átalakítás rejtett raktérhűtéssel, rozsdamentes bevonattal.",
    otherEyebrow: "Más típus?",
    otherTitle: individual,
    cta: { title: "Kérje árajánlatunkat most!", body: quoteBody },
  },
  quote: {
    eyebrow: "Ajánlatkérés",
    title: "Halottasautó árak",
    lead: "Gyors árajánlat egy pompaautó átalakítására! Az egyedi igények egyedi megoldásokat igényelnek – írja meg, milyen járműre és milyen kegyeleti feladathoz keres megoldást.",
    formTitle: "Ajánlatkérő űrlap",
    vehiclePlaceholder: "Pl. Ford Transit, Mercedes Vito",
  },
  footer: {
    tagline: "Halottszállító és pompaautó gyártás – az Autotherm Kft.-től, {year} óta a hűtőautók szakértőjétől.",
    mainSite: "Autotherm hűtőautók",
    menu: "Menü",
    navLabel: "Lábléc",
    rights: "minden jog fenntartva",
    terms: "ÁSZF",
    privacy: "Adatkezelés",
  },
};
