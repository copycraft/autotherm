import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import type { Lang } from "@/app/lib/constants";
import { ECO_CONTACT, ECO_VEHICLES, ecoPath, getEcoDict } from "@/app/lib/eco";

export default function EcoVehiclesPage({ lang }: { lang: Lang }) {
  const dict = getEcoDict(lang);
  const t = dict.vehicles;
  const quoteHref = ecoPath("quote", lang);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="mesh-light py-24 sm:py-32">
        <RevealGroup className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {ECO_VEHICLES.map((v) => (
            <RevealItem key={v.model} className="panel-ring flex flex-col rounded-3xl bg-white p-8 shadow-soft">
              <Image
                src={v.image}
                alt={`${v.make} ${v.model}`}
                width={521}
                height={365}
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                className="aspect-[521/365] h-auto w-full object-contain"
              />
              <p className="mt-4 border-t border-ink-100 pt-4 text-sm font-semibold text-ink-500">{v.make}</p>
              <h2 className="text-3xl font-black tracking-tighter text-ink-900">{v.model}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{t.cardBody}</p>
              <Link
                href={quoteHref}
                className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-brand-600"
              >
                {dict.common.getQuote}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </RevealItem>
          ))}
          <RevealItem className="flex flex-col justify-center rounded-3xl bg-ink-950 p-8">
            <p className="text-[11px] font-bold tracking-[0.2em] text-frost-300 uppercase">
              {t.otherEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white">{t.otherTitle}</h2>
            <a
              href={ECO_CONTACT.phoneHref}
              className="mt-6 text-lg font-bold text-frost-300 transition-colors hover:text-white"
            >
              {ECO_CONTACT.phone}
            </a>
          </RevealItem>
        </RevealGroup>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-4xl">
            {dict.pickup.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">{dict.pickup.body}</p>
        </Reveal>
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
