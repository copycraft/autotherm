import Link from "next/link";
import EcoContactCard from "@/app/components/eco/EcoContactCard";
import EcoHero from "@/app/components/eco/EcoHero";
import EcoVehicleStrip from "@/app/components/eco/EcoVehicleStrip";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import type { Lang } from "@/app/lib/constants";
import { ECO_CONTACT, ECO_FEATURE_ICONS, ecoPath, getEcoDict } from "@/app/lib/eco";

export default function EcoHomePage({ lang }: { lang: Lang }) {
  const dict = getEcoDict(lang);
  const t = dict.home;
  const quoteHref = ecoPath("quote", lang);
  const technologyHref = ecoPath("technology", lang);

  return (
    <>
      <EcoHero
        copy={dict.hero}
        quoteLabel={dict.common.getQuote}
        quoteHref={quoteHref}
        technologyHref={technologyHref}
      />

      {/* What we do */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5">
            <Eyebrow label={t.introEyebrow} tone="light" />
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
              {t.introTitle}
            </h2>
            <p className="mt-6 text-lg font-semibold text-brand-700">{t.introLead}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:pt-10">
            {t.introBody.map((p, i) => (
              <p key={i} className={`${i ? "mt-5 " : ""}text-lg leading-relaxed text-ink-600`}>
                {p}
              </p>
            ))}
            <Link
              href={technologyHref}
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600"
            >
              {t.introLink}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Eight properties of the system */}
      <section className="mesh-light py-24 sm:py-32">
        <RevealGroup className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {dict.features.map((f, i) => (
            <RevealItem key={f.title} className="panel-ring rounded-3xl bg-white p-7 shadow-soft">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                <Icon name={ECO_FEATURE_ICONS[i]} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* The case for electric */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
              {dict.case.title}
            </h2>
          </Reveal>
          {dict.case.body.map((p, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="mt-6 text-lg leading-relaxed text-ink-600">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The convertible vans, scrolled through sideways */}
      <EcoVehicleStrip lang={lang} />

      {/* Contact */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow label={t.contactEyebrow} tone="light" />
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-4xl">
              {t.contactTitle}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">{dict.pickup.body}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <EcoContactCard lang={lang} intro={dict.common.callIntro} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={t.cta.title}
        body={t.cta.body}
        primaryLabel={dict.common.getQuote}
        quoteHref={quoteHref}
        phone={ECO_CONTACT.phone}
        phoneHref={ECO_CONTACT.phoneHref}
      />
    </>
  );
}
