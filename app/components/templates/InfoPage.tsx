import Image from "next/image";
import MagneticButton from "@/app/components/motion/MagneticButton";
import {
  DollyImage,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
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
  heroImage,
}: {
  content: InfoPageContent;
  lang: Lang;
  dict: Dict;
  heroImage?: string;
}) {
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        image={heroImage}
      >
        <MagneticButton href={quoteHref} variant="primary">
          {dict.common.getQuote}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </MagneticButton>
      </PageHero>

      {/* The page's own plate lives here, at a size where it stays sharp. */}
      {content.heroImage && (
        <section className="bg-white pt-20 sm:pt-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <DollyImage>
              <div className="relative overflow-hidden rounded-3xl shadow-lifted panel-ring">
                <Image
                  src={content.heroImage}
                  alt={content.title}
                  width={1040}
                  height={585}
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            </DollyImage>
          </div>
        </section>
      )}

      {content.features && content.features.length > 0 && (
        <section className="mesh-light py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealGroup className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              <div key={section.title}>
                <Reveal>
                  <h2 className="text-3xl font-extrabold tracking-tighter text-balance text-ink-900 sm:text-4xl">
                    {section.title}
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
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
              </div>
            ))}
          </div>
        </section>
      )}

      {content.gallery && content.gallery.length > 0 && (
        <section className="mesh-light py-24 sm:py-32">
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
