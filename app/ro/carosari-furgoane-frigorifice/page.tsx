import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("ro", "/ro/carosari-furgoane-frigorifice").title,
    description: getPageMeta("ro", "/ro/carosari-furgoane-frigorifice").description,
    keywords: getPageMeta("ro", "/ro/carosari-furgoane-frigorifice").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Carosări furgoane frigorifice</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Carosări frigorifice personalizate pentru logistică la rece eficientă. Suprastructuri ușoare tip box, conversii frigorifice și carosări speciale pentru orice necesitate.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Tipuri de carosări</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Carosare frigorifică", text: "Izolare și instalare unități de răcire." },
              { title: "Transport carne", text: "Spațiu izolat special pentru transport produse din carne." },
              { title: "Transport înghețată", text: "Temperaturi până la -20°C." },
              { title: "Transport medicamente", text: "Control precis al temperaturii pentru farmaceutice." },
              { title: "Transport legume/fructe", text: "Temperatură și umiditate optimă." },
              { title: "Transport flori", text: "Transport delicat la temperatură adecvată." },
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
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Solicitați o ofertă personalizată!</h2>
          <Link href="/ro/cerere-oferta" className="button">Cerere ofertă</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
