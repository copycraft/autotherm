import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import QuotationForm from "@/app/components/QuotationForm";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("hu", "/hu/arajanlatkeres").title,
    description: getPageMeta("hu", "/hu/arajanlatkeres").description,
    keywords: getPageMeta("hu", "/hu/arajanlatkeres").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Ajánlatkérés</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="">
            <p className="text-base leading-7 text-[var(--gray-600)] mb-6">Ossza meg velünk elképzeléseit, mi hozzáadjuk tapasztalatunkat! Szakmai elhivatottság, teljes körű ügyintézés és piacvezető gyorsaságú kivitelezés 100% pénzvisszafizetési garanciával.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section gray-bg">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Mi fog történni ajánlatkérés után?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { num: "1", title: "Megerősítő e-mail", text: "Kap tőlünk egy megerősítő e-mailt, hogy megkaptuk ajánlatkérését." },
              { num: "2", title: "Telefonos egyeztetés", text: "Munkatársunk rövid időn belül felhívja a műszaki részletek pontosítása miatt." },
              { num: "3", title: "Ajánlat küldése", text: "12 órán belül PDF formátumban küldjük ajánlatunkat." },
            ].map((s) => (
              <div key={s.num} className="p-6 border border-[var(--gray-200)] bg-white text-center">
                <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">{s.num}</div>
                <h3 className="font-bold text-lg mb-3">{s.title}</h3>
                <p className="text-[var(--gray-600)]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="max-w-2xl mx-auto p-8 border border-[var(--gray-200)]">
            <h2 className="text-2xl font-bold mb-6">Küldje el igényeit</h2>
            <QuotationForm />
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
