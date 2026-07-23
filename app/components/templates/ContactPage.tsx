import ContactForm from "@/app/components/forms/ContactForm";
import { Reveal } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import CtaBand from "@/app/components/site/CtaBand";
import PartnersMarquee from "@/app/components/site/PartnersMarquee";
import StatsBand from "@/app/components/site/StatsBand";
import Icon from "@/app/components/ui/Icon";
import { COMPANY, type Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";
import { pathFor } from "@/app/lib/routes";

export default async function ContactPage({
  lang,
  dict,
  page,
}: {
  lang: Lang;
  dict: Dict;
  page: string;
}) {
  const c = dict.contactPage;
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
                {c.eyebrow}
              </p>
            </div>
          </Reveal>
          <RevealText
            as="h1"
            text={c.title}
            delay={0.1}
            className="mt-5 block max-w-3xl text-4xl font-black tracking-tighter text-balance text-white sm:text-6xl"
          />
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-300">{c.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal className="h-full">
            <div className="panel-ring flex h-full flex-col gap-8 rounded-4xl bg-white p-8 shadow-soft sm:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
                {c.infoTitle}
              </h2>
              <div className="flex flex-col gap-6 text-sm">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                    <Icon name="factory" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-ink-900">{dict.common.address}</p>
                    <p className="mt-1 leading-relaxed text-ink-600">{COMPANY.address.full}</p>
                    <p className="mt-0.5 text-xs text-ink-400">{c.gps}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                    <Icon name="spark" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-ink-900">{dict.common.phone}</p>
                    <a
                      href={COMPANY.phoneHref}
                      className="mt-1 block rounded font-semibold text-brand-600 transition-colors hover:text-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                    <Icon name="check" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-ink-900">{dict.common.email}</p>
                    <a
                      href={COMPANY.emailHref}
                      className="mt-1 block rounded font-semibold text-brand-600 transition-colors hover:text-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                    <Icon name="clock" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-ink-900">{dict.common.openingHours}</p>
                    <p className="mt-1 leading-relaxed text-ink-600">
                      {dict.common.workdays} {COMPANY.openingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="panel-ring rounded-4xl bg-ink-50 p-8 sm:p-10">
              <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink-900">
                {c.formTitle}
              </h2>
              <ContactForm dict={dict.form} lang={lang} page={page} />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label={dict.footer.mapAria} className="bg-white">
        <iframe
          src={`https://www.google.com/maps?q=${COMPANY.geo.lat},${COMPANY.geo.lng}&z=15&output=embed`}
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={dict.footer.mapAria}
          className="block grayscale-[35%]"
        />
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
