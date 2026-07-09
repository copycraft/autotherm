import ContactForm from "@/app/components/ContactForm";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };


export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Contact</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Our team works for the company&apos;s success. Professional commitment, full service and 100% money-back guarantee. Contact us using any of the details below!</p>
          </div>
        </div>
      </section>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="p-8 border border-[#e0e0e0] bg-white">
                <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
                <div className="contact-detail"><i className="fa fa-map-marker"></i><div><p className="font-bold">Address</p><p className="text-[#666]">6728 Szeged, Napos út 3., Hungary</p></div></div>
                <div className="contact-detail"><i className="fa fa-phone"></i><div><p className="font-bold">Phone</p><a href="tel:+36209102050" className="text-[#4a68a9]">+36 20 910 2050</a></div></div>
                <div className="contact-detail"><i className="fa fa-envelope"></i><div><p className="font-bold">Email</p><a href="mailto:autotherm@autotherm.hu" className="text-[#4a68a9]">autotherm@autotherm.hu</a></div></div>
                <div className="contact-detail"><i className="fa fa-clock-o"></i><div><p className="font-bold">Opening Hours</p><p className="text-[#666]">Monday - Friday 08:00-16:30</p></div></div>
              </div>
            </div>
            <div>
              <div className="p-8 border border-[#e0e0e0] bg-white">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <ContactForm lang="en" submitLabel="Send" successTitle="Thank you!" successText="Our colleague will contact you shortly." />
              </div>
            </div>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
