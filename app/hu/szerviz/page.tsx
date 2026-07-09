import type { Metadata } from "next";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Szerviz - Hűtőautó szerviz - Autotherm Kft." };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg)' }}>
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4"><h1>Szerviz</h1></div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Autotherm Kft. teljes körű szerviz szolgáltatást nyújt Carrier és Thermo King raktérhűtő berendezésekhez. 0-24 órás ügyeleti szolgálat. Hűtőberendezések diagnosztikája, javítása, karbantartása.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Szerviz szolgáltatásaink</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Carrier szerviz", text: "Carrier raktérhűtő berendezések teljes körű szervizelése, diagnosztika, javítás." },
              { title: "Thermo King szerviz", text: "Thermo King hűtőegységek karbantartása és javítása." },
              { title: "0-24 órás ügyelet", text: "Éjjel-nappali hívható szerviz ügyelet a folyamatos üzemmenet biztosításáért." },
              { title: "Karbantartás", text: "Rendszeres karbantartási csomagok a hűtőberendezések élettartamának meghosszabbításáért." },
              { title: "Alkatrész ellátás", text: "Eredeti Carrier és Thermo King alkatrészek raktárról." },
              { title: "Hibakód olvasás", text: "Modern diagnosztikai eszközökkel gyors és pontos hibameghatározás." },
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
          <h2 className="text-2xl font-bold mb-6">Szerviz bejelentés</h2>
          <Link href="/hu/kapcsolat" className="button">Kapcsolat</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
