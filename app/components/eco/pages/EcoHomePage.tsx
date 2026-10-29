import Link from "next/link";
import Image from "next/image";
import EcoContactCard from "@/app/components/eco/EcoContactCard";
import EcoVanDrawing from "@/app/components/eco/EcoVanDrawing";
import EcoHero from "@/app/components/eco/EcoHero";
import EcoVehicleStrip from "@/app/components/eco/EcoVehicleStrip";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import CtaBand from "@/app/components/site/CtaBand";
import ModelMarquee from "@/app/components/site/ModelMarquee";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import type { Lang } from "@/app/lib/constants";
import { ECO_BUILDS, ECO_CONTACT, ECO_FEATURE_ICONS, ECO_MODELS, ECO_MODELS_TITLE, ecoPath, getEcoDict } from "@/app/lib/eco";

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
            <RevealText
              as="h2"
              text={t.introTitle}
              className="mt-4 block text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl"
            />
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
      <section className="mesh-hero py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <Reveal>
              <RevealText
                as="h2"
                text={dict.case.title}
                className="block text-3xl font-black tracking-tighter text-balance text-white sm:text-5xl"
              />
            </Reveal>
            {dict.case.body.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="mt-6 text-lg leading-relaxed text-ink-300">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <EcoVanDrawing className="mx-auto w-full max-w-md" />
          </Reveal>
        </div>
      </section>

      {/* The convertible vans, scrolled through sideways */}
      <EcoVehicleStrip lang={lang} />

      <ModelMarquee title={ECO_MODELS_TITLE[lang]} items={ECO_MODELS} icon="spark" />

      {/* Finished builds */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow label={t.ref.eyebrow} tone="light" />
            <RevealText
              as="h2"
              text={t.ref.title}
              className="mt-4 block max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ECO_BUILDS.map((b) => (
              <RevealItem key={b.id} className="panel-ring group overflow-hidden rounded-3xl bg-white shadow-soft">
                <div>
                  <div className="overflow-hidden">
                    <Image
                      src={`/images/eco/builds/covers/${b.id}.webp`}
                      alt={`${b.make} ${b.model}`}
                      width={1152}
                      height={720}
                      sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                      className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-ink-500">{b.make}</p>
                    <p className="text-xl font-black tracking-tighter text-ink-900">{b.model}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow label={t.contactEyebrow} tone="light" />
            <RevealText
              as="h2"
              text={t.contactTitle}
              className="mt-4 block text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-4xl"
            />
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
