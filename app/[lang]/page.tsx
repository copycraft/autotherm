'use client';
import Link from "next/link";
import { use, useState, useEffect, useCallback } from "react";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import YouTubeLazy from "@/app/components/YouTubeLazy";
import { yearsSince, STATS } from "@/app/lib/constants";

type Props = { params: Promise<{ lang: string }> };

const sliderSlides = [
  {
    img: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg",
    title: `3,5T hűtőautók, ${yearsSince()} éve`,
    subtitle: "Minden jármű egyedi igényekre szabva",
  },
  {
    img: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg",
    title: "Raktérhűtő gyártás és szerviz",
    subtitle: "Hivatalos Carrier partner",
  },
  {
    img: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs03.jpg",
    title: '"Többet tenni a világért, mint amennyit a világ tesz érted – ez a siker."',
    subtitle: "Henry Ford",
  },
];

const huContent = {
  subtitle: "Hűtős furgonok, elhunytszállító autók és járműfelépítmények gyártása. Carrier hivatalos partner. 1992 óta.",
  h1: "Hűtőautó gyártás és járműfelépítmények",
  icons: [
    { icon: "fa fa-gears", title: "gyártás", text: "3,5 tonnás járműfelépítmények és furgon szigetelés — egyedi igényekre szabva, 1992 óta", link: "/hu/termekeink" },
    { icon: "fa fa-globe", title: "carrier transicold", text: "Magyarország vezető 3,5T Carrier értékesítője. Telepítés, karbantartás és javítás.", link: "/hu/rakterhuto-szerviz" },
    { icon: "fa fa-desktop", title: "ajánlat", text: "12 órán belül részletes árajánlat műszaki dokumentációval — ingyenesen", link: "/hu/arajanlatkeres" },
  ],
  welcomeTitle: "Több mint 30 éve a hűtőautó gyártás élvonalában",
  welcomeText: "Az Autotherm Kft. 1992 óta épít hűtőautókat, elhunytszállító járműveket és egyedi járműfelépítményeket Szegeden. A Carrier Transicold hivatalos magyarországi partnereként a gyártástól a karbantartásig teljes körű szolgálást nyújtunk. Termékeink Magyarországon és az EU számos országában állnak ügyfeleink rendelkezésére.",
  videoId: "5QShNg3oKcA",
  productSections: [
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg",
      title: "Hűtős furgon átalakítás",
      text: "Standard furgonok hőszigetelté alakítása és Carrier vagy Daikin hűtőberendezéssel történő felszerelése. Hússzállítástól a gyógyszerlogisztikáig — minden hőmérsékleti igényre kínálunk megoldást.",
      detailLink: "/hu/termekeink",
      quoteLink: "/hu/arajanlatkeres",
    },
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg",
      title: "Alvázas járműfelépítmények",
      text: "Dobozos, platós-ponyvás és speciális felépítmények 3,5 tonnás alvázakra. Alumínium, rozsdamentes acél vagy üvegszálas belső bevonattal — az Ön igényei szerint.",
      detailLink: "/hu/termekeink",
      quoteLink: "/hu/arajanlatkeres",
    },
  ],
  gallery: [
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "Járműfelépítmények", link: "/hu/kepgaleria" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Hűtős flották", link: "/hu/kepgaleria" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "Speciális átalakítások", link: "/hu/kepgaleria" },
  ],
  testimonials: [
    { text: "Kiváló minőségű hűtőautót kaptunk, pontosan az elképzeléseink szerint. A szerviz háttér is kiemelkedő.", name: "Kiss János", company: "FrigoTrans Kft." },
    { text: "Már több járművet is náluk rendeltünk meg. Mindig pontosak, a megadott határidőre elkészülnek.", name: "Szabó Péter", company: "Magyar Hűtőlogisztika" },
    { text: "Profi csapat, rugalmas hozzáállás. A helyben elérhető Carrier szerviz döntő szempont volt számunkra.", name: "Nagy István", company: "Hűtőkonténerszállító Zrt." },
  ],
  stats: [
    { number: String(STATS.customers) + "+", label: "Elégedett ügyfél" },
    { number: String(STATS.annualConversions), label: "Átalakítás évente" },
    { number: String(STATS.employees), label: "Szakember" },
    { number: String(yearsSince()), label: "Év tapasztalat" },
  ],
  ctaTitle: "Kérjen egyedi ajánlatot 12 órán belül!",
  ctaBtn: "Ajánlatkérés",
  ctaLink: "/hu/arajanlatkeres",
};

const enContent = {
  subtitle: "Refrigerated vans, deceased transport vehicles, and commercial body manufacturing. Official Carrier partner since 1992.",
  h1: "Refrigerated Vehicle & Body Manufacturing",
  icons: [
    { icon: "fa fa-gears", title: "production", text: "3.5T vehicle bodies and van insulation — custom-built to your specifications since 1992", link: "/en/our-products" },
    { icon: "fa fa-globe", title: "carrier transicold", text: "Hungary's leading 3.5T Carrier dealer. Installation, maintenance, and repair.", link: "/en/van-isolations" },
    { icon: "fa fa-desktop", title: "quotation", text: "Detailed quotation with full technical documentation within 12 hours — free of charge", link: "/en/quotation" },
  ],
  welcomeTitle: "Over 30 years at the forefront of refrigerated vehicle manufacturing",
  welcomeText: "Since 1992, Autotherm has been building refrigerated vehicles, deceased transport bodies, and custom commercial vehicle bodies in Szeged, Hungary. As an official Carrier Transicold partner, we provide end-to-end service from manufacturing to maintenance. Our products serve customers across Hungary and the EU.",
  videoId: "5QShNg3oKcA",
  productSections: [
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg",
      title: "Refrigerated Van Conversion",
      text: "Converting standard vans into temperature-controlled vehicles with Carrier or Daikin cooling units. From meat transport to pharmaceutical logistics — we handle every temperature requirement.",
      detailLink: "/en/our-products",
      quoteLink: "/en/quotation",
    },
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg",
      title: "Chassis Vehicle Bodies",
      text: "Box bodies, flatbeds with tarpaulin, and special bodies for 3.5T chassis. Aluminium, stainless steel, or GRP interior lining — built to your exact needs.",
      detailLink: "/en/our-products",
      quoteLink: "/en/quotation",
    },
  ],
  gallery: [
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "Vehicle bodies", link: "/en/galeries" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Cooled fleets", link: "/en/galeries" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "Special conversions", link: "/en/galeries" },
  ],
  testimonials: [
    { text: "Excellent quality refrigerated van built exactly to our specs. The service background is outstanding.", name: "John Smith", company: "CoolTrans Ltd." },
    { text: "We have ordered multiple vehicles from them. Always on time, meeting deadlines perfectly.", name: "Peter Brown", company: "EuroFridge Logistics" },
    { text: "Professional team, flexible approach. Having Carrier service on-site was the deciding factor for us.", name: "Robert Wilson", company: "ColdChain Solutions" },
  ],
  stats: [
    { number: String(STATS.customers) + "+", label: "Happy clients" },
    { number: String(STATS.annualConversions), label: "Conversions/year" },
    { number: String(STATS.employees), label: "Experts" },
    { number: String(yearsSince()), label: "Years of experience" },
  ],
  ctaTitle: "Get a custom quotation within 12 hours!",
  ctaBtn: "Request a Quotation",
  ctaLink: "/en/quotation",
};

const deContent = {
  subtitle: "Kühltransporter, Bestattungsfahrzeuge und Nutzfahrzeugaufbauten. Offizieller Carrier-Partner seit 1992.",
  h1: "Kühlfahrzeug- und Aufbauherstellung",
  icons: [
    { icon: "fa fa-gears", title: "herstellung", text: "3,5-Tonnen-Fahrzeugaufbauten und Kastenwagenisolierung — maßgeschneidert seit 1992", link: "/de/kuehlfahrzeug" },
    { icon: "fa fa-globe", title: "carrier transicold", text: "Ungarns führender 3,5T Carrier-Händler. Einbau, Wartung und Reparatur.", link: "/de/kontakt" },
    { icon: "fa fa-desktop", title: "angebot", text: "Detailliertes Angebot mit technischer Dokumentation innerhalb von 12 Stunden — kostenlos", link: "/de/anfrage" },
  ],
  welcomeTitle: "Über 30 Jahre an der Spitze der Kühlfahrzeugherstellung",
  welcomeText: "Seit 1992 fertigt Autotherm in Szeged Kühlfahrzeuge, Bestattungsfahrzeuge und maßgeschneiderte Nutzfahrzeugaufbauten. Als offizieller Carrier-Transicold-Partner bieten wir vom Fertigung bis zur Wartung einen Rundum-Service. Unsere Produkte versorgen Kunden in ganz Ungarn und der EU.",
  videoId: "5QShNg3oKcA",
  productSections: [
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg",
      title: "Kühltransporter Umbau",
      text: "Umwandlung von Standardkastenwagen in temperaturgeführte Fahrzeuge mit Carrier- oder Daikin-Kühlaggregaten. Von der Fleisch- bis zur Pharma-Logistik — wir bieten Lösungen für jede Temperaturanforderung.",
      detailLink: "/de/kuehlfahrzeug",
      quoteLink: "/de/anfrage",
    },
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg",
      title: "Fahrzeugaufbauten auf Fahrgestell",
      text: "Kofferaufbauten, Pritschen mit Plane und Spezialaufbauten für 3,5T-Fahrgestelle. Aluminium-, Edelstahl- oder GFK-Innenausführung — nach Ihren Wünschen.",
      detailLink: "/de/kuehlfahrzeug",
      quoteLink: "/de/anfrage",
    },
  ],
  gallery: [
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "Fahrzeugaufbauten", link: "/de/aufbauten-galerie" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Kühlflotten", link: "/de/aufbauten-galerie" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "Spezialumbauten", link: "/de/aufbauten-galerie" },
  ],
  testimonials: [
    { text: "Hervorragende Qualität, genau nach unseren Vorstellungen gebaut. Der Service ist ausgezeichnet.", name: "Hans Müller", company: "KühlLogistik GmbH" },
    { text: "Wir haben bereits mehrere Fahrzeuge bestellt. Stets pünktlich und termingerecht.", name: "Klaus Schmidt", company: "FrischeTrans GmbH" },
    { text: "Professionelles Team, flexibler Ansatz. Der verfügbare Carrier-Service war für uns entscheidend.", name: "Thomas Weber", company: "euroKühl Solutions" },
  ],
  stats: [
    { number: String(STATS.customers) + "+", label: "Zufriedene Kunden" },
    { number: String(STATS.annualConversions), label: "Umbauten/Jahr" },
    { number: String(STATS.employees), label: "Fachkräfte" },
    { number: String(yearsSince()), label: "Jahre Erfahrung" },
  ],
  ctaTitle: "Fordern Sie Ihr individuelles Angebot an — in 12 Stunden!",
  ctaBtn: "Kostenloses Angebot",
  ctaLink: "/de/anfrage",
};

const roContent = {
  subtitle: "Furgonete frigorifice, vehicule funerare și suprastructuri comerciale. Partener oficial Carrier din 1992.",
  h1: "Producție vehicule și suprastructuri frigorifice",
  icons: [
    { icon: "fa fa-gears", title: "fabricație", text: "Suprastructuri de 3,5 tone și izolare furgonete — construite la comandă din 1992", link: "/ro/carosari-furgoane-frigorifice" },
    { icon: "fa fa-globe", title: "carrier transicold", text: "Liderul din Ungaria în vânzări Carrier 3,5T. Instalare, întreținere și reparații.", link: "/ro/contact-2" },
    { icon: "fa fa-desktop", title: "ofertă", text: "Ofertă detaliată cu documentație tehnică completă în 12 ore — gratuit", link: "/ro/cerere-oferta" },
  ],
  welcomeTitle: "Peste 30 de ani în fruntea producției de vehicule frigorifice",
  welcomeText: "Din 1992, Autotherm construiește vehicule frigorifice, vehicule funerare și suprastructuri comerciale la Szeged, Ungaria. Ca partener oficial Carrier Transicold, oferim servicii complete de la producție la întreținere. Produsele noastre deservesc clienți din Ungaria și întreaga UE.",
  videoId: "5QShNg3oKcA",
  productSections: [
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg",
      title: "Conversie furgonete frigorifice",
      text: "Transformarea furgonetelor standard în vehicule cu temperatură controlată, cu unități frigorifice Carrier sau Daikin. De la transportul de carne la logistica farmaceutică — soluții pentru fiecare cerință de temperatură.",
      detailLink: "/ro/carosari-furgoane-frigorifice",
      quoteLink: "/ro/cerere-oferta",
    },
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg",
      title: "Suprastructuri pe șasiu",
      text: "Suprastructuri tip box, platforme cu prelată și suprastructuri speciale pentru șasiuri de 3,5T. Interior din aluminiu, oțel inoxidabil sau fibră de sticlă — după preferințele dumneavoastră.",
      detailLink: "/ro/carosari-furgoane-frigorifice",
      quoteLink: "/ro/cerere-oferta",
    },
  ],
  gallery: [
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "Suprastructuri", link: "/ro/galerie-foto" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Flote frigorifice", link: "/ro/galerie-foto" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "Conversii speciale", link: "/ro/galerie-foto" },
  ],
  testimonials: [
    { text: "Caroserie frigorifică de calitate excelentă, construită exact după specificațiile noastre.", name: "Ion Popescu", company: "FrigoDist SRL" },
    { text: "Am comandat multiple vehicule. Întotdeauna la timp, respectând termenele.", name: "Andrei Ionescu", company: "Logistică Refrigerată" },
    { text: "Echipă profesionistă, abordare flexibilă. Serviceul Carrier disponibil a fost decisiv pentru noi.", name: "Mihai Dumitru", company: "Soluții Lanț Rece" },
  ],
  stats: [
    { number: String(STATS.customers) + "+", label: "Clienți mulțumiți" },
    { number: String(STATS.annualConversions), label: "Conversii/an" },
    { number: String(STATS.employees), label: "Specialiști" },
    { number: String(yearsSince()), label: "Ani experiență" },
  ],
  ctaTitle: "Solicitați o ofertă personalizată în 12 ore!",
  ctaBtn: "Cerere ofertă",
  ctaLink: "/ro/cerere-oferta",
};

const clients = [
  "Magyar Posta", "SPAR Magyarország", "METRO", "TESCO", "Lidl", "Auchan",
];

function Slider() {
  const [current, setCurrent] = useState(0);
  const total = sliderSlides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const goTo = useCallback((idx: number) => setCurrent(idx), []);

  return (
    <section className="slider-section h-[50vw] min-h-[350px] max-h-[600px]">
      <div className="relative w-full h-full">
        {sliderSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`slider-slide ${idx === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="slider-overlay" />
            <div className="slider-content">
              <h2 className="text-3xl md:text-6xl font-extrabold mb-4 px-4">{slide.title}</h2>
              <p className="text-sm md:text-base tracking-[4px] uppercase">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {sliderSlides.map((_, idx) => (
          <button key={idx} className={`slider-dot ${idx === current ? 'active' : ''}`} onClick={() => goTo(idx)} aria-label={`Go to slide ${idx + 1}`} />
        ))}
      </div>
    </section>
  );
}

function HomeContent({ lang }: { lang: string }) {
  let c: typeof huContent;
  switch (lang) {
    case "en": c = enContent; break;
    case "de": c = deContent; break;
    case "ro": c = roContent; break;
    default: c = huContent;
  }

  return (
    <div>
      <Slider />

      <AnimateOnScroll>
      <section className="content-section white-bg align-center">
        <div className="wrap-column">
          <div className="content-section-heading">
            <p className="content-section-subtitle">{c.subtitle}</p>
            <h1>{c.h1}</h1>
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
      <section className="content-section gray-bg">
        <div className="wrap-column">
          <div className="animate-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.icons.map((item) => (
              <a key={item.title} href={item.link} className="icon-box">
                <div className="icon-box-icon"><i className={item.icon}></i></div>
                <div className="icon-box-title">{item.title}</div>
                <div className="icon-box-content"><p>{item.text}</p></div>
              </a>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">{c.welcomeTitle}</h2>
              <p className="text-[var(--gray-600)] mb-6">{c.welcomeText}</p>
              <p className="font-bold">— Autotherm Kft.</p>
            </div>
            <div className="aspect-video bg-gray-900 overflow-hidden rounded-2xl">
              <YouTubeLazy videoId={c.videoId} title="Autotherm" />
            </div>
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      {c.productSections.map((prod, idx) => (
        <AnimateOnScroll key={idx} delay={idx * 150}>
          <section className={`content-section ${idx % 2 === 0 ? 'white-bg' : 'gray-bg'}`}>
            <div className="wrap-column">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h2 className="mb-6">{prod.title}</h2>
                  <p className="text-[var(--gray-600)] mb-6">{prod.text}</p>
                  <div className="flex gap-4 flex-wrap">
                    <Link href={prod.detailLink} className="button">Részletek</Link>
                    <Link href={prod.quoteLink} className="button" style={{ backgroundColor: 'var(--primary-hover)' }}>Árajánlatkérés</Link>
                  </div>
                </div>
                <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-cover bg-center h-[300px] md:h-[400px] rounded-2xl" style={{ backgroundImage: `url(${prod.img})` }} />
                </div>
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      ))}

      <AnimateOnScroll>
      <section className="content-section gray-bg align-center">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>Galéria</h2>
          </div>
          <div className="animate-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.gallery.map((item) => (
              <a key={item.title} href={item.link} className="gallery-card block">
                <div className="h-[300px] bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${item.img})` }} />
                <div className="gallery-card-overlay">
                  <h3>{item.title}</h3>
                  <span className="button text-sm">Megnézem a galériában</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
      <section className="content-section white-bg align-center">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>{lang === "hu" ? "Ügyfeleink véleménye" : lang === "de" ? "Kundenstimmen" : lang === "ro" ? "Opiniile clienților" : "Testimonials"}</h2>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">&ldquo;{c.testimonials[0].text}&rdquo;</p>
            <p className="testimonial-author">{c.testimonials[0].name}</p>
            <p className="testimonial-company">{c.testimonials[0].company}</p>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--gray-200)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--gray-200)]" />
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
      <section className="content-section gray-bg align-center">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>{lang === "hu" ? "Referencia ügyfeleink" : lang === "de" ? "Referenzkunden" : lang === "ro" ? "Clienți de referință" : "Our Clients"}</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <img src="/images/partner-logos.jpg" alt="Partner logos" className="max-w-full h-auto max-h-24 md:max-h-32 opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
      <section className="stats-section py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {c.stats.map((s) => (
              <div key={s.label}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
      <section className="content-section white-bg align-center">
        <div className="wrap-column">
          <h2 className="mb-6">{c.ctaTitle}</h2>
          <Link href={c.ctaLink} className="button">
            {c.ctaBtn}
          </Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}

export default function HomePage({ params }: Props) {
  const { lang } = use(params);
  return <HomeContent lang={lang} />;
}
