import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import type { Lang } from "@/app/lib/constants";
import { HEARSE_CONTACT, HEARSE_WHY_ICONS, getHearseDict, hearsePath } from "@/app/lib/hearse";

export default function HearseWhyPage({ lang }: { lang: Lang }) {
  const dict = getHearseDict(lang);
  const t = dict.why;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow label={t.logisticsEyebrow} tone="light" />
            {t.logistics.map((p, i) => (
              <p key={i} className={`${i ? "mt-5" : "mt-6"} text-lg leading-relaxed text-ink-600`}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <blockquote className="rounded-3xl bg-brand-600 p-8 text-2xl font-extrabold tracking-tight text-balance text-white sm:text-3xl">
              {t.quote}
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
              {t.benefitsTitle}
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.benefits.map((b, i) => (
              <RevealItem key={b.title} className="panel-ring rounded-3xl bg-white p-7 shadow-soft">
                <Icon name={HEARSE_WHY_ICONS[i % HEARSE_WHY_ICONS.length]} className="h-7 w-7 text-brand-600" />
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
                {dict.case.title}
              </h2>
            </Reveal>
            {dict.case.body.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="mt-6 text-base leading-relaxed text-ink-600">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-3xl bg-ink-950 p-8">
              <p className="text-[11px] font-bold tracking-[0.2em] text-frost-300 uppercase">
                {t.bestEyebrow}
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-base font-semibold text-white">
                {t.best.map((b) => (
                  <li key={b} className="flex gap-3">
                    <Icon name="medal" className="h-5 w-5 shrink-0 text-frost-300" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[11px] font-bold tracking-[0.2em] text-frost-300 uppercase">
                {t.cargoEyebrow}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {t.cargo.map((c) => (
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
