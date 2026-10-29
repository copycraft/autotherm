import Image from "next/image";
import Link from "next/link";
import PharmaContactCard from "@/app/components/pharma/PharmaContactCard";
import PharmaHero from "@/app/components/pharma/PharmaHero";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import CtaBand from "@/app/components/site/CtaBand";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import type { Lang } from "@/app/lib/constants";
import {
  ECO_LINK,
  PHARMA_CONTACT,
  PHARMA_FEATURE_ICONS,
  PHARMA_GALLERY,
  getPharmaDict,
  pharmaPath,
} from "@/app/lib/pharma";

const arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function PharmaHomePage({ lang }: { lang: Lang }) {
  const dict = getPharmaDict(lang);
  const t = dict.home;
  const quoteHref = pharmaPath("quote", lang);
  const solutionsHref = pharmaPath("solutions", lang);

  return (
    <>
      <PharmaHero
        copy={dict.hero}
        quoteLabel={dict.common.getQuote}
        quoteHref={quoteHref}
        solutionsHref={solutionsHref}
      />

      {/* Why it matters */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5">
            <Eyebrow label={t.introEyebrow} tone="light" />
            <RevealText
              as="h2"
              text={t.introTitle}
              className="mt-4 block text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl"
            />
            <p className="mt-6 text-lg font-semibold text-brand-700">{t.introLead}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:pt-10">
            {t.introBody.map((p, i) => (
              <p key={i} className={`${i ? "mt-5 " : ""}text-lg leading-relaxed text-ink-600`}>
                {p}
              </p>
            ))}
            <Link href={solutionsHref} className="group mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
              {t.introLink}
              {arrow}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Temperature ranges */}
      <section className="mesh-hero py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow label={t.rangesEyebrow} />
            <RevealText
              as="h2"
              text={t.rangesTitle}
              className="mt-4 block max-w-3xl text-3xl font-black tracking-tighter text-balance text-white sm:text-5xl"
            />
          </Reveal>
          <RevealGroup className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {t.ranges.map((r) => (
              <RevealItem key={r.title} className="rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10">
                <p className="text-5xl font-black tracking-tighter text-frost-300 tabular-nums sm:text-6xl">{r.temp}</p>
                <h3 className="mt-6 text-xl font-extrabold tracking-tight text-white">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">{r.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Six features */}
      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow label={t.featuresEyebrow} tone="light" />
            <RevealText
              as="h2"
              text={t.featuresTitle}
              className="mt-4 block max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.features.map((f, i) => (
              <RevealItem key={f.title} className="panel-ring rounded-3xl bg-white p-7 shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                  <Icon name={PHARMA_FEATURE_ICONS[i]} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Close-up photos */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow label={t.galleryEyebrow} tone="light" />
            <RevealText
              as="h2"
              text={t.galleryTitle}
              className="mt-4 block max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PHARMA_GALLERY.map((g) => (
              <RevealItem key={g.src} className="panel-ring group overflow-hidden rounded-3xl bg-ink-50 shadow-soft">
                <Image
                  src={g.src}
                  alt={g.alt[lang]}
                  width={1280}
                  height={720}
                  sizes="(min-width: 1024px) 40rem, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Electric version */}
      <section className="mesh-hero py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-8">
            <Eyebrow label={t.electric.eyebrow} />
            <RevealText
              as="h2"
              text={t.electric.title}
              className="mt-4 block text-3xl font-black tracking-tighter text-balance text-white sm:text-5xl"
            />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">{t.electric.body}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:justify-self-end">
            <a
              href={ECO_LINK}
              className="group inline-flex items-center gap-2 rounded-lg bg-white/10 px-7 py-3.5 text-sm font-bold tracking-tight text-white ring-1 ring-white/20 transition-colors hover:bg-white/15"
            >
              {t.electric.link}
              {arrow}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow label={t.contactEyebrow} tone="light" />
            <RevealText
              as="h2"
              text={t.contactTitle}
              className="mt-4 block text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-4xl"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <PharmaContactCard lang={lang} intro={dict.common.callIntro} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={t.cta.title}
        body={t.cta.body}
        primaryLabel={dict.common.getQuote}
        quoteHref={quoteHref}
        phone={PHARMA_CONTACT.phone}
        phoneHref={PHARMA_CONTACT.phoneHref}
      />
    </>
  );
}
