import type { Metadata } from "next";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Cine suntem noi? - Autotherm SRL" };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Cine suntem noi?</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Compania noastră a fost fondată în 1992 sub numele Autotherm SRL. Fondatorii, László Csurgó și Dkfm. Peter Knerer, au înființat compania cu scopul de a introduce echipamentele de refrigerare Carrier pe piața maghiară. Din 1995, efectuăm și reparații Thermo King, devenind centrul de service frigorific lider în Ungaria de Sud.</p>
            <p className="text-base leading-7 text-[#666] mb-6">Astăzi operăm pe 1500 m² cu 4 hale de producție. Cei 33 de angajați ai noștri lucrează zilnic pentru a impresiona clienții cu munca și serviciile noastre.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Repere istorice</h2></div>
          <div className="relative border-l-4 border-[#4a68a9] ml-4 space-y-8 max-w-3xl mx-auto">
            {[
              { year: "1991", text: "Rădăcini austriece - László Csurgó a acumulat experiență în industria vehiculelor frigorifice în Austria." },
              { year: "1992", text: "Înființarea reprezentanței Carrier în Ungaria. Se înființează Autotherm SRL." },
              { year: "1995", text: "Reprezentanță Thermo King - devenim centrul de service frigorific lider." },
              { year: "2007", text: "Din nou reprezentanță Carrier - vindem cele mai multe unități Carrier la categoria 3,5T." },
              { year: "2012", text: "Nouă locație - de zece ori mai multe vehicule pot fi produse simultan." },
            ].map((m) => (
              <div key={m.year} className="ml-8 relative">
                <div className="absolute -left-[2.85rem] w-10 h-10 bg-[#4a68a9] rounded-full flex items-center justify-center text-white text-sm font-bold">{m.year}</div>
                <div className="p-6 border border-[#e0e0e0]">
                  <p className="font-bold text-[#4a68a9] mb-2">{m.year}</p>
                  <p className="text-[#666]">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={450}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big align-center">
        <div className="wrap-column">
          <h2 className="text-2xl font-bold mb-6">Solicitați o ofertă!</h2>
          <Link href="/ro/cerere-oferta" className="button">Cerere ofertă</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
