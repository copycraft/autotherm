import type { Metadata } from "next";
import ContactForm from "@/app/components/ContactForm";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Kapcsolat - Autotherm Kft. - Hűtőautó gyártás és szerviz" };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Kapcsolat</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Munkatársaink a cége sikereiért dolgoznak. Szakmai elhivatottság, teljes körű ügyintézés és 100% pénzvisszafizetési garancia. Vegye fel velünk a kapcsolatot az alábbi elérhetőségek bármelyikén!</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="p-8 border border-[#e0e0e0] bg-white">
                <h2 className="text-2xl font-bold mb-6">Elérhetőségek</h2>
                <div className="contact-detail"><i className="fa fa-map-marker"></i><div><p className="font-bold">Cím</p><p className="text-[#666]">6728 Szeged, Napos út 3.</p></div></div>
                <div className="contact-detail"><i className="fa fa-phone"></i><div><p className="font-bold">Telefon</p><a href="tel:+36209102050" className="text-[#4a68a9]">+36 20 910 2050</a></div></div>
                <div className="contact-detail"><i className="fa fa-envelope"></i><div><p className="font-bold">E-mail</p><a href="mailto:autotherm@autotherm.hu" className="text-[#4a68a9]">autotherm@autotherm.hu</a></div></div>
                <div className="contact-detail"><i className="fa fa-clock-o"></i><div><p className="font-bold">Nyitvatartás</p><p className="text-[#666]">Hétfőtől - Péntekig 08:00-16:30</p></div></div>
              </div>
            </div>
            <div>
              <div className="p-8 border border-[#e0e0e0] bg-white">
                <h2 className="text-2xl font-bold mb-6">Küldje el üzenetét</h2>
                <ContactForm lang="hu" />
              </div>
            </div>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Munkatársaink</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Busa Ádám", role: "Értékesítés", email: "busa.adam@autotherm.hu" },
              { name: "Csíkos Péter", role: "Hűtőszervíz", email: "csikos.peter@autotherm.hu" },
              { name: "Borbély Erika", role: "Ügyfélszolgálat", email: "borbely.erika@autotherm.hu" },
            ].map((p) => (
              <div key={p.name} className="p-6 border border-[#e0e0e0]">
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-[#999] text-sm mb-2">{p.role}</p>
                <a href={`mailto:${p.email}`} className="text-[#4a68a9] text-sm">{p.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
