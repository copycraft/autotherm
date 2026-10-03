import EcoContactCard from "@/app/components/eco/EcoContactCard";
import ContactForm from "@/app/components/forms/ContactForm";
import { Reveal } from "@/app/components/motion/Reveal";
import PageHero from "@/app/components/site/PageHero";
import Icon from "@/app/components/ui/Icon";
import type { Lang } from "@/app/lib/constants";
import { getDict } from "@/app/lib/dictionaries";
import { ecoPath, getEcoDict } from "@/app/lib/eco";

export default function EcoQuotePage({ lang }: { lang: Lang }) {
  const dict = getEcoDict(lang);
  const t = dict.quote;
  // Same form and pipeline as the main site; the page value tags the lead as
  // coming from ehutoauto.hu, and the vehicle hint points at electric vans.
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
                page={`ehutoauto.hu${ecoPath("quote", lang)}`}
                quotation
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-4">
            <EcoContactCard lang={lang} intro={dict.common.callIntro} />
            <div className="panel-ring rounded-3xl bg-white p-8 shadow-soft">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                <Icon name="truck" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink-900">{dict.pickup.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{dict.pickup.body}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
