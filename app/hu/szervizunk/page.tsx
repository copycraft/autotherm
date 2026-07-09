import type { Metadata } from "next";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Szervizünk - Autotherm Kft." };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Szervizünk</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Hivatalos Carrier Transicold szerviz. Hűtőberendezések karbantartása, javítása. Daikin szerviz. Alkategóriák: járműfelépítmény javítás, raktérhűtő szerviz.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Lépjen kapcsolatba velünk!</h2>
          <Link href="/hu/kapcsolat" className="button">Kapcsolat</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
