import type { Metadata } from "next";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import { yearsSince } from "@/app/lib/constants";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Why us? - Autotherm Ltd." };
}

export default async function Page() {
  const years = yearsSince();
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs03.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Why us?</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">{years} years of experience in refrigerated vehicle manufacturing. Official Carrier Transicold representation. 100% money-back guarantee. Custom solutions. Fast delivery, reliable quality.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Why choose us?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: `${years} Years Experience`, text: "Manufacturing refrigerated vehicles since 1992." },
              { title: "Carrier Representation", text: "Official Carrier Transicold distributor and service center." },
              { title: "100% Guarantee", text: "100% money-back guarantee on all our work." },
              { title: "Custom Solutions", text: "Every vehicle built to your specific requirements." },
              { title: "Fast Delivery", text: "Conversion completed in as little as 15 days." },
              { title: "0-24 Service", text: "Round-the-clock service hotline." },
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
          <h2 className="text-2xl font-bold mb-6">Request a Quotation</h2>
          <Link href="/en/quotation" className="button">Request a Quotation</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
