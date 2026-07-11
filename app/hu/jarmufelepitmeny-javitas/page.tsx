import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("hu", "/hu/jarmufelepitmeny-javitas").title,
    description: getPageMeta("hu", "/hu/jarmufelepitmeny-javitas").description,
    keywords: getPageMeta("hu", "/hu/jarmufelepitmeny-javitas").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg)' }}>
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4"><h1>Járműfelépítmény javítás</h1></div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="">
            <p className="text-base leading-7 text-[var(--gray-600)] mb-6">Járműfelépítmények javítása, karbantartása. Hűtős dobozok, alumínium felépítmények, platós-ponyvás felépítmények javítása. Gyors és precíz munka, rövid határidőkkel.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section gray-bg">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Javítási szolgáltatásaink</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Dobozos felépítmény javítás", text: "Sérült hűtős dobozok javítása, szigetelés helyreállítás." },
              { title: "Alumínium karosszéria javítás", text: "Alumínium felépítmények sérüléseinek javítása." },
              { title: "Ponyva csere", text: "Platós-ponyvás felépítmények ponyvájának cseréje." },
            ].map((s) => (
              <div key={s.title} className="p-6 border border-[var(--gray-200)]">
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-[var(--gray-600)]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section white-bg align-center">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Javítási igény bejelentése</h2>
          <Link href="/hu/kapcsolat" className="button">Kapcsolat</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
