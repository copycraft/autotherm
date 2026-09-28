import Image from "next/image";
import CountUp from "@/app/components/motion/CountUp";
import MagneticButton from "@/app/components/motion/MagneticButton";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import PartnersMarquee from "@/app/components/site/PartnersMarquee";
import StatsBand from "@/app/components/site/StatsBand";
import Icon from "@/app/components/ui/Icon";
import { BCP47, yearsSince, type Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";
import type { InfoPageContent } from "@/app/lib/page-content";
import { pathFor } from "@/app/lib/routes";

/**
 * Why us - asymmetric bento of reasons led by a live years-in-business
 * counter, then the company motto.
 */
export default async function WhyUsPage({
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
  const [lead, second, ...rest] = content.features ?? [];

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
      </PageHero>

      {lead && (
        <section className="mesh-light py-24 sm:py-32">
          <RevealGroup className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-6 lg:px-8">
            <RevealItem className="flex flex-col justify-between gap-10 rounded-4xl bg-ink-950 p-8 sm:p-10 md:col-span-3 md:row-span-2">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-frost-300">
                <Icon name={lead.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="text-[7rem] leading-none font-black tracking-tight text-white tabular-nums sm:text-[10rem]">
                  <CountUp value={yearsSince()} locale={BCP47[lang]} />
                </p>
                <p className="mt-3 text-sm font-bold tracking-[0.2em] text-frost-300 uppercase">
                  {dict.home.stats.years}
                </p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink-300">{lead.body}</p>
              </div>
            </RevealItem>

            {second && (
              <RevealItem className="relative min-h-72 overflow-hidden rounded-4xl md:col-span-3">
                {content.heroImage && (
                  <Image
                    src={content.heroImage}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 36rem, 100vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent" aria-hidden="true" />
                <div className="relative flex h-full flex-col justify-end p-8">
                  <h2 className="text-2xl font-extrabold tracking-tight text-white">{second.title}</h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-200">{second.body}</p>
                </div>
              </RevealItem>
            )}

            {rest.map((f, i) => {
              // First remaining tile sits beside the counter; the rest form a row of three.
              const span = i === 0 ? "md:col-span-3" : "md:col-span-2";
              const accent = i === 1;
              return (
                <RevealItem
                  key={f.title}
                  className={`${span} rounded-4xl p-8 ${
                    accent ? "bg-brand-600 text-white" : "panel-ring bg-white shadow-soft"
                  }`}
                >
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                      accent ? "bg-white/15 text-white" : "bg-brand-600/10 text-brand-600"
                    }`}
                  >
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <h2 className={`mt-5 text-xl font-extrabold tracking-tight ${accent ? "text-white" : "text-ink-900"}`}>
                    {f.title}
                  </h2>
                  <p className={`mt-2 text-sm leading-relaxed ${accent ? "text-brand-100" : "text-ink-600"}`}>
                    {f.body}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </section>
      )}

      {content.quote && (
        <section className="bg-white py-24 sm:py-32">
          <Reveal className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <figure className="border-l-4 border-brand-600 pl-8 sm:pl-12">
              <blockquote className="text-3xl font-extrabold tracking-tighter text-balance text-ink-900 sm:text-5xl">
                {content.quote.text}
              </blockquote>
              <figcaption className="mt-8 text-xs font-bold tracking-[0.28em] text-ink-500 uppercase">
                {content.quote.author}
              </figcaption>
            </figure>
          </Reveal>
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
