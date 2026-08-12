import { Reveal } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import PartnersMarquee from "@/app/components/site/PartnersMarquee";
import StatsBand from "@/app/components/site/StatsBand";
import ContactForm from "@/app/components/forms/ContactForm";
import type { Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";
import { pathFor } from "@/app/lib/routes";

export default async function QuotationPage({
  dict,
  lang,
  page,
  heroImage,
}: {
  dict: Dict;
  lang: Lang;
  page: string;
  heroImage?: string;
}) {
  const q = dict.quotationPage;
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;

  return (
    <>
      <PageHero eyebrow={q.eyebrow} title={q.title} lead={q.lead} image={heroImage} />

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <Reveal>
            <div className="panel-ring rounded-4xl bg-ink-50 p-8 shadow-soft transition-shadow duration-300 hover:shadow-lifted sm:p-10">
              <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink-900">
                {dict.contactPage.formTitle}
              </h2>
              <ContactForm dict={dict.form} lang={lang} page={page} quotation />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="h-full">
            <div className="panel-ring flex h-full flex-col gap-8 rounded-4xl bg-white p-8 shadow-soft transition-shadow duration-300 hover:shadow-lifted sm:p-10">
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
