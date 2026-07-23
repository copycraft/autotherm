import { Reveal } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import CtaBand from "@/app/components/site/CtaBand";
import PartnersMarquee from "@/app/components/site/PartnersMarquee";
import StatsBand from "@/app/components/site/StatsBand";
import type { Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";
import { pathFor } from "@/app/lib/routes";

export default async function QuotationPage({
  dict,
  lang,
  page,
}: {
  dict: Dict;
  lang: Lang;
  page: string;
}) {
  const q = dict.quotationPage;
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;

  return (
    <>
      <section className="mesh-hero relative overflow-hidden pt-40 pb-24">
        <div className="grid-overlay absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-32 left-1/3 h-[34rem] w-[34rem] rounded-full bg-brand-500/25 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" distance={16}>
            <div className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2">
              <span className="h-1.5 w-1.5 animate-shimmer rounded-full bg-frost-300" aria-hidden="true" />
              <p className="text-[11px] font-bold tracking-[0.18em] text-frost-200 uppercase">
                {q.eyebrow}
              </p>
            </div>
          </Reveal>
          <RevealText
            as="h1"
            text={q.title}
            delay={0.1}
            className="mt-5 block max-w-3xl text-4xl font-black tracking-tighter text-balance text-white sm:text-6xl"
          />
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-300">{q.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <Reveal>
            <div className="panel-ring rounded-4xl bg-ink-50 p-8 sm:p-10">
              <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink-900">
                {dict.contactPage.formTitle}
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-ink-600">
                {q.lead}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="h-full">
            <div className="panel-ring flex h-full flex-col gap-8 rounded-4xl bg-white p-8 shadow-soft sm:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
                {q.promiseTitle}
              </h2>
              <p className="text-sm leading-relaxed text-ink-600">{q.promiseBody}</p>
              <ul className="flex flex-col gap-3">
                {q.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-ink-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-brand-600" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-3.5 w-3.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
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
