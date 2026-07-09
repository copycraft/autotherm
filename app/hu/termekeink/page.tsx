import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };


export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg)' }}>
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4">
            <h1>Termékeink</h1>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Hűtőautók egyedi igényekre szabva a hatékony hűtött logisztikához. Könnyű dobozos felépítmények, hűtős átalakítások és speciális járműfelépítmények széles választéka.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>3,5 tonnás hűtős furgonok</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Hűtős átalakítás", text: "Furgonok utólagos raktérszigetelése és hűtőberendezéssel történő felszerelése." },
              { title: "Hússzállító hűtőautó", text: "Speciális hőszigetelt raktér a húsipari termékek biztonságos szállításához." },
              { title: "Fagylalt- és sütemény szállító", text: "Akár -20°C-os raktérhőmérséklet biztosítása a nyári hőségben is." },
              { title: "Gyógyszerszállító hűtőautó", text: "Precíziós hőmérséklet-szabályozás gyógyszeripari igényekre szabva." },
              { title: "Zöldség- és gyümölcsszállító", text: "Optimális hőmérséklet és páratartalom a friss áru minőségének megőrzéséhez." },
              { title: "Virág- és dísznövény szállító", text: "Kíméletes szállítás megfelelő hőmérsékleten, egyedi belső kialakítással." },
            ].map((p) => (
              <div key={p.title} className="p-6 border border-[#e0e0e0] hover:border-[#4a68a9] transition-colors">
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-[#666] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>3,5 tonnás alvázas haszonjárművek</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Hűtős felépítmény", text: "Hőszigetelt dobozos felépítmények hűtőberendezéssel kombinálva." },
              { title: "Alumínium dobozos felépítmény", text: "Könnyű, korrózióálló alumínium karosszéria." },
              { title: "Platós-ponyvás felépítmény", text: "Sokoldalú platós kialakítás ponyvafedéllel." },
              { title: "Speciális felépítmény", text: "Egyedi igényekre szabott járműfelépítmények." },
            ].map((p) => (
              <div key={p.title} className="p-6 border border-[#e0e0e0] hover:border-[#4a68a9] transition-colors">
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-[#666] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={600}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading">
            <h2>Elhunytszállító autók</h2>
          </div>
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">AT Strong® hőszigeteléssel, rozsdamentes vagy üvegszálas belső bevonattal, +18°C-os raktérhűtéssel, több szintes változatban és speciális megoldásokkal. Teljes körű ügyintézéssel.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={750}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <div className="p-12 border border-[#e0e0e0] max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Kérje személyre szabott ajánlatunkat!</h2>
            <Link href="/hu/arajanlatkeres" className="button">Ajánlatkérés</Link>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
