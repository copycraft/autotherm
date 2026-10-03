import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import Eyebrow from "@/app/components/ui/Eyebrow";
import { ECO_CONTACT, ECO_PATHS, ECO_SEO } from "@/app/lib/eco";

export const metadata: Metadata = {
  title: ECO_SEO.technology.title,
  description: ECO_SEO.technology.description,
  alternates: { canonical: ECO_PATHS.technology },
};

const STEPS = [
  {
    title: "Saját akkupakk",
    body: "A hűtőegységet egy önálló, saját akkumulátorcsomag táplálja – nem a jármű hajtóakkuja.",
  },
  {
    title: "Ciklikus töltés",
    body: "Az akkupakk ciklikusan töltődik, és akár hálózatról is üzemeltethető: akkis + hálózati hűtő.",
  },
  {
    title: "Hűtés álló járműnél is",
    body: "A hűtési láncolat akkor sem szakad meg, ha a jármű áll – az egység tovább működik.",
  },
  {
    title: "Változatlan hatótáv",
    body: "Mivel a hűtés nem a hajtóakkuból fogyaszt, a furgon hatótávja kiszámítható marad.",
  },
];

const COMPARISON = {
  drive: [
    "A hűtés energiája a jármű hatótávjából fogy",
    "A napi útvonal kevésbé tervezhető",
  ],
  own: [
    "Változatlan hatótáv",
    "A hűtési lánc álló járműnél sem szakad meg",
    "Akkumulátorról és hálózatról is működik",
    "Pár órán belül feltölthető, hosszú hűtési üzemidő",
  ],
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technológia"
        title="Önellátó hűtőegység saját akkupakkal"
        lead="A hatótávolság megtartásának érdekében 6 m3 rakterű furgonok esetében mi egy önellátó, saját, ciklikus töltésű akkupakkal rendelkező hűtőegység mellett tettük le a voksunkat."
      />

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
              Így működik
            </h2>
          </Reveal>
          <RevealGroup className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span
              className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-ink-200 lg:block"
              aria-hidden="true"
            />
            {STEPS.map((step, i) => (
              <RevealItem key={step.title} className="relative text-center">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-black text-brand-600 tabular-nums ring-2 ring-brand-600">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-lg font-extrabold tracking-tight text-ink-900">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-600">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow label="Miért nem a hajtóakkuról?" tone="light" />
            <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
              A hűtés ne a hatótávot fogyassza
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Reveal className="rounded-3xl bg-ink-50 p-8 panel-ring">
              <p className="text-sm font-bold tracking-[0.15em] text-ink-500 uppercase">
                Hűtés a hajtóakkuról
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {COMPARISON.drive.map((t) => (
                  <li key={t} className="flex gap-3 text-base text-ink-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="rounded-3xl bg-ink-950 p-8">
              <p className="text-sm font-bold tracking-[0.15em] text-frost-300 uppercase">
                Önellátó akkupakkal – Autotherm
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {COMPARISON.own.map((t) => (
                  <li key={t} className="flex gap-3 text-base font-semibold text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-5 w-5 shrink-0 text-frost-300" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink-600">
              Az elektromos furgon hatótávolságának kiszámíthatósága és a biztonságos hűtés
              mellett, a garanciális hűtős átalakítások teszik igazán hatékonnyá az általunk
              átalakított elektromos hűtős járműveket.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Kíváncsi, melyik megoldás illik a flottájához?"
        body="Kollégánk elmondja, hogyan alakítjuk át az Ön elektromos furgonját hűtőautóvá."
        primaryLabel="Árajánlatot kérek"
        quoteHref={ECO_PATHS.quote}
        phone={ECO_CONTACT.phone}
        phoneHref={ECO_CONTACT.phoneHref}
      />
    </>
  );
}
