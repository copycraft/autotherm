import Image from "next/image";
import MagneticButton from "@/app/components/motion/MagneticButton";
import {
  DollyImage,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import CtaBand from "@/app/components/site/CtaBand";
import PartnersMarquee from "@/app/components/site/PartnersMarquee";
import StatsBand from "@/app/components/site/StatsBand";
import Icon from "@/app/components/ui/Icon";
import { COMPANY, type Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";
import type { InfoPageContent } from "@/app/lib/page-content";
import { pathFor } from "@/app/lib/routes";

export default async function InfoPage({
  content,
  lang,
  dict,
}: {
  content: InfoPageContent;
  lang: Lang;
  dict: Dict;
}) {
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;

  return (
    <>
      <section className="mesh-hero relative overflow-hidden pt-40 pb-24 sm:pb-32">
        <div className="grid-overlay absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-32 left-1/3 h-[34rem] w-[34rem] rounded-full bg-brand-500/25 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Reveal direction="up" distance={16}>
              <div className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2">
                <span className="h-1.5 w-1.5 animate-shimmer rounded-full bg-frost-300" aria-hidden="true" />
                <p className="text-[11px] font-bold tracking-[0.18em] text-frost-200 uppercase">
                  {content.eyebrow}
                </p>
              </div>
            </Reveal>
            <RevealText
              as="h1"
              text={content.title}
              delay={0.1}
              className="mt-5 block text-4xl font-black tracking-tighter text-balance text-white sm:text-5xl xl:text-6xl"
            />
            <Reveal delay={0.3}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-300">
                {content.lead}
              </p>
            </Reveal>
            <Reveal delay={0.45} className="mt-9 flex flex-wrap gap-4">
              <MagneticButton href={quoteHref} variant="primary">
                {dict.common.getQuote}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </MagneticButton>
            </Reveal>
          </div>
          {content.heroImage && (
            <DollyImage className="relative">
              <div className="relative overflow-hidden rounded-4xl shadow-lifted ring-1 ring-white/15">
                <Image
                  src={content.heroImage}
                  alt={content.title}
                  width={880}
                  height={620}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" aria-hidden="true" />
              </div>
            </DollyImage>
          )}
        </div>
      </section>

      {content.features && content.features.length > 0 && (
        <section className="mesh-light py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {content.features.map((f) => (
                <RevealItem
                  key={f.title}
                  className="group panel-ring rounded-3xl bg-white p-8 shadow-soft transition-shadow duration-300 hover:shadow-lifted"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-600 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(39,79,226,0.3)]">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-lg font-extrabold tracking-tight text-ink-900">
                    {f.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                    {f.body}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {content.sections && content.sections.length > 0 && (
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto flex max-w-3xl flex-col gap-20 px-4 sm:px-6">
            {content.sections.map((section) => (
              <Reveal key={section.title}>
                <h2 className="text-3xl font-extrabold tracking-tighter text-balance text-ink-900 sm:text-4xl">
                  {section.title}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="mt-5 text-base leading-relaxed text-ink-600">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-7 flex flex-col gap-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-ink-700">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-brand-600" aria-hidden="true">
                          <Icon name="check" className="h-3.5 w-3.5" />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {content.gallery && content.gallery.length > 0 && (
        <section className="mesh-light py-24">
          <RevealGroup className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {content.gallery.map((src) => (
              <RevealItem key={src} className="overflow-hidden rounded-3xl">
                <DollyImage>
                  <Image
                    src={src}
                    alt={dict.gallery.imageAlt}
                    width={640}
                    height={480}
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </DollyImage>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      <StatsBand lang={lang} dict={dict} />
      <PartnersMarquee dict={dict} />
      <CtaBand
        title={content.cta.title}
        body={content.cta.body}
        primaryLabel={dict.common.getQuote}
        quoteHref={quoteHref}
      />
    </>
  );
}
