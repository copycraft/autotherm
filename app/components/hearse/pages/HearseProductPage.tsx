import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import Eyebrow from "@/app/components/ui/Eyebrow";
import type { Lang } from "@/app/lib/constants";
import { HEARSE_CONTACT, getHearseDict, hearsePath } from "@/app/lib/hearse";

const PRODUCT_SHOTS = [
  { src: "/images/hearse/product.webp", alt: "Elhunyt szállító raktér" },
  { src: "/images/hearse/steel-lining.webp", alt: "Rozsdamentes burkolat" },
  { src: "/images/hearse/steel-lining-ford.webp", alt: "Rozsdamentes burkolat Ford furgonban" },
  { src: "/images/hearse/pull-out-tray.webp", alt: "Kihúzható koporsótálca" },
  { src: "/images/hearse/rails.webp", alt: "Rögzítősínek" },
  { src: "/images/hearse/coffin-tray.webp", alt: "Koporsótálca" },
  { src: "/images/hearse/urn-holder.webp", alt: "Urnatartó" },
  { src: "/images/hearse/waeco-controller.webp", alt: "Raktérhűtés vezérlő" },
];

export default function HearseProductPage({ lang }: { lang: Lang }) {
  const dict = getHearseDict(lang);
  const t = dict.product;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
              {t.howTitle}
            </h2>
          </Reveal>
          <RevealGroup className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span
              className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-ink-200 lg:block"
              aria-hidden="true"
            />
            {t.steps.map((step, i) => (
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
            <Eyebrow label={t.compareEyebrow} tone="light" />
            <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
              {t.compareTitle}
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {PRODUCT_SHOTS.map((s) => (
              <RevealItem key={s.src} className="panel-ring overflow-hidden rounded-3xl bg-white shadow-soft">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={640}
                  height={480}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Reveal className="rounded-3xl bg-ink-50 p-8 panel-ring">
              <p className="text-sm font-bold tracking-[0.15em] text-ink-500 uppercase">{t.driveLabel}</p>
              <ul className="mt-6 flex flex-col gap-4">
                {t.drive.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ink-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="rounded-3xl bg-ink-950 p-8">
              <p className="text-sm font-bold tracking-[0.15em] text-frost-300 uppercase">{t.ownLabel}</p>
              <ul className="mt-6 flex flex-col gap-4">
                {t.own.map((item) => (
                  <li key={item} className="flex gap-3 text-base font-semibold text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-5 w-5 shrink-0 text-frost-300" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink-600">{t.closing}</p>
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
