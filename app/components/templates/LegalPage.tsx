import { Reveal } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import CtaBand from "@/app/components/site/CtaBand";
import PartnersMarquee from "@/app/components/site/PartnersMarquee";
import StatsBand from "@/app/components/site/StatsBand";
import { COMPANY, type Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";
import type { LegalContent } from "@/app/lib/page-content";
import { pathFor } from "@/app/lib/routes";

export default async function LegalPage({
  content,
  lang,
  dict,
}: {
  content: LegalContent;
  lang: Lang;
  dict: Dict;
}) {
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;

  return (
    <>
      <section className="mesh-hero relative overflow-hidden pt-40 pb-24">
        <div className="grid-overlay absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-32 left-1/3 h-[34rem] w-[34rem] rounded-full bg-brand-500/25 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <RevealText
            as="h1"
            text={content.title}
            className="mt-5 block text-4xl font-black tracking-tighter text-balance text-white sm:text-6xl"
          />
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-300">
              {content.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {content.sections.map((section) => (
            <Reveal key={section.title}>
              <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-ink-900 first:mt-0">
                {section.title}
              </h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-ink-600">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          ))}
          <Reveal className="mt-16">
            <div className="panel-ring rounded-4xl bg-ink-50 p-8 sm:p-10">
              <p className="text-sm font-bold tracking-[0.15em] text-brand-600 uppercase">
                {COMPANY.legalName}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{COMPANY.address.full}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{COMPANY.phone}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{COMPANY.email}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsBand lang={lang} dict={dict} />
      <PartnersMarquee dict={dict} />
      <CtaBand
        title={dict.home.ctaBand.title}
        body={dict.home.ctaBand.body}
        primaryLabel={dict.home.ctaBand.primary}
        quoteHref={quoteHref}
      />
    </>
  );
}
