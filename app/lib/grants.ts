/**
 * EU / Széchenyi 2020 funded projects (GINOP), shown on the hidden grants page
 * that the corner infoblokk links to. Hungarian only - this is statutory
 * publicity for Hungarian funding. Text is the company's own, verbatim; it is
 * only split into paragraphs and lists for readability.
 */

export const GRANT_APPLICANT = "AUTOTHERM Kereskedelmi és Szolgáltató Kft.";

/** Supporting PDFs, hosted locally from /public/at-contents. */
const CONTENTS = "/at-contents";

export type GrantListItem = string | { lead: string; text: string };

export type GrantBlock =
  | { kind: "heading"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: GrantListItem[] };

export interface GrantDocument {
  label: string;
  href: string;
}

export interface Grant {
  /** Anchor id on the page. */
  slug: string;
  title: string;
  projectId: string;
  amount: string;
  rate: string;
  completed: string;
  summary: GrantBlock[];
  /** Headline publication, shown prominently. */
  publication?: GrantDocument;
  talk?: { title: string; body: string };
  documents?: GrantDocument[];
}

export const grants: Grant[] = [
  {
    slug: "vakuumasztal",
    title:
      "Szendvicspanel gyártó vákuumasztal beszerzése a kapacitásbővítés érdekében az Autotherm Kft-nél",
    projectId: "GINOP-1.2.2-15-2015-01034",
    amount: "12 050 000 Ft",
    rate: "50%",
    completed: "2016.08.31.",
    summary: [
      {
        kind: "p",
        text: "Az Autotherm Kft. a mai modern technológiájú hűtőautók rakterének szigetelését egy speciális hőszigetelési technológiával biztosítja, amely vákuumozási eljárás néven ismert. A vákuumozási technológia keretében készülnek a hűtőautók rakterét körülölelő panel elemek, amelyek a hőszigetelő anyagból és üvegszál fonalakkal összefont poliészter lemezből (ÜPE lemez) állnak.",
      },
      {
        kind: "p",
        text: "A hűtőautók rakterének szigetelésére több eljárás szolgál (például előre elkészült belső teret illesztenek a járműbe vagy folyékony, keményedő habot alkalmaznak), de ezt a speciális vákuumozási technológiát a raktérszigetelés terén Magyarországon egyedül az Autotherm Kft. alkalmazza. Ebből kifolyólag az eljáráshoz szükséges vákuumasztalt nem lehet a magyar piacon beszerezni, hanem a vállalati körülmények, termelési kapacitási igény valamint az aktuális gyártási technológia figyelembevételével lehet kérésre külön legyártani előre elkészített műszaki dokumentáció alapján, amelynek elkészítésére vonatkozóan már megtettük a szükséges lépéseket.",
      },
      {
        kind: "p",
        text: "Jelenleg az eszközparkunkban szerepel egy vákuumasztal, de műszaki specifikációit tekintve már nem alkalmas arra, hogy a termékpalettát bővítsük valamint a növekvő számú megrendeléseket hatékonyan, rövid időn belül és magas minőségben teljesítsük. Ennek az akadályozó tényezőnek a leküzdése érdekében már megtettük az első lépést, ugyanis 2015-ben a korábbi 700 négyzetméteres telephelyét 1500 négyzetméterre bővítettük. A következő szint a magasabb műszaki specifikációval rendelkező vákuumasztal beszerzése, amely lehetővé teszi a cég profiljának bővítését a 3,5 tonna feletti hűtős járművek piaca felé valamint képesek leszünk a panelelemekből előre gyártott dobozos felépítményeket és egyedi felépítményeket is gyártani, amelyre a jelenlegi eszközparkkal nincs lehetőség.",
      },
      {
        kind: "p",
        text: "A GINOP-1.2.2-15 kódszámú kiírás keretében beszerezni kívánt vákuumasztal (1db) mellett programozásra fog kerülni egy egyedi szoftver, amit az asztalhoz szervesen csatlakoztatott laptopon keresztül lehet futtatni. A vákuumasztal működtetése biztosított, ugyanis az Autotherm Kft. 5 munkavállalója rendelkezik az ehhez szükséges szakértelemmel.",
      },
      {
        kind: "p",
        text: "Az eszközparkunk bővítésével megnyílik számunkra a lehetőség, hogy olyan körülményeket teremtsünk a raktérszigetelés piacán, amelyek hozzájárulnak versenyképességünk megőrzéséhez és javításához. Ezt a célt a portfólió bővítésével, a technológiai idők lerövidítésével, a termelékenység javításával, a hozzáadott érték növelésével és minőségi előrelépéssel tervezzük elérni. Emellett a projekt keretében 2 új munkavállaló felvétele valósul meg.",
      },
    ],
  },
  {
    slug: "flexicold",
    title: "FlexiCold – új generációs szabályozott hőmérsékletű járműfelépítmények",
    projectId: "GINOP-2.1.7-15-2016-00674",
    amount: "27 142 650 Ft",
    rate: "65,89%",
    completed: "2019.05.31.",
    summary: [
      { kind: "heading", text: "Alakos ajtótömítő gumicsík végtelenítési technológia" },
      {
        kind: "p",
        text: "A vevői igények továbbá a kitűzött export szakmai színvonal megköveteli, hogy képesek legyünk a plusszos és a minuszos szállításra alkalmas homogén gumi anyagú tömítések végtelenítését elvégezni a következőképpen:",
      },
      {
        kind: "list",
        items: [
          "hogy az alapanyag szilárdságát legalább 75%-os mértékben érjük el,",
          "hogy a tömítések előgyártása az ajtótól függetlenül megtörténhessen.",
        ],
      },
      {
        kind: "p",
        text: "Ezek a követelmények az alábbi részfeladatok teljesülésén keresztül valósulhatnak meg:",
      },
      { kind: "subheading", text: "Alakos gumicsík 45 fokos szabásának technológiája" },
      {
        kind: "p",
        text: "A beépítésre kerülő gumitömítések az esetek 99%-ban 90 fokos törésekkel rendelkező ajtókba kerülnek elhelyezésre. Ehhez gérben kell elvágni a gumicsíkot két 45 fokos illeszkedő részre. A vágási technológia nehézségét az adja, hogy a gumicsík nem egy egyszerű „csík”, hanem a tér mindhárom dimenziójában kiterjed, a keresztmetszete leginkább egy kínai írásjelre emlékeztet. A vágási eljárásnak pontosnak és ismételhetőnek kell lennie, ahhoz, hogy az illesztések tökéletesen és időtálló módon működjenek.",
      },
      { kind: "subheading", text: "A vágáshoz szükséges szerszámok tervezése, elkészítése" },
      {
        kind: "p",
        text: "A vágási eljárás kidolgozása után a vágáshoz szükséges szerszámot kell megterveznünk. Minden vágásnak egyformának kell lennie, a gumicsík állékonysága miatt pedig figyelembe kell vennünk a vágás során fellépő alaktorzulás körülményeit is, amely kihat az illesztések pontosságára és a kötések tartósságára.",
      },
      { kind: "subheading", text: "Saját anyagú, meleg eljárásos vulkanizálási technológia kidolgozása" },
      {
        kind: "p",
        text: "A gumicsík illesztése és rögzítése jelenleg ragasztási technológiával történik. Ez idegen anyagot jelent, ami másképp „fárad”, mint a gumicsík, különösen a cianoakrilát ragasztók (pillanatragasztó) esetében. A magyar piacon a „pillanatragasztós eljárás” az elterjedt, ami nagyon gyenge minőséget eredményez. Egy több millió forintos járműfelépítmény gyakorlatilag használhatatlanná válik 1-2 hónap alatt a filléres megoldás miatt. Az új technológia segítségével a gumicsíkot saját anyagával vulkanizálva illesztjük össze, ezzel kizárva az anyagfáradásból adódó rongálódást.",
      },
      { kind: "subheading", text: "A vulkanizáláshoz szükséges berendezések tervezése, elkészítése" },
      {
        kind: "p",
        text: "A vulkanizáláshoz a speciális forma esetében ki kell dolgoznunk a megfelelő minőséget biztosító eljárást és a szükséges szerszámot az igényeknek megfelelően kell előállítanunk.",
      },
      { kind: "subheading", text: "Fárasztásos vizsgálatok elvégzése" },
      {
        kind: "p",
        text: "A prototípus terméket fárasztásos vizsgálatnak vetjük alá, élethűen szimulálva a mindennapi használatot. Az így nyert tapasztalatokat visszacsatoljuk a fejlesztési eljárás korábbi lépéseibe.",
      },
      {
        kind: "subheading",
        text: "A komplett tömítésgyártó munkahely kialakítása és a képzési dokumentáció elkészítése",
      },
      {
        kind: "p",
        text: "Kidolgozzuk a tömítésgyártási eljárás részleteit, a szükséges speciális tudásanyagot dokumentáljuk.",
      },
      { kind: "heading", text: "Kettősfunkciójú, nagy hiszterézisű hőmérséklet szabályzó berendezés" },
      {
        kind: "p",
        text: "A fejlesztési munka végén egy hőmérséklet szabályzó berendezést kapunk, amely alkalmas a kis hőtehetetlenségű terek működtetésére. Ezek a követelmények az alábbi részfeladatok teljesülésén keresztül valósulhatnak meg:",
      },
      {
        kind: "list",
        items: [
          {
            lead: "Ki kell dolgozni egy, a fenti követelményeket teljesítő mérési elvet",
            text: "A hűtő és fűtő berendezése közös irányításához meg kell határoznunk azt a hőmérséklet tartományt és hiszterézis szintet, amely mellett az eszköznek üzemelnie kell.",
          },
          {
            lead: "Meg kell tervezni az áramkört",
            text: "A vezérlő berendezésben egyedi tervezésű áramkör lesz beépítve. Mivel ezt a problémát még sehol nem kezelték a hűtős szakmában ezért ránk hárul a feladat, hogy az innovációs feladatokat elvégezzük.",
          },
          {
            lead: "Prototípus gyártás",
            text: "Az elkészült áramköri terveknek megfelelően be kell szerezni az alkatrészeket és össze kell állítani a kísérleti berendezést.",
          },
          {
            lead: "Tesztüzem",
            text: "El kell végezni a kísérleti berendezés próbaüzemét. A mérési eredmények alapján át kell vezetni a szükséges változtatásokat a prototípuson.",
          },
          {
            lead: "Ergonómiai tervezés",
            text: "El kell végezni a gyárthatóság járulékos feladatait, „nyák”, tokozás, beépíthetőség, kezelhetőség kidolgozása.",
          },
          {
            lead: "Dokumentáció elkészítése",
            text: "El kell készíteni a létrejött berendezés dokumentációját, beépítési-, kezelési utasítását.",
          },
        ],
      },
    ],
    publication: {
      label: "A pályázat tudományos eredményének publikációja",
      href: `${CONTENTS}/Publikacio_Autotherm-Kft_GINOP-2.1.7-15-2016-00674.pdf`,
    },
    talk: {
      title: "Autotherm – Lépés a jövő felé – kerekasztal beszélgetés és előadás",
      body: "A kereskedelmi hűtős szállítmányozás számára kiemelkedő kihívásként jelenik meg a szabályozott raktér és szállítmány hőmérsékletek elérése, fenntartása és rögzítése. A klímaváltozás, a környezeti hőmérséklet gyors növekedése és csökkenése olyan új kihívások elé állítja a szakembereket, amire az elmúlt fél évszázadban nem volt példa. Erre a kihívásra keres választ, illetve tesz fel kérdéseket előadásában Csurgó László járműmérnök, az Autotherm Kft. nyugdíjas alapítója. Előadásában bemutatja a cég GINOP-2.1.7-15-2016-00674 pályázat keretében fejlesztett adaptív hőmérséklet szabályzó technológiáját, valamint a „hűtős” szakma elismert szakembereivel beszélget arról, hogy a piacot ma uraló nagy gyártók, hogyan vélekednek erről a kérdésről.",
    },
    documents: [
      {
        label: "Kettősfunkciójú, nagy hiszterézisű hőmérséklet szabályzó berendezés",
        href: `${CONTENTS}/Kettosfunkcioju-nagy-hiszterezisu-homerseklet-szabalyzo-berendezes.pdf`,
      },
      {
        label: "Waeco prezentáció",
        href: `${CONTENTS}/Waeco-presentation-_202203.pdf`,
      },
      {
        label: "Alkalmazkodó Járműhűtés Zanotti – Autotherm ismertető beszélgetés",
        href: `${CONTENTS}/Alkalmazkodo-Jarmuhutes-Zanotti-Autotherm-ismerteto-beszelgetes-20220214.pdf`,
      },
    ],
  },
  {
    slug: "informatikai-fejlesztes",
    title: "Informatikai fejlesztés az Autotherm Kft-nél",
    projectId: "GINOP-3.2.2-8-2-4-16-2017-00330",
    amount: "7 616 000 Ft",
    rate: "40%",
    completed: "2018.03.22.",
    summary: [
      {
        kind: "p",
        text: "A vállalatirányítási rendszer beszerzése projektünk központi eleme. A rendszer segítségével szeretnénk a vállalkozásunk hatékonyságát 21. századi szintre emelni, ezzel javítva versenyképességünket, nem csak a hazai, hanem a nemzetközi piacon is. A piaci helyzetünk javulása várhatóan további munkahelyteremtést fog maga után vonni, illetve stabilizálja a vállalkozás jövedelmezőségét.",
      },
      {
        kind: "p",
        text: "Maga a vállalatirányítási rendszer egy kifejezetten összetett, több modulból álló konstrukció. A projekt során egy 20 modulból álló, a pályázat 12 célterületét érintő szoftver kerül beszerzésre. A projekt további eleme a vállalati portál kialakítása, ami megfelelően tud kommunikálni a vállalatirányítási rendszerrel.",
      },
    ],
  },
];
