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
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import { COMPANY, type Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";
import type { InfoPageContent } from "@/app/lib/page-content";
import { pathFor } from "@/app/lib/routes";

/**
 * Solution - single-product detail layout: the page's plate beside a
 * datasheet of features, lettered option tiles and a photo strip.
 */
export default async function SolutionPage({
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
        </MagneticButton>
        <MagneticButton href={COMPANY.phoneHref} variant="ghost">
          {COMPANY.phone}
        </MagneticButton>
      </PageHero>

      {content.features && content.features.length > 0 && (
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            {content.heroImage && (
              <div className="lg:col-span-4">
                <DollyImage className="lg:sticky lg:top-28">
                  <div className="panel-ring overflow-hidden rounded-3xl shadow-lifted">
                    <Image
                      src={content.heroImage}
                      alt={content.title}
                      width={600}
                      height={750}
                      sizes="(min-width: 1024px) 24rem, 100vw"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                </DollyImage>
              </div>
            )}
            <div className={content.heroImage ? "lg:col-span-8" : "lg:col-span-12"}>
              <Eyebrow label={content.eyebrow} tone="light" />
              <RevealGroup className="mt-8 border-b border-ink-900">
                {content.features.map((f, i) => (
                  <RevealItem
                    key={f.title}
                    className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-ink-900 py-8 sm:grid-cols-12 sm:gap-x-8"
                  >
                    <span className="text-sm font-black text-brand-600 tabular-nums sm:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-ink-900 sm:col-span-5">
                      <Icon name={f.icon} className="h-6 w-6 shrink-0 text-ink-300 transition-colors duration-300 group-hover:text-brand-600" />
                      {f.title}
                    </h2>
                    <p className="col-span-2 text-base leading-relaxed text-ink-600 sm:col-span-6">
                      {f.body}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>
      )}

      {content.sections?.map((section) => (
        <section key={section.title} className="mesh-light py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <Reveal className="lg:col-span-5">
              <h2 className="text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
                {section.title}
              </h2>
              {section.body.map((p, i) => (
                <p key={i} className="mt-6 text-lg leading-relaxed text-ink-600">
                  {p}
                </p>
              ))}
            </Reveal>
            {section.bullets && (
              <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                {section.bullets.map((b, i) => (
                  <RevealItem
                    key={b}
                    className="panel-ring flex items-start gap-5 rounded-3xl bg-white p-6 shadow-soft"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-950 text-base font-black text-frost-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <p className="pt-2 text-sm leading-relaxed font-semibold text-ink-800">{b}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        </section>
      ))}

      {content.gallery && content.gallery.length > 0 && (
        <section className="bg-white py-24">
          <RevealGroup className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {content.gallery.slice(0, 6).map((src, i) => (
              <RevealItem
                key={src}
                className={`overflow-hidden rounded-3xl ${i % 3 === 1 ? "sm:translate-y-10" : ""}`}
              >
                <Image
                  src={src}
                  alt={dict.gallery.imageAlt}
                  width={600}
                  height={750}
                  sizes="(min-width: 640px) 24rem, 100vw"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
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
