import Image from "next/image";
import CountUp from "@/app/components/motion/CountUp";
import HorizontalGallery from "@/app/components/motion/HorizontalGallery";
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
import { BCP47, FOUNDED_YEAR, yearsSince, type Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";
import { galleryImages, type InfoPageContent } from "@/app/lib/page-content";
import { pathFor } from "@/app/lib/routes";

/**
 * About - editorial story layout: years-in-business numeral beside the
 * page's own plate, a fact rail, sticky story + timeline, motto band and a
 * photo collage of today's offer.
 */
export default async function AboutPage({
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
  const [story, offer] = content.sections ?? [];
  // Reference work for the scroll strip - skipping plates already on this page.
  const onPage = new Set([content.heroImage, ...(content.gallery ?? [])]);
  const stripImages = galleryImages
    .filter((img) => img.category !== "special" && !onPage.has(img.src))
    .slice(0, 8)
    .map((img) => img.src);

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

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <Eyebrow label={`${FOUNDED_YEAR} – ${new Date().getFullYear()}`} tone="light" />
            <p className="mt-4 text-[8rem] leading-none font-black tracking-tight text-ink-900 tabular-nums sm:text-[11rem]">
              <CountUp value={yearsSince()} locale={BCP47[lang]} />
            </p>
            <p className="mt-4 text-sm font-bold tracking-[0.2em] text-ink-500 uppercase">
              {dict.home.stats.years}
            </p>
          </Reveal>
          {content.heroImage && (
            <DollyImage>
              <div className="panel-ring overflow-hidden rounded-3xl shadow-lifted">
                <Image
                  src={content.heroImage}
                  alt={content.title}
                  width={720}
                  height={540}
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </DollyImage>
          )}
        </div>

        {content.features && content.features.length > 0 && (
          <RevealGroup className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-x-10 gap-y-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {content.features.map((f) => (
              <RevealItem key={f.title} className="border-t-2 border-brand-600 pt-6">
                <Icon name={f.icon} className="h-7 w-7 text-brand-600" />
                <h2 className="mt-4 text-lg font-extrabold tracking-tight text-ink-900">{f.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </section>

      {(story || content.timeline) && (
        <section className="mesh-light py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                {content.timeline && <Eyebrow label={content.timeline.title} tone="light" />}
                {story && (
                  <Reveal>
                    <h2 className="mt-4 text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
                      {story.title}
                    </h2>
                    {story.body.map((p, i) => (
                      <p key={i} className="mt-6 text-base leading-relaxed text-ink-600">
                        {p}
                      </p>
                    ))}
                  </Reveal>
                )}
              </div>
            </div>

            {content.timeline && (
              <ol className="relative lg:col-span-7">
                <span className="absolute top-2 bottom-2 left-[7px] w-px bg-ink-200" aria-hidden="true" />
                {content.timeline.items.map((item, i) => {
                  const last = i === content.timeline!.items.length - 1;
                  return (
                    <li key={item.year + item.title} className="relative pb-12 pl-12 last:pb-0">
                      <span
                        className={`absolute top-3 left-0 h-[15px] w-[15px] rounded-full border-2 ${
                          last ? "border-brand-600 bg-brand-600" : "border-brand-600 bg-ink-50"
                        }`}
                        aria-hidden="true"
                      />
                      <Reveal direction="left" distance={24}>
                        <div className={last ? "rounded-3xl bg-ink-950 p-8" : ""}>
                          <p
                            className={`text-4xl font-black tracking-tighter tabular-nums sm:text-5xl ${
                              last ? "text-frost-300" : "text-brand-600"
                            }`}
                          >
                            {item.year}
                          </p>
                          <h3 className={`mt-2 text-xl font-extrabold tracking-tight ${last ? "text-white" : "text-ink-900"}`}>
                            {item.title}
                          </h3>
                          <p className={`mt-2 max-w-xl text-sm leading-relaxed ${last ? "text-ink-300" : "text-ink-600"}`}>
                            {item.body}
                          </p>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </section>
      )}

      {content.quote && (
        <section className="bg-brand-600 py-24 sm:py-32">
          <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-7xl leading-none font-black text-white/25" aria-hidden="true">
              &ldquo;
            </p>
            <blockquote className="-mt-4 text-3xl font-extrabold tracking-tighter text-balance text-white sm:text-5xl">
              {content.quote.text}
            </blockquote>
            <p className="mt-8 text-xs font-bold tracking-[0.28em] text-brand-100 uppercase">
              {content.quote.author}
            </p>
          </Reveal>
        </section>
      )}

      {offer && (
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            {content.gallery && content.gallery.length >= 3 && (
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {content.gallery.slice(0, 3).map((src, i) => (
                  <DollyImage
                    key={src}
                    className={`overflow-hidden rounded-3xl ${i === 0 ? "row-span-2" : ""}`}
                  >
                    <Image
                      src={src}
                      alt={dict.gallery.imageAlt}
                      width={480}
                      height={i === 0 ? 720 : 360}
                      sizes="(min-width: 1024px) 18rem, 50vw"
                      className="h-full w-full object-cover"
                    />
                  </DollyImage>
                ))}
              </div>
            )}
            <Reveal>
              <h2 className="text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
                {offer.title}
              </h2>
              {offer.body.map((p, i) => (
                <p key={i} className="mt-6 text-base leading-relaxed text-ink-600">
                  {p}
                </p>
              ))}
              {offer.bullets && (
                <ol className="mt-8 divide-y divide-ink-100 border-y border-ink-100">
                  {offer.bullets.map((b, i) => (
                    <li key={b} className="flex items-baseline gap-5 py-4">
                      <span className="text-sm font-black text-brand-600 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-semibold text-ink-800">{b}</span>
                    </li>
                  ))}
                </ol>
              )}
            </Reveal>
          </div>
        </section>
      )}

      <HorizontalGallery
        images={stripImages}
        alt={dict.gallery.imageAlt}
        eyebrow={dict.gallery.eyebrow}
        title={dict.gallery.title}
        cta={{ href: pathFor("gallery", lang) ?? `/${lang}`, label: dict.common.viewAll }}
      />

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
