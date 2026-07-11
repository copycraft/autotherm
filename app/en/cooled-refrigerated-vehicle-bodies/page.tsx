import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("en", "/en/cooled-refrigerated-vehicle-bodies").title,
    description: getPageMeta("en", "/en/cooled-refrigerated-vehicle-bodies").description,
    keywords: getPageMeta("en", "/en/cooled-refrigerated-vehicle-bodies").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Cooled & Refrigerated Bodies</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="">
            <p className="text-base leading-7 text-[var(--gray-600)] mb-6">Cooled and refrigerated vehicle bodies for 3.5T chassis. Insulated construction with Carrier refrigeration units. Custom-built to your specifications.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section gray-bg align-center">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Interested?</h2>
          <Link href="/en/quotation" className="button">Request a Quotation</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
