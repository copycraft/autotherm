import type { Metadata } from "next";
import ContactForm from "@/app/components/ContactForm";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Árajánlatkérés - Hűtőautó átalakítás árajánlat - Autotherm Kft." };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Ajánlatkérés</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Ossza meg velünk elképzeléseit, mi hozzáadjuk tapasztalatunkat! Szakmai elhivatottság, teljes körű ügyintézés és piacvezető gyorsaságú kivitelezés 100% pénzvisszafizetési garanciával.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Mi fog történni ajánlatkérés után?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { num: "1", title: "Megerősítő e-mail", text: "Kap tőlünk egy megerősítő e-mailt, hogy megkaptuk ajánlatkérését." },
              { num: "2", title: "Telefonos egyeztetés", text: "Munkatársunk rövid időn belül felhívja a műszaki részletek pontosítása miatt." },
              { num: "3", title: "Ajánlat küldése", text: "12 órán belül PDF formátumban küldjük ajánlatunkat." },
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
            <h2 className="text-2xl font-bold mb-6">Küldje el igényeit</h2>
            <ContactForm lang="hu" submitLabel="Ajánlatkérés" successTitle="Köszönjük ajánlatkérését!" successText="Munkatársunk hamarosan felveszi Önnel a kapcsolatot." />
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
