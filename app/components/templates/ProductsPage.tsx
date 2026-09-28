import Image from "next/image";
import Link from "next/link";
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
import type { Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";
import type { InfoPageContent } from "@/app/lib/page-content";
import { pathFor } from "@/app/lib/routes";

/**
 * Products - catalogue layout: numbered jump index, alternating showcase
 * rows, dark build-spec panel and a base-vehicle marquee.
 */
export default async function ProductsPage({
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
  const products = content.features ?? [];
  const spec = content.sections?.[0];

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

      {products.length > 0 && (
        <nav aria-label={content.eyebrow} className="border-b border-ink-100 bg-white">
          <ol className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">
            {products.map((p, i) => (
              <li key={p.title}>
                <a
                  href={`#product-${i + 1}`}
                  className="group flex h-full flex-col gap-1 border-b-2 border-transparent px-3 py-5 transition-colors hover:border-brand-600 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                >
                  <span className="text-xs font-black text-brand-600 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-snug font-bold text-ink-700 group-hover:text-ink-900">
                    {p.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {products.length > 0 && (
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 sm:gap-32 sm:px-6 lg:px-8">
            {products.map((p, i) => {
              const href = p.href ? pathFor(p.href, lang) : null;
              const flip = i % 2 === 1;
              return (
                <article
                  key={p.title}
                  id={`product-${i + 1}`}
                  className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
                >
                  {p.image && (
                    <DollyImage className={flip ? "lg:order-2" : ""}>
                      <div className="panel-ring overflow-hidden rounded-3xl shadow-lifted">
                        <Image
                          src={p.image}
                          alt={p.title}
                          width={720}
                          height={540}
                          sizes="(min-width: 1024px) 36rem, 100vw"
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </div>
                    </DollyImage>
                  )}
                  <Reveal direction={flip ? "right" : "left"} distance={32}>
                    <div className="flex items-center gap-4">
                      <span className="text-6xl font-black tracking-tighter text-brand-100 tabular-nums sm:text-7xl" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                        <Icon name={p.icon} className="h-5 w-5" />
                      </span>
                    </div>
                    <h2 className="mt-5 text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-4xl">
                      {p.title}
                    </h2>
                    <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-600">{p.body}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-6">
                      {href && (
                        <Link
                          href={href}
                          className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                        >
                          {dict.common.learnMore}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </Link>
                      )}
                      <Link
                        href={quoteHref}
                        className="text-sm font-bold text-ink-500 underline decoration-ink-200 underline-offset-4 transition-colors hover:text-ink-900 hover:decoration-ink-900"
                      >
                        {dict.common.getQuote}
                      </Link>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {spec && (
        <section className="mesh-hero py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <h2 className="text-3xl font-black tracking-tighter text-balance text-white sm:text-5xl">
                {spec.title}
              </h2>
              {spec.body.map((p, i) => (
                <p key={i} className="mt-6 text-lg leading-relaxed text-ink-300">
                  {p}
                </p>
              ))}
            </Reveal>
            {spec.bullets && (
              <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {spec.bullets.map((b, i) => (
                  <RevealItem key={b} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                    <p className="text-xs font-black text-frost-300 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-6 text-base leading-snug font-bold text-white">{b}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        </section>
      )}

      {content.strip && (
        <section className="overflow-hidden border-b border-ink-100 bg-white py-16">
          <p className="px-4 text-center text-xs font-bold tracking-[0.28em] text-ink-400 uppercase">
            {content.strip.title}
          </p>
          <ul className="mt-8 flex w-max animate-marquee items-center gap-10">
            {[...content.strip.items, ...content.strip.items].map((item, i) => (
              <li
                key={`${item}-${i}`}
                aria-hidden={i >= content.strip!.items.length ? true : undefined}
                className="flex items-center gap-10 text-3xl font-black tracking-tighter whitespace-nowrap text-ink-200 sm:text-5xl"
              >
                {item}
                <Icon name="snowflake" className="h-6 w-6 text-brand-300" />
              </li>
            ))}
          </ul>
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
