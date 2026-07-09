import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import { yearsSince } from "@/app/lib/constants";

type Props = { params: Promise<{ lang: string }> };


export default async function Page() {
  const years = yearsSince();
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs03.jpg)' }}>
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4"><h1>Miért mi?</h1></div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">{years} év tapasztalat a hűtőautó gyártásban. Hivatalos Carrier Transicold képviselet. 100% pénzvisszafizetési garancia. Egyedi igényekre szabott megoldások. Gyors határidők, megbízható minőség.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Miért válasszon minket?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: `${years} év tapasztalat`, text: "1992 óta foglalkozunk hűtőautók gyártásával és szervizelésével." },
              { title: "Carrier képviselet", text: "Hivatalos Carrier Transicold márkaképviselet és szerviz." },
              { title: "100% garancia", text: "100% pénzvisszafizetési garancia minden munkánkra." },
              { title: "Egyedi megoldások", text: "Minden járművet az Ön egyedi igényei szerint alakítunk ki." },
              { title: "Gyors határidők", text: "A jármű átalakítása akár 15 nap alatt." },
              { title: "Carrier szerviz", text: "Hivatalos Carrier Transicold szerviz." },
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
          <h2 className="text-2xl font-bold mb-6">Győződjön meg személyesen!</h2>
          <Link href="/hu/arajanlatkeres" className="button">Ajánlatkérés</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
