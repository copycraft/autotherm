import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import ContactForm from "@/app/components/ContactForm";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("de", "/de/kontakt").title,
    description: getPageMeta("de", "/de/kontakt").description,
    keywords: getPageMeta("de", "/de/kontakt").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Kontakt</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Unser Team arbeitet für den Erfolg des Unternehmens. Professionelles Engagement, Full-Service und 100% Geld-zurück-Garantie. Kontaktieren Sie uns!</p>
          </div>
        </div>
      </section>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="p-8 border border-[#e0e0e0] bg-white">
                <h2 className="text-2xl font-bold mb-6">Kontaktdaten</h2>
                <div className="contact-detail"><i className="fa fa-map-marker"></i><div><p className="font-bold">Adresse</p><p className="text-[#666]">6728 Szeged, Napos út 3., Ungarn</p></div></div>
                <div className="contact-detail"><i className="fa fa-phone"></i><div><p className="font-bold">Telefon</p><a href="tel:+36209102050" className="text-[#4a68a9]">+36 20 910 2050</a></div></div>
                <div className="contact-detail"><i className="fa fa-envelope"></i><div><p className="font-bold">E-Mail</p><a href="mailto:autotherm@autotherm.hu" className="text-[#4a68a9]">autotherm@autotherm.hu</a></div></div>
                <div className="contact-detail"><i className="fa fa-clock-o"></i><div><p className="font-bold">Öffnungszeiten</p><p className="text-[#666]">Montag - Freitag 08:00-16:30</p></div></div>
              </div>
            </div>
            <div>
              <div className="p-8 border border-[#e0e0e0] bg-white">
                <h2 className="text-2xl font-bold mb-6">Senden Sie uns eine Nachricht</h2>
                <ContactForm lang="de" submitLabel="Senden" successTitle="Vielen Dank!" successText="Ein Mitarbeiter wird Sie in Kürze kontaktieren." />
              </div>
            </div>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
