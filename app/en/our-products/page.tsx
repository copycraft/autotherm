import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("en", "/en/our-products").title,
    description: getPageMeta("en", "/en/our-products").description,
    keywords: getPageMeta("en", "/en/our-products").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Our Products</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Cooled vehicles tailored to individual needs for efficient cold logistics. Lightweight box bodies, refrigerated conversions, and special vehicle bodies.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>3.5 Ton Refrigerated Vans</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Refrigerated Conversion", text: "Van insulation and installation of cooling units." },
              { title: "Meat Transport Refrigerated Van", text: "Special insulated cargo space for safe meat transport." },
              { title: "Ice Cream & Cake Transport", text: "Cargo space temperatures down to -20°C." },
              { title: "Pharmaceutical Transport", text: "Precision temperature control for pharmaceutical needs." },
              { title: "Fruit & Vegetable Transport", text: "Optimal temperature and humidity for fresh produce." },
              { title: "Flower & Plant Transport", text: "Gentle transport at proper temperature with custom interior." },
            ].map((p) => (
              <div key={p.title} className="p-6 border border-[#e0e0e0] hover:border-[#4a68a9] transition-colors">
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-[#666] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>3.5 Ton Chassis Commercial Vehicles</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Refrigerated Body", text: "Insulated box bodies with cooling units." },
              { title: "Aluminium Box Body", text: "Lightweight, corrosion-resistant aluminium body." },
              { title: "Flatbed with Tarpaulin", text: "Versatile flatbed design with tarpaulin cover." },
              { title: "Special Body", text: "Custom vehicle bodies for specific needs." },
            ].map((p) => (
              <div key={p.title} className="p-6 border border-[#e0e0e0] hover:border-[#4a68a9] transition-colors">
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-[#666] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={600}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Request your personalized quotation!</h2>
          <Link href="/en/quotation" className="button">Request a Quotation</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
