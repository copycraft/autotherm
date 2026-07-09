import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("en", "/en/van-isolations").title,
    description: getPageMeta("en", "/en/van-isolations").description,
    keywords: getPageMeta("en", "/en/van-isolations").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Van Isolations</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Professional van isolation solutions. Vacuum-bonded sandwich panels. 50mm or 80mm insulation thickness. Smooth, washable surfaces meeting food transport hygiene standards.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Isolation Features</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Insulation Technology", text: "Vacuum-bonded sandwich panels with CFC-free insulation core." },
              { title: "Hygienic Surfaces", text: "Smooth white polyester surfaces, easy to clean and disinfect." },
              { title: "Full Coverage", text: "Floor, walls, roof, wheel arches, doors - all fully insulated." },
              { title: "Lightweight", text: "Optimized weight for maximum payload capacity." },
              { title: "Impact Protection", text: "Optional stainless steel rub rails at 155-280mm height." },
              { title: "LED Lighting", text: "Integrated LED lighting for optimal cargo area visibility." },
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
          <h2 className="text-2xl font-bold mb-6">Interested?</h2>
          <Link href="/en/quotation" className="button">Request a Quotation</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
