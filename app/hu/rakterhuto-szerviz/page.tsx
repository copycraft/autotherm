import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("hu", "/hu/rakterhuto-szerviz").title,
    description: getPageMeta("hu", "/hu/rakterhuto-szerviz").description,
    keywords: getPageMeta("hu", "/hu/rakterhuto-szerviz").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg)' }}>
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4"><h1>Raktérhűtő szerviz</h1></div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Carrier raktérhűtők értékesítés, beépítés és szerviz. Hivatalos Carrier Transicold márkaszerviz és alkatrész forgalmazó. Daikin hűtőberendezések javítása is.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Szolgáltatásaink</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Carrier hűtőberendezések értékesítése", text: "A Carrier Transicold teljes termékpalettájának forgalmazása." },
              { title: "Beépítés", text: "Új hűtőberendezések szakszerű beépítése és üzembe helyezése." },
              { title: "Diagnosztika és javítás", text: "Korszerű műszerekkel gyors és pontos hibafeltárás." },
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
          <h2 className="text-2xl font-bold mb-6">Szerviz időpont egyeztetés</h2>
          <Link href="/hu/kapcsolat" className="button">Kapcsolat</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
