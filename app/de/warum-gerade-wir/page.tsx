import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import { yearsSince } from "@/app/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("de", "/de/warum-gerade-wir").title,
    description: getPageMeta("de", "/de/warum-gerade-wir").description,
    keywords: getPageMeta("de", "/de/warum-gerade-wir").keywords,
  };
}

export default async function Page() {
  const years = yearsSince();
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs03.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Warum gerade wir?</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="">
            <p className="text-base leading-7 text-[var(--gray-600)] mb-6">{years} Jahre Erfahrung im Kühlfahrzeugbau. Offizielle Carrier Transicold Vertretung. 100% Geld-zurück-Garantie. Maßgeschneiderte Lösungen. Kurze Lieferzeiten, zuverlässige Qualität.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section gray-bg">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Warum uns wählen?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: `${years} Jahre Erfahrung`, text: "Kühlfahrzeugbau seit 1992." },
              { title: "Carrier Vertretung", text: "Offizieller Carrier Transicold Vertrieb und Service." },
              { title: "100% Garantie", text: "100% Geld-zurück-Garantie auf alle Arbeiten." },
              { title: "Individuelle Lösungen", text: "Jedes Fahrzeug nach Ihren Wünschen." },
              { title: "Schnelle Lieferung", text: "Umbau in nur 15 Tagen möglich." },
              { title: "Carrier Service", text: "Offizieller Carrier Transicold Service." },
            ].map((s) => (
              <div key={s.title} className="p-6 border border-[var(--gray-200)]">
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-[var(--gray-600)]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section white-bg align-center">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Fordern Sie ein Angebot an!</h2>
          <Link href="/de/anfrage" className="button">Kostenloses Angebot</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
