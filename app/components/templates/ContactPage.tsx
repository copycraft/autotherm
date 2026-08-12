import ContactForm from "@/app/components/forms/ContactForm";
import { Reveal } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
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
  heroImage,
}: {
  lang: Lang;
  dict: Dict;
  page: string;
  heroImage?: string;
}) {
  const c = dict.contactPage;
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} image={heroImage} />

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal className="h-full">
            <div className="panel-ring flex h-full flex-col gap-8 rounded-4xl bg-white p-8 shadow-soft transition-shadow duration-300 hover:shadow-lifted sm:p-10">
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
          data-lenis-prevent
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
