import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("en", "/en/who-are-we").title,
    description: getPageMeta("en", "/en/who-are-we").description,
    keywords: getPageMeta("en", "/en/who-are-we").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Who are we?</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="">
            <p className="text-base leading-7 text-[var(--gray-600)] mb-6">Our company was founded in 1992 under the name Autotherm Ltd. The founders, László Csurgó and Dkfm. Peter Knerer established the company with the aim of introducing Carrier refrigeration equipment to the emerging Hungarian refrigerated market. Since 1995, we have also been performing Thermo King refrigeration unit repairs, becoming a leading refrigeration service center in Southern Hungary.</p>
            <p className="text-base leading-7 text-[var(--gray-600)] mb-6">Today we operate on 1500 m² with 4 production halls: two for vehicle body manufacturing and insulation, one for metal processing, and one for installation and servicing of refrigeration units. Our 33 employees work daily to impress our customers with our work and service.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section gray-bg">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Our Milestones</h2></div>
          <div className="relative border-l-4 border-[var(--primary)] ml-4 space-y-8 max-w-3xl mx-auto">
            {[
              { year: "1991", text: "Austrian roots - László Csurgó gained experience in the refrigerated vehicle industry in Austria." },
              { year: "1992", text: "Establishment of the Hungarian Carrier representation. Autotherm Ltd. is founded." },
              { year: "1995", text: "Thermo King representation - we become Hungary's leading reefer service center." },
              { year: "2007", text: "Carrier representation again - today we sell the most Carrier units in the 3.5T category in Hungary." },
              { year: "2012", text: "New facility - ten times more vehicles can be produced simultaneously." },
            ].map((m) => (
              <div key={m.year} className="ml-8 relative">
                <div className="absolute -left-[2.85rem] w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-sm font-bold">{m.year}</div>
                <div className="p-6 border border-[var(--gray-200)]">
                  <p className="font-bold text-[var(--primary)] mb-2">{m.year}</p>
                  <p className="text-[var(--gray-600)]">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section white-bg align-center">
        <div className="wrap-column">
          <h2 className="text-3xl font-bold mb-8">Request your personalized quotation!</h2>
          <Link href="/en/quotation" className="button">Request a Quotation</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
