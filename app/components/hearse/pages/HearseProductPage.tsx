import Image from "next/image";
import { DollyImage, Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import type { Lang } from "@/app/lib/constants";
import { HEARSE_CONTACT, HEARSE_DETAIL_PHOTOS, getHearseDict, hearsePath } from "@/app/lib/hearse";

const check = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export default function HearseProductPage({ lang }: { lang: Lang }) {
  const dict = getHearseDict(lang);
  const t = dict.product;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} image="/images/hearse/hero-2.webp" />

      {/* Specification */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-4">
            <RevealText
              as="h2"
              text={t.specTitle}
              className="block text-3xl font-black tracking-tighter text-ink-900 sm:text-5xl"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ul className="flex flex-col divide-y divide-ink-100 border-y border-ink-100">
              {t.spec.map((s) => (
                <li key={s} className="flex gap-3 py-4 text-base leading-relaxed text-ink-700">
                  {check}
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Detail photos */}
      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <RevealText
              as="h2"
              text={t.detailsTitle}
              className="block text-3xl font-black tracking-tighter text-ink-900 sm:text-5xl"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HEARSE_DETAIL_PHOTOS.map((src, i) => (
              <RevealItem key={src} className="panel-ring overflow-hidden rounded-3xl bg-white shadow-soft">
                <DollyImage>
                  <Image
                    src={src}
                    alt={t.details[i]}
                    width={2000}
                    height={940}
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 90vw"
                    className="aspect-[2/1] h-auto w-full object-cover"
                  />
                </DollyImage>
                <p className="px-6 py-4 text-base font-extrabold tracking-tight text-ink-900">{t.details[i]}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Cooling and the ceremonial hearse */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="rounded-3xl bg-ink-950 p-8 sm:p-10">
            <RevealText
              as="h2"
              text={t.coolingTitle}
              className="block text-2xl font-black tracking-tight text-white sm:text-3xl"
            />
            <ul className="mt-6 flex flex-col gap-4">
              {t.cooling.map((c) => (
                <li key={c} className="flex gap-3 text-base leading-relaxed text-ink-200">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-frost-300" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="panel-ring rounded-3xl bg-ink-50 p-8 sm:p-10">
            <RevealText
              as="h2"
              text={t.ceremonialTitle}
              className="block text-2xl font-black tracking-tight text-ink-900 sm:text-3xl"
            />
            {t.ceremonial.map((p) => (
              <p key={p} className="mt-4 text-base leading-relaxed text-ink-600">
                {p}
              </p>
            ))}
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
