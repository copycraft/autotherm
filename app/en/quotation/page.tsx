import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import ContactForm from "@/app/components/ContactForm";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("en", "/en/quotation").title,
    description: getPageMeta("en", "/en/quotation").description,
    keywords: getPageMeta("en", "/en/quotation").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Quotation</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="">
            <p className="text-base leading-7 text-[var(--gray-600)] mb-6">Share your ideas with us - we add our experience! Professional commitment, full service and industry-leading speed with 100% money-back guarantee.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section gray-bg">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>What happens after your inquiry?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { num: "1", title: "Confirmation email", text: "You receive a confirmation that we have received your inquiry." },
              { num: "2", title: "Phone consultation", text: "Our colleague will call you to discuss technical details." },
              { num: "3", title: "Quotation sent", text: "We send our quotation in PDF format within 12 hours." },
            ].map((s) => (
              <div key={s.num} className="p-6 border border-[var(--gray-200)] bg-white text-center">
                <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">{s.num}</div>
                <h3 className="font-bold text-lg mb-3">{s.title}</h3>
                <p className="text-[var(--gray-600)]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="max-w-2xl mx-auto p-8 border border-[var(--gray-200)]">
            <h2 className="text-2xl font-bold mb-6">Send your requirements</h2>
            <ContactForm lang="en" submitLabel="Request Quotation" successTitle="Thank you for your inquiry!" successText="Our colleague will contact you shortly." />
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
