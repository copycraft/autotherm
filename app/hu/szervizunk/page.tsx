import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("hu", "/hu/szervizunk").title,
    description: getPageMeta("hu", "/hu/szervizunk").description,
    keywords: getPageMeta("hu", "/hu/szervizunk").keywords,
  };
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
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="">
            <p className="text-base leading-7 text-[var(--gray-600)] mb-6">Hivatalos Carrier Transicold szerviz. Hűtőberendezések karbantartása, javítása. Daikin szerviz. Alkategóriák: járműfelépítmény javítás, raktérhűtő szerviz.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section gray-bg align-center">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Lépjen kapcsolatba velünk!</h2>
          <Link href="/hu/kapcsolat" className="button">Kapcsolat</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
