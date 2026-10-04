import type { EcoDict } from "./types";

const quoteBody = "Elektromos hűtőautó önellátó hűtőegységgel!";
const pickupBody =
  "Vegye igénybe járművének átvételi és visszaküldési ajánlatunkat egy átfogó és gondtalan szolgáltatáshoz!";
const individual = "Az egyedi igények egyedi megoldásokat igényelnek.";
const tagline = "A jövő zöld vagy semmilyen.";
const approach =
  "A hatótávolság megtartásának érdekében 6 m³ rakterű furgonok esetében mi egy önellátó, saját, ciklikus töltésű akkupakkal rendelkező hűtőegység mellett tettük le a voksunkat.";
const efficient =
  "Az elektromos furgon hatótávolságának kiszámíthatósága és a biztonságos hűtés mellett, a garanciális hűtős átalakítások teszik igazán hatékonnyá az általunk átalakított elektromos hűtős járműveket.";

export const hu: EcoDict = {
  nav: {
    home: "Főoldal",
    why: "Miért elektromos?",
    technology: "Technológia",
    vehicles: "Járművek",
    quote: "Árajánlatkérés",
  },
  seo: {
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
  contactRole: "Értékesítés – elektromos hűtőautók",
  pickup: { title: "Átvétel és visszaküldés", body: pickupBody },
  hero: {
    eyebrow: "Autotherm · Elektromos hűtőautók",
    title: "Elektromos hűtőautó",
    tagline,
    lead: "Az elektromos meghajtású haszongépjárművek piaca gyorsan növekszik. Mi az Autotherm-nél azon dolgozunk, hogy azonosítsuk az ügyfeleink számára legjobb megoldást fejlesztések és új technológiák bevezetésével.",
    howItWorks: "Hogyan működik?",
    points: ["Emissziómentes és csendes", "Változatlan hatótáv", "Önellátó akkupakk"],
  },
  home: {
    introEyebrow: "Személyre szabott elektromos hűtőautók",
    introTitle: individual,
    introLead: "Frissáruszállító hűtőautó átalakítások önellátó hűtőegységgel.",
    introBody: [
      `Hűtőautó gyártó cégként az Autotherm Kft. is az elektromos meghajtású furgonokban látja a jövőt. ${approach}`,
      efficient,
    ],
    introLink: "Így működik a technológia",
    contactEyebrow: "Személyes tanácsadás",
    contactTitle: "Más típusban gondolkodik? Kérdezze kollégánkat.",
    cta: {
      title: "Kérje árajánlatunkat most!",
      body: "Elektromos hűtőautó önellátó hűtőegységgel! Vegye igénybe járművének átvételi és visszaküldési ajánlatunkat egy átfogó és gondtalan szolgáltatáshoz.",
    },
  },
  features: [
    { title: "Önellátó akkupakk", body: "A hűtőegység saját akkumulátorról működik, nem a jármű hajtóakkujáról." },
    { title: "Változatlan hatótáv", body: "Mivel a hűtés nem a hajtóakkuból fogyaszt, a furgon hatótávja nem csökken." },
    { title: "Ciklikus töltésű akkupakk", body: "Az akkupakk ciklikusan töltődik, így a hűtés folyamatosan rendelkezésre áll." },
    { title: "Akkis + hálózati hűtő", body: "Akkumulátorról és elektromos hálózatról is üzemeltethető." },
    { title: "Hosszú hűtési üzemidő", body: "Pár órán belül feltölthető, és hosszú hűtési üzemidővel rendelkezik." },
    { title: "Emissziómentes és csendes", body: "Nincs kipufogógáz és motorzaj – ideális a belvárosi kiszállításhoz." },
    { title: "Kiszámítható és biztonságos", body: "Kiszámítható hatótáv és biztonságos hűtés minden fuvaron." },
    { title: "Garanciális és megbízható", body: "Garanciális hűtős átalakítás az Autotherm-től, 1992 óta a hűtőautók szakértőjétől." },
  ],
  case: {
    title: "Alternatíva az elektromos hűtőautó? Egyértelműen: IGEN!",
    body: [
      "Az előnyök nyilvánvalóak: Az elektromos hűtős furgonok emissziómentesek, csendesek és jót tesznek a cég arculatának és zsebének. A friss termékek logisztikájának azonban mindenekelőtt két dologra van szüksége: Megbízhatóságra a hőmérséklet-szabályozásban és a hatótávolság maximális kihasználására.",
      "Az elektromos hűtőautók különösen alkalmasak a belváros forgalomban vagy a nagyvárosokból a környező területekre való kiszállításokhoz. Függetlenül attól, hogy húst, süteményt, gyümölcsöt, zöldséget vagy más hűtött ételt szállít, egy elektromos hűtős furgonnal ugyanolyan jó hűtési teljesítményt érhet el, mint a szokásos szigetelt dobozos kisteherautóknál. Az elektromos hűtőautók pár órán belül feltölthetőek és hosszú hűtési üzemidővel rendelkeznek.",
      "Az önálló akkupakkal rendelkező hűtőegység előnye pedig azt jelenti, hogy a hűtési láncolat akár egy álló jármű esetében sem szakad meg, mert az egység tovább működik – mindez hatótávolság csökkenés nélkül!",
    ],
  },
  strip: {
    eyebrow: "Átalakítható típusok",
    title: "Elektromos furgonok, amelyeket hűtőautóvá alakítunk",
    cta: "Minden jármű",
  },
  why: {
    eyebrow: "Miért elektromos?",
    title: tagline,
    lead: "A friss élelmiszerek logisztikája számos új kihívással néz szembe: a dízelüzemű járművek korlátozása és a városokban növekvő zaj és légszennyezés új megoldásokat igényel, például elektromos meghajtású kisteherautókat.",
    logisticsEyebrow: "Változó városi logisztika",
    logistics: [
      "Egyre nagyobb a kereslet a friss élelmiszerek iránt, az ellátási láncok összetettebbé váltak, és egyre több embernek szállítanak termékeket az otthonukba – a hatékony logisztika szerepe is egyre fontosabbá válik.",
      "A belső égésű motoroknak megjelentek az alternatívái: Egyre több gyártó kínál elektromos meghajtású haszongépjárműveket.",
    ],
    quote: "De mennyire praktikusak a piacon elérhető járművek? Gazdaságosak-e egyáltalán?",
    benefitsTitle: "Az előnyök nyilvánvalóak",
    benefits: [
      { title: "Emissziómentes", body: "Helyi károsanyag-kibocsátás nélkül közlekedik – ott is, ahol a dízeleket korlátozzák." },
      { title: "Csendes", body: "Halk működés a belvárosi és a korai vagy késő esti kiszállításokhoz." },
      { title: "Jót tesz az arculatnak", body: "A zöld flotta erős üzenet a partnereknek és a vásárlóknak." },
      { title: "Jót tesz a zsebnek", body: "Az elektromos hűtős furgon a cég pénztárcájának is kedvez." },
    ],
    bestEyebrow: "Ahol a legjobban kihasználható",
    best: ["Belvárosi forgalom", "Kiszállítás a nagyvárosokból a környező területekre"],
    cargoEyebrow: "Bármilyen hűtött áruhoz",
    cargo: ["Hús", "Sütemény", "Gyümölcs", "Zöldség", "Egyéb hűtött élelmiszer"],
    cta: {
      title: "Váltson zöldre a hűtött szállításban!",
      body: "Elektromos hűtőautó önellátó hűtőegységgel – kérjen személyre szabott ajánlatot.",
    },
  },
  technology: {
    eyebrow: "Technológia",
    title: "Önellátó hűtőegység saját akkupakkal",
    lead: approach,
    howTitle: "Így működik",
    steps: [
      { title: "Saját akkupakk", body: "A hűtőegységet egy önálló, saját akkumulátorcsomag táplálja – nem a jármű hajtóakkuja." },
      { title: "Ciklikus töltés", body: "Az akkupakk ciklikusan töltődik, és akár hálózatról is üzemeltethető: akkis + hálózati hűtő." },
      { title: "Hűtés álló járműnél is", body: "A hűtési láncolat akkor sem szakad meg, ha a jármű áll – az egység tovább működik." },
      { title: "Változatlan hatótáv", body: "Mivel a hűtés nem a hajtóakkuból fogyaszt, a furgon hatótávja kiszámítható marad." },
    ],
    compareEyebrow: "Miért nem a hajtóakkuról?",
    compareTitle: "A hűtés ne a hatótávot fogyassza",
    driveLabel: "Hűtés a hajtóakkuról",
    drive: ["A hűtés energiája a jármű hatótávjából fogy", "A napi útvonal kevésbé tervezhető"],
    ownLabel: "Önellátó akkupakkal – Autotherm",
    own: [
      "Változatlan hatótáv",
      "A hűtési lánc álló járműnél sem szakad meg",
      "Akkumulátorról és hálózatról is működik",
      "Pár órán belül feltölthető, hosszú hűtési üzemidő",
    ],
    closing: efficient,
    cta: {
      title: "Kíváncsi, melyik megoldás illik a flottájához?",
      body: "Kollégánk elmondja, hogyan alakítjuk át az Ön elektromos furgonját hűtőautóvá.",
    },
  },
  vehicles: {
    eyebrow: "Járművek",
    title: "Átalakítható elektromos furgonok",
    lead: "Az alábbi elektromos kisteherautókat alakítjuk hűtőautóvá önellátó hűtőegységgel. Más típusban gondolkodik? Kérdezze kollégánkat.",
    cardBody: "Hűtős átalakítás önellátó, saját akkupakkal rendelkező hűtőegységgel.",
    otherEyebrow: "Más típus?",
    otherTitle: individual,
    cta: { title: "Kérje árajánlatunkat most!", body: quoteBody },
  },
  quote: {
    eyebrow: "Árajánlatkérés",
    title: "Kérje árajánlatunkat most!",
    lead: "Elektromos hűtőautó önellátó hűtőegységgel! Az egyedi igények egyedi megoldásokat igényelnek – írja meg, milyen járműre és milyen hűtött áruhoz keres megoldást.",
    formTitle: "Ajánlatkérő űrlap",
    vehiclePlaceholder: "Pl. Citroën ë-Berlingo, Kia PV5 Cargo",
  },
  footer: {
    tagline: "Elektromos hűtőautók önellátó hűtőegységgel – az Autotherm Kft.-től, {year} óta a hűtőautók szakértőjétől.",
    mainSite: "Autotherm hűtőautók",
    menu: "Menü",
    navLabel: "Lábléc",
    rights: "minden jog fenntartva",
    terms: "ÁSZF",
    privacy: "Adatkezelés",
  },
};
