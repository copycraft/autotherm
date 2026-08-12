import { Reveal } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
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
      {/* No plate here on purpose — photography on a terms page is noise. */}
      <PageHero title={content.title} lead={content.intro} />

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {content.sections.map((section) => (
            <div key={section.title}>
              <Reveal>
                <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-ink-900 first:mt-0">
                  {section.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="mt-4 text-base leading-relaxed text-ink-600">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>
          ))}
          <Reveal className="mt-16">
            <div className="panel-ring rounded-4xl bg-ink-50 p-8 shadow-soft transition-shadow duration-300 hover:shadow-lifted sm:p-10">
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
