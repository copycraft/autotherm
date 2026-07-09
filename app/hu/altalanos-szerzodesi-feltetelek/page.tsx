import type { Metadata } from "next";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import { getPageMeta } from "@/app/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("hu", "/hu/altalanos-szerzodesi-feltetelek").title,
    description: getPageMeta("hu", "/hu/altalanos-szerzodesi-feltetelek").description,
    keywords: getPageMeta("hu", "/hu/altalanos-szerzodesi-feltetelek").keywords,
  };
}

const sections = [
  {
    title: "1. Általános rendelkezések",
    content: [
      "Jelen Általános Szerződési Feltételek (a továbbiakban: ÁSZF) hatálya az AUTOTHERM Kereskedelmi és Szolgáltató Kft. (a továbbiakban: Vállalkozó) által elvégzendő munkákra, illetőleg az általa nyújtott szolgáltatások igénybevételére szerződő megrendelő (a továbbiakban: Megrendelő) között létrejövő jogviszonyokra, szerződésekre (a továbbiakban: szerződés) terjed ki.",
      "Jelen ÁSZF kiterjed minden olyan szerződésre, amely a Vállalkozó és a Megrendelő között akár írásban, szóban vagy e-mailben jön létre. A Felek között létrejön a szerződés abban az esetben is, ha a Vállalkozó által adott ajánlatot a Megrendelő elfogadja, a Vállalkozótól a munkát megrendeli, a szolgáltatását igénybe veszi.",
      "A Megrendelő a jelen ÁSZF tartalmát a Felek közötti szerződés létrejöttével kifejezetten elfogadja és kijelenti, hogy a megrendelés előtt az ÁSZF tartalmát megismerte. A Megrendelő tudomásul veszi, hogy a jelen ÁSZF a Vállalkozóval létrejövő szerződés részét képezi.",
      "Amennyiben a Felek között olyan egyedi szerződés jön létre, amely a jelen ÁSZF-től eltér, úgy az eltérő rendelkezések vonatkozásában az egyedi szerződési feltételek az irányadóak.",
      "A Vállalkozó az egyedi szerződéseit kizárólag írásban köti, amelyek érvényesen csak írásban módosíthatóak.",
      "A Vállalkozó kizárja a Megrendelő általános beszerzési feltételeit. A Megrendelő esetleges általános szerződési feltételei csak akkor alkalmazhatók a jelen ÁSZF hatálya alá tartozó jogviszonyokra, ha azokat a Vállalkozó kifejezetten írásban elismeri.",
    ],
  },
  {
    title: "2. Ajánlat",
    content: [
      "A Vállalkozó a Megrendelővel való egyeztetést követően – eltérő megállapodás hiányában – árajánlatot készít, mely tartalmazza az adásvétel tárgyát, annak műszaki tartalmát (műszaki leírás), a vételárat, a fizetési feltételeket, a szállítási határidőt és a szerződéskötéshez szükséges egyéb elemeket.",
      "A Vállalkozó által kibocsátott Árajánlat az azon feltüntetett időpontig érvényes.",
      "A Vállalkozó a HUF-ban számított, 5%-ot meghaladó alapanyag/árfolyamváltozásból fakadó árnövekedés esetén jogosult az ajánlat visszavonására.",
      "Az interneten, prospektusokban, vagy bármilyen reklámanyagban megjelenő hirdetések nem minősülnek ajánlattételnek és így nem kötelező érvényűek a Vállalkozóra nézve, amennyiben nem kerül kifejezetten az ajánlati kötöttség meghatározásra.",
    ],
  },
  {
    title: "3. Szerződés létrejötte",
    content: [
      "A Vállalkozó és a Megrendelő között a szerződés külön írásba foglalással, vagy a Vállalkozóhoz érkezett írásos megrendelésnek a Vállalkozó által történő írásos visszaigazolásával jön létre.",
      "A Megrendelő megrendelésbe foglalt vagy a Vállalkozóval egyéb módon közölt vásárlási feltételei csak abban az esetben képezik részét a felek közötti szerződésnek, ha a Vállalkozó azokat írásban elfogadta.",
      "A Megrendeléssel a Vállalkozónak és a Megrendelőnek a megrendelés tárgyában korábban tett nyilatkozatai a hatályukat vesztik.",
      "Amennyiben a Megrendelő a megrendelés írásbeli visszaigazolását követően visszavonja a megrendelést, úgy Vállalkozó jogosult a felmerült kárát érvényesíteni a Megrendelővel szemben.",
    ],
  },
  {
    title: "4. Szerződés módosítása",
    content: [
      "Felek a Szerződésben foglaltakat csak közös megegyezéssel, írásban módosíthatják. Szerződésmódosításnak számít az elfogadott műszaki leírás szerinti kivitelhez képest a Megrendelő által igényelt bármely változtatás is.",
      "Szerződésmódosításnak minősül az elfogadott műszaki leírás szerinti kivitelhez képest a Megrendelő által igényelt bármely változtatás (pótmunka).",
      "A Vállalkozó a vállalkozás időtartam alatt fenntartja magának a nem jelentős mértékű konstrukciós és formai változtatások jogát.",
    ],
  },
  {
    title: "5. Szállítási határidő",
    content: [
      "A szállítási határidő egyénileg kerül meghatározásra, ill. a megrendelés visszaigazolásakor került meghatározásra.",
      "A szállítási határidők – amennyiben nem kerültek kifejezetten fix határidőként kikötésre – tájékoztató jelleggel kerülnek megadásra.",
      "Vevő tudomásul veszi, hogy az előleg a Vállalkozó bankszámláján történő jóváírásának időpontja előtt nem kezdi meg a gyártási folyamatot.",
    ],
  },
  {
    title: "6. Átadás-átvétel",
    content: [
      "Az átadás-átvétel időpontja a Vállalkozó által írásban megadott határnap.",
      "Amennyiben előzetesen eltérő megállapodás nem születik, az átadás-átvételre a Vállalkozó 6728 Szeged, Lencsés utca 1. cím alatti telephelyén hétköznap 08:00-17:00 óra között történik.",
      "A Megrendelő az átadás-átvételi határnaptól számított legfeljebb 14. napig normál átadás-átvételre jogosult, a határnapot követő 15. naptól átvételi késedelembe esik.",
    ],
  },
  {
    title: "7. A Megrendelő jogai és kötelezettségei",
    content: [
      "Megrendelő ellenkező megállapodás hiányában köteles a gépjárműv(ek)et a Vállalkozó 6728 Szeged, Lencsés utca 1. szám alatti telephelyére leszállítani és a Vállalkozó részére átadni.",
      "Megrendelő köteles a vállalkozói díjat határidőben megfizetni.",
      "Megrendelő kijelenti, hogy a Vállalkozónak átadott gépjármű(vek) felett jogosult rendelkezni.",
      "Megrendelő a Vállalkozó tevékenységét a Vállalkozó tevékenységének zavarása nélkül jogosult ellenőrizni.",
    ],
  },
  {
    title: "8. A Vállalkozó jogai és kötelezettségei",
    content: [
      "Vállalkozó köteles a rábízott munkát a legjobb tudása szerint, lelkiismeretesen, a szakma szabályai szerint, gazdaságosan és határidőben elvégezni.",
      "Vállalkozó kijelenti, hogy a vállalkozás ellátásához a megfelelő ismeretekkel, szaktudással és eszközállománnyal rendelkezik.",
      "Vállalkozó jogosult a munka elvégzéséhez alvállalkozót igénybe venni.",
      "Vállalkozó jogosult az általa átvett gépjárműv(ek)et a munka elvégzéséhez szükséges mértékben mozgatni, illetve a szabadban tárolni.",
    ],
  },
  {
    title: "9. Jótállás és szavatosság",
    content: [
      "A Vállalkozó az AUTOTHERM gyártmányú zárt furgon típusú, vagy dobozos felépítmények és különleges gépjárművek szigetelését és burkolatát alkotó szendvicspanel, valamint műanyag padló anyagának és kivitelezésének hibátlanságáért 250.000 km futásteljesítményig, de legfeljebb 3 évig vállal jótállást.",
      "A Vállalkozó által kivitelezett Carrier típusú hűtő berendezéssel ellátott különleges gépjárművek esetén a garancia időtartalma a gyártó által meghatározott 1 év.",
      "A javítási munkákért a Vállalkozó 6 hónapig vállal jótállást.",
      "A jótállási igények érvényesítésének előfeltétele, hogy a Megrendelő teljes körűen betartsa a Vállalkozó összes előírását a mű kezelésére vonatkozóan.",
    ],
  },
  {
    title: "10. Fizetési feltételek",
    content: [
      "Megrendelő az elvégzett munkáért a szerződésben rögzített mértékű vállalkozói díjat köteles fizetni a Vállalkozónak, a szerződésben rögzített fizetési feltételek szerint.",
      "A vállalkozói díjat, ellenkező megállapodás hiányában, a gépjármű(vek) átadás-átvételét követően, a szabályszerűen kiállított végszámla alapján, átutalással kell a Megrendelőnek megfizetnie.",
      "A Megrendelő a fizetési késedelme esetén a Ptk. 6:155. § szerinti késedelmi kamat fizetésére köteles.",
      "Vállalkozó a vállalkozói díj teljes kiegyenlítéséig az általa értékesített ingóság, illetve a beépített alkatrészek, berendezések vonatkozásában a tulajdonjogát fenntartja.",
    ],
  },
  {
    title: "11. Szerződés megszűnése, elállás",
    content: [
      "Bármelyik Fél jogosult a másik Félhez intézett egyoldalú nyilatkozattal a szerződéstől elállni, azt felmondani, ha a másik Fél a szerződésből eredő kötelezettségeit súlyosan megszegi.",
      "A Vállalkozó jogosult a szerződéstől egyoldalúan, indoklás nélkül elállni, amennyiben a Megrendelő az előleget határidőben nem fizeti meg részére.",
      "Elállás vagy felmondás esetén a Megrendelő köteles a Vállalkozónak a vállalkozói díj arányos részét megfizetni és a szerződés megszüntetésével okozott kárát megtéríteni.",
    ],
  },
  {
    title: "12. Adatkezelés",
    content: [
      "A Megrendelő hozzájárul ahhoz, hogy minden őt érintő személyes adat, amelyet a Vállalkozó a szerződéses kapcsolat keretein belül gyűjt, feldolgozásra, továbbításra és tárolásra kerüljön.",
      "Az adatfeldolgozás és továbbítás célja a megbízások lebonyolítása.",
      "Megrendelő jogosult arra, hogy kérésére a Vállalkozó helyesbítse, törölje a rá vonatkozó személyes adatokat, ill. korlátozza az adatkezelést.",
    ],
  },
  {
    title: "13. Vegyes rendelkezések",
    content: [
      "A szerződés megkötésével a Megrendelő hozzájárul, hogy az elkészült munkáról készült fényképet/videót, illetve rövid tájékoztató jellegű leírást a Vállalkozó a saját honlapján közzé tegye.",
      "A Vállalkozó a gépjárművek külső felületén az AUTOTHERM saját emblémájával ellátott matricát helyezhet el.",
      "Felek a szerződésből eredő esetleges vitáikat megpróbálják egymás között peren kívül, békés úton rendezni. Ennek sikertelensége esetén a Szegedi Járásbíróság, illetve a Szegedi Törvényszék kizárólagos illetékességének vetik alá magukat.",
      "Jelen ÁSZF magyar nyelven készült, bármely idegen nyelvre történő fordítás esetén a magyar nyelvű változat az irányadó.",
    ],
  },
];

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs03.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Általános Szerződési Feltételek</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1 max-w-4xl mx-auto">
            {sections.map((section, i) => (
              <div key={i} className="mb-10">
                <h2 className="text-xl font-bold mt-8 mb-4 text-[#4a68a9]">{section.title}</h2>
                {section.content.map((p, j) => (
                  <p key={j} className="text-base leading-7 text-[#666] mb-4">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
