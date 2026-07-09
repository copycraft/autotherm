import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("de", "/de/kuehlfahrzeug").title,
    description: getPageMeta("de", "/de/kuehlfahrzeug").description,
    keywords: getPageMeta("de", "/de/kuehlfahrzeug").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Kühlfahrzeug</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Massgeschneiderte Kühlfahrzeuge für effiziente Kühllogistik. Leichte Kofferaufbauten, Kühlumbauten und Spezialaufbauten.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>3,5 Tonnen Kühltransporter</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Kühlumbau", text: "Kastenwagenisolierung und Einbau von Kühlaggregaten." },
              { title: "Frischdiensttransporter", text: "Für Temperaturen von 0°C bis +5°C." },
              { title: "Tiefkühltransporter", text: "Für Temperaturen bis -20°C." },
              { title: "Medikamententransporter", text: "Präzise Temperaturregelung für Pharmatransporte." },
              { title: "Blumentransporter", text: "Schonender Transport bei optimaler Temperatur." },
              { title: "Fleischertransporter", text: "Speziell für den Transport von Fleischprodukten." },
            ].map((p) => (
              <div key={p.title} className="p-6 border border-[#e0e0e0] hover:border-[#4a68a9] transition-colors">
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-[#666] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Fahrgestell Nutzwagen Aufbauten</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Aluminium Koffer", text: "Leichter, korrosionsbeständiger Aluminiumkoffer." },
              { title: "Kühlkoffer", text: "Isolierter Koffer mit Kühlaggregat." },
              { title: "Pritschenaufbau mit Plane", text: "Vielseitiger Pritschenaufbau mit Planenverdeck." },
              { title: "Spezialaufbauten", text: "Kundenspezifische Aufbauten für besondere Anforderungen." },
            ].map((p) => (
              <div key={p.title} className="p-6 border border-[#e0e0e0] hover:border-[#4a68a9] transition-colors">
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-[#666] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={600}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Interessiert?</h2>
          <Link href="/de/anfrage" className="button">Kostenloses Angebot</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
