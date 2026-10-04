import Image from "next/image";
import Link from "next/link";
import HearseBuildsStrip from "@/app/components/hearse/HearseBuildsStrip";
import HearseContactCard from "@/app/components/hearse/HearseContactCard";
import HearseGuarantees from "@/app/components/hearse/HearseGuarantees";
import HearseHero from "@/app/components/hearse/HearseHero";
import HearseTestimonials from "@/app/components/hearse/HearseTestimonials";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import StatsBand from "@/app/components/site/StatsBand";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import type { Lang } from "@/app/lib/constants";
import { getDict } from "@/app/lib/dictionaries";
import { HEARSE_CONTACT, HEARSE_PILLAR_ICONS, getHearseDict, hearsePath } from "@/app/lib/hearse";

export default function HearseHomePage({ lang }: { lang: Lang }) {
  const dict = getHearseDict(lang);
  const quoteHref = hearsePath("quote", lang);

  return (
    <>
      <HearseHero
        copy={dict.hero}
        quoteLabel={dict.common.getQuote}
        quoteHref={quoteHref}
        buildsHref={hearsePath("builds", lang)}
      />

      {/* Production, cooling, paperwork */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow label={dict.pillars.eyebrow} tone="light" />
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {dict.pillars.items.map((p, i) => (
              <RevealItem key={p.title} className="panel-ring rounded-3xl bg-ink-50 p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                  <Icon name={HEARSE_PILLAR_ICONS[i]} className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-xl font-extrabold tracking-tight text-ink-900">{p.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-ink-600">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Welcome letter from the owner */}
      <section className="mesh-light py-24 sm:py-32">
        <Reveal className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-3xl font-black tracking-tighter text-ink-900 sm:text-4xl">{dict.welcome.greeting}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink-600">{dict.welcome.body}</p>
          <p className="mt-8 text-base font-extrabold tracking-tight text-ink-900">{dict.welcome.name}</p>
          <p className="text-sm text-ink-500">{dict.welcome.role}</p>
        </Reveal>
      </section>

      {/* The 3.5 t conversion */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <Image
              src="/images/hearse/van-ford.webp"
              alt={dict.conversion.title}
              width={2000}
              height={940}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <Eyebrow label={dict.conversion.eyebrow} tone="light" />
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-4xl">
              {dict.conversion.title}
            </h2>
            <ul className="mt-8 flex flex-col gap-3">
              {dict.conversion.features.map((f) => (
                <li key={f} className="flex gap-3 text-base font-semibold text-ink-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href={hearsePath("product", lang)} className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
                {dict.conversion.details}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href={quoteHref} className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
                {dict.common.getQuote}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <HearseBuildsStrip lang={lang} />

      <HearseGuarantees lang={lang} />

      <HearseTestimonials lang={lang} limit={1} />

      <StatsBand lang={lang} dict={getDict(lang)} />

      {/* Contact */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow label={dict.homeContact.eyebrow} tone="light" />
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-4xl">
              {dict.homeContact.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <HearseContactCard lang={lang} intro={dict.common.callIntro} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={dict.homeCta.title}
        body={dict.homeCta.body}
        primaryLabel={dict.common.getQuote}
        quoteHref={quoteHref}
        phone={HEARSE_CONTACT.phone}
        phoneHref={HEARSE_CONTACT.phoneHref}
      />
    </>
  );
}
