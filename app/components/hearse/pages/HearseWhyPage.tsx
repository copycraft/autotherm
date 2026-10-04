import HearseTestimonials from "@/app/components/hearse/HearseTestimonials";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import StatsBand from "@/app/components/site/StatsBand";
import type { Lang } from "@/app/lib/constants";
import { getDict } from "@/app/lib/dictionaries";
import { HEARSE_CONTACT, fillHearseFigures, getHearseDict, hearsePath } from "@/app/lib/hearse";

export default function HearseWhyPage({ lang }: { lang: Lang }) {
  const dict = getHearseDict(lang);
  const t = dict.why;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      {/* Six reasons */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
              {t.reasonsTitle}
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.reasons.map((r, i) => (
              <RevealItem key={r.title} className="panel-ring rounded-3xl bg-ink-50 p-8">
                <span className="text-sm font-black text-brand-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink-900">{fillHearseFigures(r.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{fillHearseFigures(r.body)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Everything in one hand */}
      <section className="bg-ink-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black tracking-tighter text-white sm:text-5xl">{t.oneHandTitle}</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.oneHand.map((o) => (
              <RevealItem key={o.title} className="rounded-3xl bg-white/5 p-7 ring-1 ring-frost-300/20">
                <h3 className="text-lg font-extrabold tracking-tight text-frost-300">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">{fillHearseFigures(o.body)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <blockquote className="mt-16 max-w-3xl text-2xl font-extrabold tracking-tight text-balance text-white sm:text-3xl">
              {t.quote.text}
              <footer className="mt-4 text-sm font-bold tracking-[0.15em] text-frost-300 uppercase">
                {t.quote.author}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <HearseTestimonials lang={lang} />

      <StatsBand lang={lang} dict={getDict(lang)} />

      <CtaBand
        title={t.cta.title}
        body={t.cta.body}
        primaryLabel={dict.common.getQuote}
        quoteHref={hearsePath("quote", lang)}
        phone={HEARSE_CONTACT.phone}
        phoneHref={HEARSE_CONTACT.phoneHref}
      />
    </>
  );
}
