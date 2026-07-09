import type { Metadata } from "next";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Általános Szerződési Feltételek - Autotherm Kft." };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs03.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Általános Szerződési Feltételek</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Az Autotherm Kft. Általános Szerződési Feltételei (ÁSZF) szabályozzák a társaság által nyújtott szolgáltatások igénybevételének feltételeit.</p>
            <h3 className="text-xl font-bold mt-8 mb-4">1. Általános rendelkezések</h3>
            <p className="text-base leading-7 text-[#666] mb-4">A jelen ÁSZF hatálya alá tartozik minden olyan szerződés, melyet az Autotherm Kft. ügyfeleivel köt járműfelépítmény gyártás, hűtőberendezés beépítés és szerviz szolgáltatás tárgyában.</p>
            <h3 className="text-xl font-bold mt-8 mb-4">2. Megrendelés</h3>
            <p className="text-base leading-7 text-[#666] mb-4">A megrendelés írásban, e-mailben vagy személyesen történik. A megrendelés elfogadását a szolgáltató írásban visszaigazolja.</p>
            <h3 className="text-xl font-bold mt-8 mb-4">3. Fizetési feltételek</h3>
            <p className="text-base leading-7 text-[#666] mb-4">A fizetés banki átutalással történik a kiállított számla alapján. Előleg fizetés esetenként kerül megállapításra.</p>
            <h3 className="text-xl font-bold mt-8 mb-4">4. Jótállás</h3>
            <p className="text-base leading-7 text-[#666] mb-4">A szolgáltató a munkákra 12 hónap jótállást vállal. A hűtőberendezésekre a gyártói jótállás az irányadó.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
