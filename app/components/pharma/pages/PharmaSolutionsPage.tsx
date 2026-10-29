import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import type { Lang } from "@/app/lib/constants";
import { ECO_LINK, PHARMA_CONTACT, getPharmaDict, pharmaPath } from "@/app/lib/pharma";

export default function PharmaSolutionsPage({ lang }: { lang: Lang }) {
  const dict = getPharmaDict(lang);
  const t = dict.solutions;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image="/images/eexpert-reefer-strip-curtain.webp"
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow label={t.vehiclesEyebrow} tone="light" />
            <RevealText
              as="h2"
              text={t.vehiclesTitle}
              className="mt-4 block max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {t.vehicles.map((v) => (
              <RevealItem key={v.title} className="panel-ring rounded-3xl bg-ink-50 p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                  <Icon name="truck" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight text-ink-900">{v.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-600">{v.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow label={t.optionsEyebrow} tone="light" />
            <RevealText
              as="h2"
              text={t.optionsTitle}
              className="mt-4 block max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {t.options.map((o) => (
              <RevealItem key={o} className="panel-ring flex items-center gap-4 rounded-2xl bg-white px-6 py-5 shadow-soft">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                <span className="text-base font-semibold text-ink-800">{o}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mesh-hero py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-8">
            <RevealText
              as="h2"
              text={t.electricTitle}
              className="block text-3xl font-black tracking-tighter text-balance text-white sm:text-5xl"
            />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">{t.electricBody}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:justify-self-end">
            <a
              href={ECO_LINK}
              className="group inline-flex items-center gap-2 rounded-lg bg-white/10 px-7 py-3.5 text-sm font-bold tracking-tight text-white ring-1 ring-white/20 transition-colors hover:bg-white/15"
            >
              {t.electricLink}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </Reveal>
        </div>
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
