import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("en", "/en/commercial-vehicle-bodies").title,
    description: getPageMeta("en", "/en/commercial-vehicle-bodies").description,
    keywords: getPageMeta("en", "/en/commercial-vehicle-bodies").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Commercial Vehicle Bodies</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Wide range of commercial vehicle bodies for 3.5T chassis. Aluminium box, refrigerated box, flatbed with tarpaulin, and special bodies for every need.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Body Types</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Aluminium Box Body", text: "Lightweight, corrosion-resistant aluminium body. Ideal for general transport tasks." },
              { title: "Refrigerated Box Body", text: "Insulated box with Carrier refrigeration for safe cold chain transport." },
              { title: "Flatbed with Tarpaulin", text: "Versatile flatbed design with tarpaulin cover and load securing points." },
              { title: "Special Bodies", text: "Custom bodies for specific requirements. Workshop vehicle, refrigerated cargo, etc." },
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
          <h2 className="text-2xl font-bold mb-6">Interested in our bodies?</h2>
          <Link href="/en/quotation" className="button">Request a Quotation</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
