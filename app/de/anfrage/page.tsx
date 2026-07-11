import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import ContactForm from "@/app/components/ContactForm";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("de", "/de/anfrage").title,
    description: getPageMeta("de", "/de/anfrage").description,
    keywords: getPageMeta("de", "/de/anfrage").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Anfrage</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="">
            <p className="text-base leading-7 text-[var(--gray-600)] mb-6">Teilen Sie Ihre Ideen mit uns - wir fügen unsere Erfahrung hinzu. Professionelles Engagement, Full-Service und branchenführende Geschwindigkeit mit 100% Geld-zurück-Garantie.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section gray-bg">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Was passiert nach der Anfrage?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { num: "1", title: "Bestätigungs-E-Mail", text: "Sie erhalten eine Bestätigung, dass Ihre Anfrage bei uns angekommen ist." },
              { num: "2", title: "Technische Beratung", text: "Unser Mitarbeiter ruft Sie an, um die technischen Details zu besprechen." },
              { num: "3", title: "Angebot erhalten", text: "Wir senden Ihnen unser Angebot innerhalb von 12 Stunden per E-Mail im PDF-Format." },
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
            <h2 className="text-2xl font-bold mb-6">Senden Sie Ihre Anfrage</h2>
            <ContactForm lang="de" submitLabel="Anfrage senden" successTitle="Vielen Dank für Ihre Anfrage!" successText="Ein Mitarbeiter wird Sie in Kürze kontaktieren." />
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
