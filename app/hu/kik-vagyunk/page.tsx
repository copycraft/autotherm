import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import { STATS, yearsSince } from "@/app/lib/constants";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("hu", "/hu/kik-vagyunk").title,
    description: getPageMeta("hu", "/hu/kik-vagyunk").description,
    keywords: getPageMeta("hu", "/hu/kik-vagyunk").keywords,
  };
}

export default async function Page() {
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
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="max-w-3xl">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-[var(--primary)] mb-3">Történetünk</p>
            <h2 className="mb-8">1992-ben indultunk, mára a régió meghatározó szereplői vagyunk</h2>
          </div>
          <p className="text-[var(--gray-600)] mb-6 max-w-3xl">Csurgó László és Peter Knerer azzal a céllal alapították az Autotherm Kft.-t, hogy a Carrier hűtőberendezéseket meghonosítsák a magyar piacon. 1995-től a Thermo King szerviz is a portfóliónk része lett — mára Dél-Magyarország meghatározó raktérhűtő szervize vagyunk.</p>
          <p className="text-[var(--gray-600)] mb-6 max-w-3xl">A szegedi telephelyünkön 1500 m²-en, 4 üzemcsarnokban zajlik a munka: járműfelépítmény-gyártás, utólagos szigetelés, vasanyag-megmunkálás és raktérhűtő berendezések beépítése. 33 szakemberünk nap mint nap azon dolgozik, hogy ügyfeleink a legjobb minőséget kapják.</p>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section gray-bg">
        <div className="wrap-column">
          <div className="content-section-heading">
            <p className="content-section-subtitle">Történet</p>
            <h2>Mérföldköveink</h2>
          </div>
          <div className="relative border-l-4 border-[var(--primary)] ml-4 space-y-8 max-w-3xl mx-auto">
            {[
              { year: "1991", text: "Osztrák gyökerek — Csurgó László Ausztriában szerzett tapasztalatot a hűtőautós szakmában." },
              { year: "1992", text: "A magyar Carrier képviselet megalapítása. Megalakul az Autotherm Kft." },
              { year: "1995", text: "Thermo King képviselet — Magyarország meghatározó raktérhűtő szervize lettünk." },
              { year: "2007", text: "Ismét Carrier képviselet — ma Magyarországon mi adjuk el a legtöbb Carrier hűtőt 3,5 tonnás kategóriában." },
              { year: "2012", text: "Új telephely — tízszer annyi autó készülhet egyszerre, mint korábban." },
            ].map((m) => (
              <div key={m.year} className="ml-8 relative">
                <div className="absolute -left-[2.85rem] w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-xs font-bold">{m.year}</div>
                <div className="p-6 bg-white rounded-xl border border-[var(--gray-200)] shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--primary)] mb-2">{m.year}</p>
                  <p className="text-[var(--gray-600)]">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="content-section-heading">
            <p className="content-section-subtitle">Filozófia</p>
            <h2>Gondolkodásmódunk</h2>
          </div>
          <p className="text-[var(--gray-600)] mb-6 max-w-2xl mx-auto text-center text-lg leading-relaxed">Napról napra jobbnak lenni abban, amit csinálunk. Ahogy Henry Ford mondta: &ldquo;Többet tenni a világért, mint amennyit a világ tesz érted — ez a siker.&rdquo;</p>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={600}>
      <section className="content-section gray-bg align-center">
        <div className="wrap-column">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: `${STATS.customers}+`, label: "Ügyfél" },
              { number: String(STATS.annualConversions), label: "Átalakítás évente" },
              { number: String(STATS.employees), label: "Szakember" },
              { number: String(yearsSince()), label: "Év tapasztalat" },
            ].map((s) => (
              <div key={s.label} className="text-center p-8 bg-white rounded-xl border border-[var(--gray-200)] shadow-sm">
                <div className="text-4xl font-extralight text-[var(--primary)] mb-2">{s.number}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--gray-400)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={750}>
      <section className="content-section white-bg align-center">
        <div className="wrap-column">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-[var(--primary)] mb-3">Lépjen kapcsolatba</p>
          <h2 className="mb-8">Kérje személyre szabott ajánlatunkat!</h2>
          <Link href="/hu/arajanlatkeres" className="button">Ajánlatkérés</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
