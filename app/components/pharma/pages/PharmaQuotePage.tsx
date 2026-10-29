import ContactForm from "@/app/components/forms/ContactForm";
import { Reveal } from "@/app/components/motion/Reveal";
import PharmaContactCard from "@/app/components/pharma/PharmaContactCard";
import PageHero from "@/app/components/site/PageHero";
import type { Lang } from "@/app/lib/constants";
import { getDict } from "@/app/lib/dictionaries";
import { getPharmaDict, pharmaPath } from "@/app/lib/pharma";

export default function PharmaQuotePage({ lang }: { lang: Lang }) {
  const dict = getPharmaDict(lang);
  const t = dict.quote;
  // Same form and pipeline as the main site; the page value tags the lead as
  // coming from Pharmacontrol, and the vehicle hint points at pharma vans.
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
                page={`pharmacontrol${pharmaPath("quote", lang)}`}
                quotation
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-4">
            <PharmaContactCard lang={lang} intro={dict.common.callIntro} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
