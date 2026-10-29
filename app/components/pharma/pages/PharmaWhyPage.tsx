import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import type { Lang } from "@/app/lib/constants";
import type { IconName } from "@/app/lib/page-content";
import { PHARMA_CONTACT, getPharmaDict, pharmaPath } from "@/app/lib/pharma";

/** Temperature, hygiene, traceability, reliability. */
const REQ_ICONS: IconName[] = ["thermometer", "shield", "check", "clock"];

export default function PharmaWhyPage({ lang }: { lang: Lang }) {
  const dict = getPharmaDict(lang);
  const t = dict.why;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image="/images/caddy-reefer-interior.webp"
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow label={t.reqEyebrow} tone="light" />
            <RevealText
              as="h2"
              text={t.reqTitle}
              className="mt-4 block max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.reqs.map((r, i) => (
              <RevealItem key={r.title} className="panel-ring rounded-3xl bg-ink-50 p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                  <Icon name={REQ_ICONS[i]} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight text-ink-900">{r.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-600">{r.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl border-l-4 border-brand-400 pl-5 text-sm leading-relaxed text-ink-600">
              {t.note}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mesh-hero py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow label={t.stepsEyebrow} />
            <RevealText
              as="h2"
              text={t.stepsTitle}
              className="mt-4 block max-w-3xl text-3xl font-black tracking-tighter text-balance text-white sm:text-5xl"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s, i) => (
              <RevealItem key={s.title} className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10">
                <span className="text-5xl font-black tracking-tighter text-frost-300 tabular-nums" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <Reveal className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <blockquote className="rounded-3xl bg-frost-300 p-8 text-2xl font-extrabold tracking-tight text-balance text-ink-950 sm:p-12 sm:text-4xl">
            {t.quote}
          </blockquote>
        </Reveal>
      </section>

      <CtaBand
        title={t.cta.title}
        body={t.cta.body}
        primaryLabel={dict.common.getQuote}
        quoteHref={pharmaPath("quote", lang)}
        phone={PHARMA_CONTACT.phone}
        phoneHref={PHARMA_CONTACT.phoneHref}
      />
    </>
  );
}
