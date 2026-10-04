import HearseContactCard from "@/app/components/hearse/HearseContactCard";
import ContactForm from "@/app/components/forms/ContactForm";
import { Reveal } from "@/app/components/motion/Reveal";
import PageHero from "@/app/components/site/PageHero";
import type { Lang } from "@/app/lib/constants";
import { getDict } from "@/app/lib/dictionaries";
import { getHearseDict, hearsePath } from "@/app/lib/hearse";

export default function HearseQuotePage({ lang }: { lang: Lang }) {
  const dict = getHearseDict(lang);
  const t = dict.quote;
  // Same form and pipeline as the main site; the page value tags the lead as
  // coming from halottszallito.hu.
  const form = { ...getDict(lang).form, vehiclePlaceholder: t.vehiclePlaceholder };

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <Reveal>
            <div className="panel-ring rounded-4xl bg-ink-50 p-8 shadow-soft sm:p-10">
              <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink-900">{t.formTitle}</h2>
              <ContactForm
                dict={form}
                lang={lang}
                page={`halottszallito.hu${hearsePath("quote", lang)}`}
                quotation
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-4">
            <div className="panel-ring rounded-3xl bg-white p-8 shadow-soft">
              <h3 className="text-lg font-extrabold tracking-tight text-ink-900">{t.stepsTitle}</h3>
              <ol className="mt-6 flex flex-col gap-5">
                {t.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black text-brand-600 tabular-nums ring-2 ring-brand-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-extrabold tracking-tight text-ink-900">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <HearseContactCard lang={lang} intro={dict.common.callIntro} />
            <p className="px-2 text-sm font-semibold text-brand-700">{t.fact}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
