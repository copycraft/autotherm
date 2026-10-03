import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import type { IconName } from "@/app/lib/page-content";
import { ECO_CASE, ECO_CONTACT, ECO_PATHS, ECO_SEO } from "@/app/lib/eco";

export const metadata: Metadata = {
  title: ECO_SEO.why.title,
  description: ECO_SEO.why.description,
  alternates: { canonical: ECO_PATHS.why },
};

/** "emissziómentesek, csendesek és jót tesznek a cég arculatának és zsebének" */
const BENEFITS: { icon: IconName; title: string; body: string }[] = [
  { icon: "heart", title: "Emissziómentes", body: "Helyi károsanyag-kibocsátás nélkül közlekedik – ott is, ahol a dízeleket korlátozzák." },
  { icon: "clock", title: "Csendes", body: "Halk működés a belvárosi és a korai vagy késő esti kiszállításokhoz." },
  { icon: "medal", title: "Jót tesz az arculatnak", body: "A zöld flotta erős üzenet a partnereknek és a vásárlóknak." },
  { icon: "check", title: "Jót tesz a zsebnek", body: "Az elektromos hűtős furgon a cég pénztárcájának is kedvez." },
];

const CARGO = ["Hús", "Sütemény", "Gyümölcs", "Zöldség", "Egyéb hűtött élelmiszer"];

export default function WhyElectricPage() {
  return (
    <>
      <PageHero
        eyebrow="Miért elektromos?"
        title="A jövő zöld vagy semmilyen."
        lead="A friss élelmiszerek logisztikája számos új kihívással néz szembe: a dízelüzemű járművek korlátozása és a városokban növekvő zaj és légszennyezés új megoldásokat igényel, például elektromos meghajtású kisteherautókat."
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow label="Változó városi logisztika" tone="light" />
            <p className="mt-6 text-lg leading-relaxed text-ink-600">
              Egyre nagyobb a kereslet a friss élelmiszerek iránt, az ellátási láncok
              összetettebbé váltak, és egyre több embernek szállítanak termékeket az
              otthonukba – a hatékony logisztika szerepe is egyre fontosabbá válik.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              A belső égésű motoroknak megjelentek az alternatívái: Egyre több gyártó kínál
              elektromos meghajtású haszongépjárműveket.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <blockquote className="rounded-3xl bg-brand-600 p-8 text-2xl font-extrabold tracking-tight text-balance text-white sm:text-3xl">
              De mennyire praktikusak a piacon elérhető járművek? Gazdaságosak-e egyáltalán?
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
              Az előnyök nyilvánvalóak
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <RevealItem key={b.title} className="panel-ring rounded-3xl bg-white p-7 shadow-soft">
                <Icon name={b.icon} className="h-7 w-7 text-brand-600" />
                <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{b.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-4xl">
                {ECO_CASE.title}
              </h2>
            </Reveal>
            {ECO_CASE.body.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="mt-6 text-base leading-relaxed text-ink-600">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-3xl bg-ink-950 p-8">
              <p className="text-[11px] font-bold tracking-[0.2em] text-frost-300 uppercase">
                Ahol a legjobban kihasználható
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-base font-semibold text-white">
                <li className="flex gap-3">
                  <Icon name="truck" className="h-5 w-5 shrink-0 text-frost-300" />
                  Belvárosi forgalom
                </li>
                <li className="flex gap-3">
                  <Icon name="truck" className="h-5 w-5 shrink-0 text-frost-300" />
                  Kiszállítás a nagyvárosokból a környező területekre
                </li>
              </ul>
              <p className="mt-8 text-[11px] font-bold tracking-[0.2em] text-frost-300 uppercase">
                Bármilyen hűtött áruhoz
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {CARGO.map((c) => (
                  <li key={c} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-ink-100">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Váltson zöldre a hűtött szállításban!"
        body="Elektromos hűtőautó önellátó hűtőegységgel – kérjen személyre szabott ajánlatot."
        primaryLabel="Árajánlatot kérek"
        quoteHref={ECO_PATHS.quote}
        phone={ECO_CONTACT.phone}
        phoneHref={ECO_CONTACT.phoneHref}
      />
    </>
  );
}
