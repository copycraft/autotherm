'use client';
import Link from "next/link";
import { use, useState, useEffect, useCallback } from "react";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import YouTubeLazy from "@/app/components/YouTubeLazy";
import { yearsSince } from "@/app/lib/constants";

type Props = { params: Promise<{ lang: string }> };

const sliderSlides = [
  {
    img: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg",
    title: "3,5T hűtőautók, 31 éve",
    subtitle: "Egyedi igényekre gyártva",
  },
  {
    img: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg",
    title: "és raktérhűtő szervíz",
    subtitle: "Carrier képviselet",
  },
  {
    img: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs03.jpg",
    title: '"Többet tenni a világért, mint amennyit a világ tesz érted – ez a siker."',
    subtitle: "Henry Ford",
  },
];

const huContent = {
  slideTitle: "3,5T hűtőautók, 31 éve",
  slideSub: "Egyedi igényekre gyártva",
  subtitle: "Hűtős furgonok, elhunytszállító autók gyártása, utólagos raktérszigetelés és alvázas felépítmény gyártás.",
  h1: "Hűtőautó és fagyasztós autó gyártás",
  icons: [
    { icon: "fa fa-gears", title: "gyártás", text: "3,5 tonnás járműfelépítmények gyártása és furgonok raktérszigetelése", link: "/hu/termekeink" },
    { icon: "fa fa-globe", title: "carrier transicold", text: "Carrier raktérhűtők értékesítés, beépítés és 0-24H szerviz", link: "/hu/rakterhuto-szerviz" },
    { icon: "fa fa-desktop", title: "ügyintézés", text: "Akár 12 órán belül árajánlatot adunk részletes műszaki dokumentációval", link: "/hu/arajanlatkeres" },
  ],
  welcomeTitle: "Üdvözöljük az Autotherm Kft. weboldalán!",
  welcomeText: "Az Autotherm Kft. 1992 óta foglalkozik hűtőautók, elhunytszállító járművek és járműfelépítmények gyártásával. Célunk, hogy ügyfeleinknek a legmagasabb minőségű, egyedi igényekre szabott megoldásokat kínáljuk. Büszkék vagyunk arra, hogy termékeinket Magyarország mellett számos európai országba szállítjuk.",
  videoId: "5QShNg3oKcA",
  productSections: [
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg",
      title: "Hűtős furgon átalakítás",
      text: "Furgonok utólagos raktérszigetelése és hűtőberendezéssel történő felszerelése. Egyedi igényekre szabott megoldások a hatékony hűtött logisztikához. Könnyű dobozos felépítmények, hűtős átalakítások és speciális járműfelépítmények széles választéka.",
      detailLink: "/hu/termekeink",
      quoteLink: "/hu/arajanlatkeres",
    },
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg",
      title: "Alvázas járműfelépítmények",
      text: "3,5 tonnás alvázakra épített dobozos felépítmények. Alumínium doboz, hűtős doboz, platós-ponyvás és speciális felépítmények. AT Strong® hőszigeteléssel, rozsdamentes vagy üvegszálas belső bevonattal.",
      detailLink: "/hu/termekeink",
      quoteLink: "/hu/arajanlatkeres",
    },
  ],
  gallery: [
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "járműfelépítmény", link: "/hu/kepgaleria" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Hűtős átalakítás", link: "/hu/kepgaleria" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "speciális átalakítás", link: "/hu/kepgaleria" },
  ],
  testimonials: [
    { text: "Kiváló minőségű hűtőautót kaptunk, pontosan az elképzeléseink szerint. A szerviz háttér is kiemelkedő.", name: "Kiss János", company: "FrigoTrans Kft." },
    { text: "Már több járművet is náluk rendeltünk meg. Mindig pontosak, a megadott határidőre elkészülnek.", name: "Szabó Péter", company: "Magyar Hűtőlogisztika" },
    { text: "Profi csapat, rugalmas hozzáállás. A Carrier szerviz 0-24-ben elérhető, ami nekünk nagyon fontos.", name: "Nagy István", company: "Hűtőkonténerszállító Zrt." },
  ],
  stats: [
    { number: "2800", label: "Elégedett ügyfél" },
    { number: "265", label: "Átalakítás évente" },
    { number: "32", label: "Munkatárs" },
    { number: String(yearsSince()), label: "Év rutin" },
  ],
  ctaTitle: "Kérje árajánlatunkat most!",
  ctaText: "Adja meg adatait és 12 órán belül árajánlatot adunk.",
  ctaBtn: "Ajánlatkérés",
  ctaLink: "/hu/arajanlatkeres",
};

const enContent = {
  slideTitle: "3.5T cooled vehicles, 31 years",
  slideSub: "Built to your specifications",
  subtitle: "Cooled vans, deceased transport vehicles, van isolations, and chassis body production, repair and service.",
  h1: "Cooled & Refrigerated Vehicle Body Manufacturing",
  icons: [
    { icon: "fa fa-gears", title: "production", text: "Vehicle bodies and van isolation up to 3.5 Tons", link: "/en/our-products" },
    { icon: "fa fa-globe", title: "carrier transicold", text: "Sale, installation and 0-24 Service of Carrier cooling units", link: "/en/van-isolations" },
    { icon: "fa fa-desktop", title: "documentation", text: "Detailed quotation within 12 hours with full technical documentation", link: "/en/quotation" },
  ],
  welcomeTitle: "Welcome to Autotherm Ltd.!",
  welcomeText: "Since 1992, Autotherm Ltd. has been manufacturing cooled vehicles, deceased transport vehicles, and commercial vehicle bodies. Our goal is to provide the highest quality, custom-tailored solutions. We proudly deliver our products not only in Hungary but across Europe.",
  videoId: "5QShNg3oKcA",
  productSections: [
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg",
      title: "Refrigerated Van Conversion",
      text: "Van isolation and installation of cooling units. Custom solutions for efficient cold logistics. Lightweight box bodies, refrigerated conversions, and special vehicle bodies.",
      detailLink: "/en/our-products",
      quoteLink: "/en/quotation",
    },
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg",
      title: "Chassis Commercial Bodies",
      text: "Box bodies for 3.5T chassis. Aluminium box, refrigerated box, flatbed with tarpaulin and special bodies. AT Strong® insulation with stainless steel or GRP interior lining.",
      detailLink: "/en/our-products",
      quoteLink: "/en/quotation",
    },
  ],
  gallery: [
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "Vehicle bodies", link: "/en/galeries" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Cooled conversion", link: "/en/galeries" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "Special conversion", link: "/en/galeries" },
  ],
  testimonials: [
    { text: "Excellent quality refrigerated van built exactly to our specs. The service background is outstanding.", name: "John Smith", company: "CoolTrans Ltd." },
    { text: "We have ordered multiple vehicles from them. Always on time, meeting deadlines perfectly.", name: "Peter Brown", company: "EuroFridge Logistics" },
    { text: "Professional team, flexible approach. Carrier service available 0-24, which is crucial for us.", name: "Robert Wilson", company: "ColdChain Solutions" },
  ],
  stats: [
    { number: "2800", label: "Happy clients" },
    { number: "265", label: "Conversions/year" },
    { number: "32", label: "Employees" },
    { number: String(yearsSince()), label: "Years of experience" },
  ],
  ctaTitle: "Request a Quotation Today!",
  ctaText: "We will provide a quotation within 12 hours.",
  ctaBtn: "Request a Quotation",
  ctaLink: "/en/quotation",
};

const deContent = {
  slideTitle: "3,5T Kühlfahrzeuge, 31 Jahre",
  slideSub: "Nach Ihren Wünschen gebaut",
  subtitle: "Kühltransporter, Bestattungswagen, Kastenwagenisolierung und Fahrgestellaufbauten - Reparatur und Service.",
  h1: "Kühlfahrzeug- und Kühlkoffer-Herstellung",
  icons: [
    { icon: "fa fa-gears", title: "herstellung", text: "Fahrzeugaufbauten und Kühlkoffer bis zu 3,5 Tonnen", link: "/de/kuehlfahrzeug" },
    { icon: "fa fa-globe", title: "carrier transicold", text: "Verkauf, Einbau und 0-24 Service von Carrier Kühlaggregaten", link: "/de/kontakt" },
    { icon: "fa fa-desktop", title: "dokumentierung", text: "Angebot innerhalb von 12 Stunden mit technischer Dokumentation", link: "/de/anfrage" },
  ],
  welcomeTitle: "Willkommen bei Autotherm GmbH!",
  welcomeText: "Seit 1992 fertigt Autotherm GmbH Kühlfahrzeuge, Bestattungswagen und Nutzfahrzeugaufbauten. Unser Ziel ist es, unseren Kunden die höchste Qualität und maßgeschneiderte Lösungen zu bieten. Wir liefern unsere Produkte nicht nur in Ungarn, sondern in ganz Europa.",
  videoId: "5QShNg3oKcA",
  productSections: [
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg",
      title: "Kühltransporter Umbau",
      text: "Kastenwagenisolierung und Einbau von Kühlaggregaten. Maßgeschneiderte Lösungen für eine effiziente Kühllogistik. Leichte Kofferaufbauten, Kühlumbauten und Spezialaufbauten.",
      detailLink: "/de/kuehlfahrzeug",
      quoteLink: "/de/anfrage",
    },
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg",
      title: "Fahrgestell Nutzwagen Aufbauten",
      text: "Kofferaufbauten für 3,5T Fahrgestelle. Aluminiumkoffer, Kühlkoffer, Pritschenaufbau mit Plane und Spezialaufbauten. AT Strong® Isolierung mit Edelstahl oder GFK Innenverkleidung.",
      detailLink: "/de/kuehlfahrzeug",
      quoteLink: "/de/anfrage",
    },
  ],
  gallery: [
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "Fahrzeugaufbauten", link: "/de/aufbauten-galerie" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Kühlumbau", link: "/de/aufbauten-galerie" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "Spezialaufbauten", link: "/de/aufbauten-galerie" },
  ],
  testimonials: [
    { text: "Hervorragende Qualität, genau nach unseren Vorstellungen gebaut. Der Service ist ausgezeichnet.", name: "Hans Müller", company: "KühlLogistik GmbH" },
    { text: "Wir haben bereits mehrere Fahrzeuge bestellt. Stets pünktlich und termingerecht.", name: "Klaus Schmidt", company: "FrischeTrans GmbH" },
    { text: "Professionelles Team, flexibler Ansatz. Carrier Service 0-24 verfügbar.", name: "Thomas Weber", company: "euroKühl Solutions" },
  ],
  stats: [
    { number: "2800", label: "Zufriedene Kunden" },
    { number: "265", label: "Umbauten/Jahr" },
    { number: "32", label: "Mitarbeiter" },
    { number: String(yearsSince()), label: "Jahre Erfahrung" },
  ],
  ctaTitle: "Fordern Sie noch heute ein Angebot an!",
  ctaText: "Wir erstellen Ihnen innerhalb von 12 Stunden ein Angebot.",
  ctaBtn: "Kostenloses Angebot",
  ctaLink: "/de/anfrage",
};

const roContent = {
  slideTitle: "3,5T vehicule frigorifice, 31 ani",
  slideSub: "Construite la comandă",
  subtitle: "Furgonete frigorifice, vehicule funerare, izolări și suprastructuri - producție, reparații și service.",
  h1: "Producție carosări frigorifice și izoterme",
  icons: [
    { icon: "fa fa-gears", title: "fabricație", text: "Suprastructuri și carosări frigorifice până la 3,5 tone", link: "/ro/carosari-furgoane-frigorifice" },
    { icon: "fa fa-globe", title: "carrier transicold", text: "Vânzare, instalare și service 0-24 unități frigorifice Carrier", link: "/ro/contact-2" },
    { icon: "fa fa-desktop", title: "documentație", text: "Ofertă detaliată în 12 ore cu documentație tehnică completă", link: "/ro/cerere-oferta" },
  ],
  welcomeTitle: "Bun venit la Autotherm SRL!",
  welcomeText: "Din 1992, Autotherm SRL fabrică carosări frigorifice, vehicule funerare și suprastructuri comerciale. Scopul nostru este să oferim clienților soluții de cea mai înaltă calitate, personalizate. Livrăm produsele noastre în Ungaria și în toată Europa.",
  videoId: "5QShNg3oKcA",
  productSections: [
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg",
      title: "Carosare frigorifică furgoane",
      text: "Izolare și instalare unități frigorifice. Soluții personalizate pentru logistică frigorifică eficientă. Suprastructuri ușoare tip box, conversii frigorifice și carosări speciale.",
      detailLink: "/ro/carosari-furgoane-frigorifice",
      quoteLink: "/ro/cerere-oferta",
    },
    {
      img: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg",
      title: "Suprastructuri comerciale",
      text: "Suprastructuri tip box pentru șasiuri de 3,5T. Cutie aluminiu, cutie frigorifică, platformă cu prelată și suprastructuri speciale. Izolație AT Strong® cu interior din oțel inoxidabil sau fibră de sticlă.",
      detailLink: "/ro/carosari-furgoane-frigorifice",
      quoteLink: "/ro/cerere-oferta",
    },
  ],
  gallery: [
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "Suprastructuri", link: "/ro/galerie-foto" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Conversie frigorifică", link: "/ro/galerie-foto" },
    { img: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "Conversie specială", link: "/ro/galerie-foto" },
  ],
  testimonials: [
    { text: "Caroserie frigorifică de calitate excelentă, construită exact după specificațiile noastre.", name: "Ion Popescu", company: "FrigoDist SRL" },
    { text: "Am comandat multiple vehicule. Întotdeauna la timp, respectând termenele.", name: "Andrei Ionescu", company: "Logistică Refrigerată" },
    { text: "Echipă profesionistă, abordare flexibilă. Service Carrier disponibil 0-24.", name: "Mihai Dumitru", company: "Soluții Lanț Rece" },
  ],
  stats: [
    { number: "2800", label: "Clienți mulțumiți" },
    { number: "265", label: "Conversii/an" },
    { number: "32", label: "Angajați" },
    { number: String(yearsSince()), label: "Ani experiență" },
  ],
  ctaTitle: "Cereți o ofertă astăzi!",
  ctaText: "Vă vom oferi o ofertă în 12 ore.",
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
      <section className="content-section black-text white-bg top-spacing-medium bottom-spacing-big title-spacing-big align-center">
        <div className="wrap-column">
          <div className="content-column1">
            <div className="content-section-heading">
              <p className="content-section-subtitle">{c.subtitle}</p>
              <h1>{c.h1}</h1>
            </div>
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
      <section className="content-section black-text gray-bg top-spacing-medium bottom-spacing-medium">
        <div className="wrap-column">
          <div className="animate-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.icons.map((item) => (
              <a key={item.title} href={item.link} className="icon-box block">
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
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{c.welcomeTitle}</h2>
              <p className="text-base leading-7 text-[#666] mb-6">{c.welcomeText}</p>
              <p className="font-bold text-[#262626]">— Autotherm Kft.</p>
            </div>
            <div className="aspect-video bg-gray-900 overflow-hidden">
              <YouTubeLazy videoId={c.videoId} title="Autotherm" />
            </div>
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      {c.productSections.map((prod, idx) => (
        <AnimateOnScroll key={idx} delay={idx * 150}>
          <section className={`content-section black-text ${idx % 2 === 0 ? 'white-bg' : 'gray-bg'} top-spacing-big bottom-spacing-big`}>
            <div className="wrap-column">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h2 className="text-3xl font-bold mb-6">{prod.title}</h2>
                  <p className="text-base leading-7 text-[#666] mb-6">{prod.text}</p>
                  <div className="flex gap-4 flex-wrap">
                    <Link href={prod.detailLink} className="button">Részletek</Link>
                    <Link href={prod.quoteLink} className="button" style={{ backgroundColor: '#1678a1' }}>Árajánlatkérés</Link>
                  </div>
                </div>
                <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-cover bg-center h-[300px] md:h-[400px]" style={{ backgroundImage: `url(${prod.img})` }} />
                </div>
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      ))}

      <AnimateOnScroll>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>Galéria</h2>
          </div>
          <div className="animate-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.gallery.map((item) => (
              <a key={item.title} href={item.link} className="gallery-card block">
                <div className="h-[300px] bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }} />
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
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>{lang === "hu" ? "Ügyfeleink véleménye" : lang === "de" ? "Kundenstimmen" : lang === "ro" ? "Opiniile clienților" : "Testimonials"}</h2>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">&ldquo;{c.testimonials[0].text}&rdquo;</p>
            <p className="testimonial-author">{c.testimonials[0].name}</p>
            <p className="testimonial-company">{c.testimonials[0].company}</p>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="w-3 h-3 rounded-full bg-[#4a68a9]" />
            <div className="w-3 h-3 rounded-full bg-[#d9d9d9]" />
            <div className="w-3 h-3 rounded-full bg-[#d9d9d9]" />
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
      <section className="content-section black-text gray-bg top-spacing-medium bottom-spacing-medium align-center">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>{lang === "hu" ? "Referencia ügyfeleink" : lang === "de" ? "Referenzkunden" : lang === "ro" ? "Clienți de referință" : "Our Clients"}</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <img src="/images/partner-logos.jpg" alt="Partner logos" className="max-w-full h-auto max-h-24 md:max-h-32 opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
      <section className="stats-section py-24" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
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
      <section className="content-section white-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <h2 className="text-3xl font-bold mb-4">{c.ctaTitle}</h2>
          <Link href={c.ctaLink} className="button mt-4">
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
