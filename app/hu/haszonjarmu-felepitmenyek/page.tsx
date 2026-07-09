import type { Metadata } from "next";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Haszonjármű felépítmények - Autotherm Kft." };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Haszonjármű felépítmények</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">3,5 tonnás alvázakra épített dobozos felépítmények széles választéka. Alumínium doboz, hűtős doboz, platós-ponyvás és speciális felépítmények.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Felépítmény típusok</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Alumínium dobozos felépítmény", text: "Könnyű, korrózióálló alumínium karosszéria. Ideális általános szállítási feladatokra." },
              { title: "Hűtős dobozos felépítmény", text: "Hőszigetelt doboz Carrier hűtőberendezéssel a hűtött áruk biztonságos szállításához." },
              { title: "Platós-ponyvás felépítmény", text: "Sokoldalú platós kialakítás ponyvafedéllel, rakományrögzítési pontokkal." },
              { title: "Speciális felépítmény", text: "Egyedi igényekre szabott járműfelépítmények. Műhelyautó, hűtött raktér, stb." },
            ].map((s) => (
              <div key={s.title} className="p-6 border border-[#e0e0e0] bg-white">
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
          <h2 className="text-2xl font-bold mb-6">Érdeklődik felépítményeink iránt?</h2>
          <Link href="/hu/arajanlatkeres" className="button">Ajánlatkérés</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
