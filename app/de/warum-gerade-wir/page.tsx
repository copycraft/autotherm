import type { Metadata } from "next";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import { yearsSince } from "@/app/lib/constants";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Warum gerade wir? - Autotherm GmbH" };
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
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">{years} Jahre Erfahrung im Kühlfahrzeugbau. Offizielle Carrier Transicold Vertretung. 100% Geld-zurück-Garantie. Maßgeschneiderte Lösungen. Kurze Lieferzeiten, zuverlässige Qualität.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Warum uns wählen?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: `${years} Jahre Erfahrung`, text: "Kühlfahrzeugbau seit 1992." },
              { title: "Carrier Vertretung", text: "Offizieller Carrier Transicold Vertrieb und Service." },
              { title: "100% Garantie", text: "100% Geld-zurück-Garantie auf alle Arbeiten." },
              { title: "Individuelle Lösungen", text: "Jedes Fahrzeug nach Ihren Wünschen." },
              { title: "Schnelle Lieferung", text: "Umbau in nur 15 Tagen möglich." },
              { title: "0-24 Service", text: "Rund-um-die-Uhr Service-Hotline." },
            ].map((s) => (
              <div key={s.title} className="p-6 border border-[#e0e0e0]">
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-[#666]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Fordern Sie ein Angebot an!</h2>
          <Link href="/de/anfrage" className="button">Kostenloses Angebot</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
