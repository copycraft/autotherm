import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };


export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Wer sind wir?</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Unser Unternehmen wurde 1992 unter dem Namen Autotherm GmbH gegründet. Die Gründer, László Csurgó und Dkfm. Peter Knerer, gründeten das Unternehmen mit dem Ziel, Carrier Kühlaggregate auf dem ungarischen Markt einzuführen. Seit 1995 führen wir auch Thermo King Reparaturen durch und wurden zum führenden Kühlservices in Südungarn.</p>
            <p className="text-base leading-7 text-[#666] mb-6">Heute arbeiten wir auf 1500 m² mit 4 Produktionshallen. Unsere 33 Mitarbeiter arbeiten täglich daran, unsere Kunden mit unserer Arbeit und unserem Service zu begeistern.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
      <section className="content-section black-text gray-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Unsere Meilensteine</h2></div>
          <div className="relative border-l-4 border-[#4a68a9] ml-4 space-y-8 max-w-3xl mx-auto">
            {[
              { year: "1991", text: "Österreichische Wurzeln - László Csurgó sammelte Erfahrung in der Kühlfahrzeugbranche." },
              { year: "1992", text: "Gründung der ungarischen Carrier-Vertretung. Autotherm GmbH wird gegründet." },
              { year: "1995", text: "Thermo King Vertretung - wir werden Ungarns führendes Kühlservice-Zentrum." },
              { year: "2007", text: "Erneute Carrier-Vertretung - heute verkaufen wir die meisten Carrier in der 3,5T Kategorie." },
              { year: "2012", text: "Neuer Standort - zehnmal mehr Fahrzeuge können gleichzeitig produziert werden." },
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
          <h2 className="text-2xl font-bold mb-6">Fordern Sie Ihr Angebot an!</h2>
          <Link href="/de/anfrage" className="button">Kostenloses Angebot</Link>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
