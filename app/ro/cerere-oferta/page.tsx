import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import ContactForm from "@/app/components/ContactForm";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("ro", "/ro/cerere-oferta").title,
    description: getPageMeta("ro", "/ro/cerere-oferta").description,
    keywords: getPageMeta("ro", "/ro/cerere-oferta").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Cerere ofertă</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Împărtășiți-ne ideile dvs. - noi adăugăm experiența noastră! Angajament profesional, servicii complete și viteză de execuție lider în industrie, cu garanție 100% rambursare.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Ce se întâmplă după cererea dvs.?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { num: "1", title: "Email de confirmare", text: "Primiți un email de confirmare că am primit cererea dvs." },
              { num: "2", title: "Consultare telefonică", text: "Colegul nostru vă va suna pentru a discuta detaliile tehnice." },
              { num: "3", title: "Oferta trimisă", text: "Trimitem oferta în format PDF în termen de 12 ore." },
            ].map((s) => (
              <div key={s.num} className="p-6 border border-[#e0e0e0] bg-white text-center">
                <div className="w-12 h-12 bg-[#4a68a9] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">{s.num}</div>
                <h3 className="font-bold text-lg mb-3">{s.title}</h3>
                <p className="text-[#666]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="max-w-2xl mx-auto p-8 border border-[#e0e0e0]">
            <h2 className="text-2xl font-bold mb-6">Trimiteți cererea dvs.</h2>
            <ContactForm lang="ro" submitLabel="Cerere ofertă" successTitle="Vă mulțumim pentru cerere!" successText="Colegul nostru vă va contacta în scurt timp." />
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
