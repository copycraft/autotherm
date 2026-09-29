import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/app/components/home/Hero";
import CountUp from "@/app/components/motion/CountUp";
import MagneticButton from "@/app/components/motion/MagneticButton";

const SmartVideo = dynamic(() => import("@/app/components/media/SmartVideo"), {
  loading: () => <div className="aspect-video rounded-3xl bg-ink-800/50" />,
});
import {
  DollyImage,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/app/components/motion/Reveal";
import VelocityStretch from "@/app/components/motion/VelocityStretch";
import ClientLogoStrip from "@/app/components/site/ClientLogoStrip";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { COMPANY, isLang, type Lang } from "@/app/lib/constants";
import { getDict, type Dict } from "@/app/lib/dictionaries";
import { getStats } from "@/app/lib/db";
import { pathFor } from "@/app/lib/routes";

/**
 * Homepage - the conversion engine.
 * Server-first: only the hero, motion primitives and media players hydrate.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDict(lang);
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;
  const aboutHref = pathFor("about", lang) ?? `/${lang}`;
  const galleryHref = pathFor("gallery", lang) ?? `/${lang}`;

  return (
    <>
      <Hero
        eyebrow={dict.home.hero.eyebrow}
        titleA={dict.home.hero.titleA}
        titleB={dict.home.hero.titleB}
        lead={dict.home.hero.lead}
        ctaPrimary={dict.home.hero.ctaPrimary}
        ctaPrimaryHref={quoteHref}
        ctaSecondary={dict.home.hero.ctaSecondary}
        ctaSecondaryHref={aboutHref}
        scrollHint={dict.common.scrollDown}
        image="/images/688500d4a01a.webp"
      />

      <StatsBand lang={lang} dict={dict} />
      <PartnersSection dict={dict} />
      <ProductsBento lang={lang} dict={dict} />
      <ProcessSection dict={dict} />
      <VideoSection dict={dict} />
      <CtaBand dict={dict} quoteHref={quoteHref} />
    </>
  );
}

/* ------------------------------- Stats band -------------------------------- */

async function StatsBand({ lang, dict }: { lang: Lang; dict: Dict }) {
  const locale =
    lang === "en"
      ? "en-US"
      : lang === "de"
        ? "de-DE"
        : lang === "ro"
          ? "ro-RO"
          : "hu-HU";
  const s = await getStats();
  const years = new Date().getFullYear() - s.foundedYear;
  const stats = [
    {
      value: years,
      suffix: dict.home.stats.yearsSuffix,
      label: dict.home.stats.years,
    },
    {
      value: s.customers,
      suffix: dict.home.stats.customersSuffix,
      label: dict.home.stats.customers,
    },
    {
      value: s.annualConversions,
      suffix: dict.home.stats.conversionsSuffix,
      label: dict.home.stats.conversions,
    },
    { value: s.employees, suffix: "", label: dict.home.stats.employees },
  ];
  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem
              key={s.label}
              className="panel-ring rounded-3xl bg-ink-50 px-6 py-10 text-center"
            >
              <p className="text-5xl font-black tracking-tighter text-ink-900 tabular-nums sm:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} locale={locale} />
              </p>
              <p className="mt-3 text-xs font-bold tracking-[0.15em] text-ink-500 uppercase">
                {s.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------ Products bento ------------------------------ */

function ProductsBento({ lang, dict }: { lang: Lang; dict: Dict }) {
  return (
    <section className="mesh-light py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.home.products.eyebrow}
          title={dict.home.products.title}
          lead={dict.home.products.lead}
        />
        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {dict.home.products.items.map((item, i) => {
            const href = pathFor(item.href, lang) ?? `/${lang}`;
            const large = i === 0 || i === 3;
            return (
              <RevealItem
                key={item.title}
                className={large ? "md:col-span-2" : ""}
              >
                <Link
                  href={href}
                  className="group panel-ring relative block h-full overflow-hidden rounded-3xl bg-white shadow-soft transition-shadow duration-300 hover:shadow-lifted focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <div className="relative h-52 overflow-hidden sm:h-60">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-extrabold tracking-tight text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {item.body}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-transform duration-300 group-hover:translate-x-1">
                      {dict.common.learnMore}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </p>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/* -------------------------------- Process ---------------------------------- */

function ProcessSection({ dict }: { dict: Dict }) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.home.process.eyebrow}
          title={dict.home.process.title}
          lead={dict.home.process.lead}
        />
        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.process.steps.map((step, i) => (
            <RevealItem
              key={step.title}
              className="panel-ring relative rounded-3xl bg-ink-50 p-7"
            >
              <span
                className="text-6xl font-black tracking-tighter text-brand-200 tabular-nums"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {step.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* --------------------------------- Video ----------------------------------- */

function VideoSection({ dict }: { dict: Dict }) {
  return (
    <section className="mesh-hero relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.home.video.eyebrow}
          title={dict.home.video.title}
          lead={dict.home.video.lead}
          dark
        />
        <DollyImage className="mt-16">
          <VelocityStretch>
            <SmartVideo
              src="/videos/production.mp4"
              poster="/images/b2e2e8348e1b.webp"
              label={dict.home.video.title}
              className="aspect-video w-full shadow-lifted ring-1 ring-white/10"
            />
          </VelocityStretch>
        </DollyImage>
      </div>
    </section>
  );
}

/* -------------------------------- Partners --------------------------------- */

function PartnersSection({ dict }: { dict: Dict }) {
  const partners = [
    {
      name: "Carrier Transicold",
      body: dict.home.partners.carrier,
      // Just the oval; "Transicold" is set in the site face beside it so the
      // lockup reads horizontally at the same weight as the other two marks.
      logo: "/images/carrier-oval.webp",
      w: 420,
      h: 167,
      wordmark: "Transicold",
    },
    {
      name: "Daikin",
      body: dict.home.partners.daikin,
      logo: "/images/daikin-logo.webp",
      w: 440,
      h: 95,
    },
    {
      name: "Autoclima",
      body: dict.home.partners.autoclima,
      logo: "/images/autoclima-logo.webp",
      w: 440,
      h: 64,
    },
  ];
  return (
    <section className="mesh-light py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.home.partners.eyebrow}
          title={dict.home.partners.title}
          lead={dict.home.partners.lead}
        />
        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {partners.map((p) => (
            <RevealItem
              key={p.name}
              className="panel-ring rounded-3xl bg-white p-8 shadow-soft"
            >
              {p.logo ? (
                /* Marks are bounded by height *and* width so the round Carrier
                   badge and the wide Daikin/Autoclima wordmarks land at a
                   comparable optical weight. */
                <div className="flex h-10 items-center gap-2.5">
                  <Image
                    src={p.logo}
                    alt={p.wordmark ? "Carrier" : p.name}
                    width={p.w}
                    height={p.h}
                    className="max-h-10 w-auto max-w-[170px] object-contain"
                  />
                  {p.wordmark && (
                    <span className="text-xl font-extrabold tracking-tight text-ink-900 uppercase">
                      {p.wordmark}
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-2xl font-black tracking-tighter text-ink-900">
                  {p.name}
                </p>
              )}
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                {p.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <ClientLogoStrip />
      </div>
    </section>
  );
}

/* --------------------------------- CTA band -------------------------------- */

function CtaBand({ dict, quoteHref }: { dict: Dict; quoteHref: string }) {
  return (
    <section className="mesh-hero relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-4xl font-black tracking-tighter text-balance text-white sm:text-6xl">
            {dict.home.ctaBand.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
            {dict.home.ctaBand.body}
          </p>
        </Reveal>
        <Reveal
          delay={0.2}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href={quoteHref} variant="primary">
            {dict.home.ctaBand.primary}
          </MagneticButton>
          <MagneticButton href={COMPANY.phoneHref} variant="ghost">
            {dict.home.ctaBand.secondary}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
