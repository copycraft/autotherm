import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };


export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4">
            <h1>Kik vagyunk?</h1>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Cégünk 1992-ben Autotherm Kft. néven alakult meg. Az alapítók, Csurgó László és Dkfm. Peter Knerer azzal a céllal hozták létre a társaságot, hogy a Carrier hűtőberendezéseket meghonosítsák az éledező magyar hűtős piacon. 1995-től a Thermo King hűtőberendezések javításait is felvállalva, Dél-Magyarország meghatározó hűtőgép szervize lettünk.</p>
            <p className="text-base leading-7 text-[#666] mb-6">Jelenleg 1500 m²-en, 4 üzemcsarnokban folyik a hűtőautók gyártása: kettőben a jármű felépítménygyártás és az utólagos szigetelés, egyben a vasanyagok megmunkálása, egyben pedig a raktérhűtő berendezések beépítése és szervizelése. 33 munkatársunk dolgozik nap mint nap azért, hogy ügyfeleinket elkápráztassuk munkánkkal és kiszolgálásunkkal.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>Mérföldköveink</h2>
          </div>
          <div className="relative border-l-4 border-[#4a68a9] ml-4 space-y-8 max-w-3xl mx-auto">
            {[
              { year: "1991", text: "Osztrák gyökerek — Csurgó László Ausztriában szerzett tapasztalatot a hűtőautós szakmában." },
              { year: "1992", text: "A magyar Carrier képviselet megalapítása. Megalakul az Autotherm Kft." },
              { year: "1995", text: "Thermo King képviselet — Magyarország meghatározó raktérhűtő szervize lettünk." },
              { year: "2007", text: "Ismét Carrier képviselet — ma Magyarországon mi adjuk el a legtöbb Carrier hűtőt 3,5 tonnás kategóriában." },
              { year: "2012", text: "Új telephely — tízszer annyi autó készülhet egyszerre, mint korábban." },
            ].map((m) => (
              <div key={m.year} className="ml-8 relative">
                <div className="absolute -left-[2.85rem] w-10 h-10 bg-[#4a68a9] rounded-full flex items-center justify-center text-white text-sm font-bold">{m.year}</div>
                <div className="p-6 border border-[#e0e0e0]">
                  <p className="font-bold text-[#4a68a9] mb-2">{m.year}</p>
                  <p className="text-[#666]">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>Gondolkodásmódunk</h2>
          </div>
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Napról napra jobbnak lenni abban, amit csinálunk. Minden nap olyan innovációkon dolgozni, amik gyorsabb gyártást és modernebb munkaeszközöket biztosítanak ügyfeleinknek. Ahogy Henry Ford mondta: &ldquo;Többet tenni a világért, mint amennyit a világ tesz érted - ez a siker.&rdquo;</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={600}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "3000+", label: "Ügyfél" },
              { number: "280", label: "Átalakítás évente" },
              { number: "33", label: "Munkatárs" },
              { number: "32", label: "Év tapasztalat" },
            ].map((s) => (
              <div key={s.label} className="text-center p-8 border border-[#e0e0e0]">
                <div className="text-4xl font-bold text-[#4a68a9] mb-2">{s.number}</div>
                <div className="text-[#999]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={750}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <h2 className="text-3xl font-bold mb-8">Kérje személyre szabott ajánlatunkat!</h2>
          <Link href="/hu/arajanlatkeres" className="button">Ajánlatkérés</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
