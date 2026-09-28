import MagneticButton from "@/app/components/motion/MagneticButton";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import PartnersMarquee from "@/app/components/site/PartnersMarquee";
import StatsBand from "@/app/components/site/StatsBand";
import Icon from "@/app/components/ui/Icon";
import { COMPANY, type Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";
import type { InfoPageContent } from "@/app/lib/page-content";
import { pathFor } from "@/app/lib/routes";

/**
 * Service - workshop-desk layout: ruled capability list beside a sticky
 * contact ticket, connected process steps and a dark inspection sheet.
 */
export default async function ServicePage({
  content,
  lang,
  dict,
  heroImage,
}: {
  content: InfoPageContent;
  lang: Lang;
  dict: Dict;
  heroImage?: string;
}) {
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;
  const contactHref = pathFor("contact", lang) ?? quoteHref;

  const ticket = [
    { label: dict.common.phone, value: COMPANY.phone, href: COMPANY.phoneHref },
    { label: dict.common.openingHours, value: `${dict.common.workdays} ${COMPANY.openingHours}` },
    { label: dict.common.email, value: COMPANY.email, href: COMPANY.emailHref },
    { label: dict.common.address, value: COMPANY.address.full },
  ];

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        image={heroImage}
      >
        <MagneticButton href={COMPANY.phoneHref} variant="primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
          </svg>
          {dict.common.callUs}
        </MagneticButton>
        <MagneticButton href={contactHref} variant="ghost">
          {dict.common.writeUs}
        </MagneticButton>
      </PageHero>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {content.features && content.features.length > 0 && (
            <RevealGroup className="lg:col-span-7">
              {content.features.map((f) => (
                <RevealItem key={f.title} className="flex gap-6 border-b border-ink-100 py-8 first:pt-0">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-ink-200 text-brand-600">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-ink-900">{f.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          )}

          <Reveal direction="left" className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="rounded-3xl bg-ink-50 p-2 panel-ring">
              <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-6 sm:p-8">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-ink-500 uppercase">
                  <Icon name="wrench" className="h-4 w-4 text-brand-600" />
                  Autotherm · Szeged
                </p>
                <dl className="mt-6 divide-y divide-ink-100">
                  {ticket.map((row) => (
                    <div key={row.label} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
                      <dt className="text-[11px] font-bold tracking-[0.15em] text-ink-400 uppercase">
                        {row.label}
                      </dt>
                      <dd className="text-base font-bold text-ink-900">
                        {row.href ? (
                          <a href={row.href} className="transition-colors hover:text-brand-600">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {content.steps && (
        <section className="mesh-light py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-center text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
                {content.steps.title}
              </h2>
            </Reveal>
            <RevealGroup className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              <span
                className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-ink-200 lg:block"
                aria-hidden="true"
              />
              {content.steps.items.map((step, i) => (
                <RevealItem key={step.title} className="relative text-center">
                  <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-black text-brand-600 tabular-nums ring-2 ring-brand-600">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 text-lg font-extrabold tracking-tight text-ink-900">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-600">{step.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {content.sections?.map((section) => (
        <section key={section.title} className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <h2 className="text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
                {section.title}
              </h2>
              {section.body.map((p, i) => (
                <p key={i} className="mt-6 text-lg leading-relaxed text-ink-600">
                  {p}
                </p>
              ))}
            </Reveal>
            {section.bullets && (
              <Reveal delay={0.15} direction="left">
                <div className="rounded-3xl bg-ink-950 p-8 shadow-lifted sm:p-10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <p className="text-xs font-bold tracking-[0.28em] text-frost-300 uppercase">
                      {content.eyebrow}
                    </p>
                    <Icon name="check" className="h-5 w-5 text-frost-300" />
                  </div>
                  <ul>
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-4 border-b border-dashed border-white/10 py-4 last:border-b-0 last:pb-0"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-frost-300/60 text-frost-300" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                          </svg>
                        </span>
                        <span className="text-sm leading-relaxed font-semibold text-ink-100">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      ))}

      <StatsBand lang={lang} dict={dict} />
      <PartnersMarquee dict={dict} />
      <CtaBand
        title={content.cta.title}
        body={content.cta.body}
        primaryLabel={dict.common.getQuote}
        quoteHref={quoteHref}
      />
    </>
  );
}
