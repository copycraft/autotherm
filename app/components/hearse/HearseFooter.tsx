import Link from "next/link";
import { HearseWordmark } from "@/app/components/site/Header";
import { COMPANY, FOUNDED_YEAR, thisYear, type Lang } from "@/app/lib/constants";
import { HEARSE_CONTACT, HEARSE_PAGES, MAIN_SITE_URL, getHearseDict, hearsePath } from "@/app/lib/hearse";

const linkCls =
  "rounded text-sm text-ink-300 transition-colors hover:text-frost-300 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none";

/**
 * Footer for halottszallito.hu. Legal pages and company information live on
 * the main site, so those links point there (the legal pages exist in
 * Hungarian only).
 */
export default function HearseFooter({ lang }: { lang: Lang }) {
  const dict = getHearseDict(lang);
  const t = dict.footer;

  return (
    <footer
      style={{ viewTransitionName: "site-footer" }}
      className="relative overflow-hidden border-t border-frost-400/15 bg-ink-950 text-ink-200"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <HearseWordmark light lang={lang} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-300">
              {t.tagline.replace("{year}", String(FOUNDED_YEAR))}
            </p>
            <a
              href={`${MAIN_SITE_URL}/${lang}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-frost-300 transition-colors hover:text-white"
            >
              {t.mainSite}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t.menu}</h3>
            <nav className="mt-5 flex flex-col gap-3" aria-label={t.navLabel}>
              {HEARSE_PAGES.map((page) => (
                <Link key={page} href={hearsePath(page, lang)} className={linkCls}>
                  {dict.nav[page]}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {dict.common.contactPerson}
            </h3>
            <address className="mt-5 flex flex-col gap-3 text-sm not-italic text-ink-300">
              <p className="font-semibold text-white">{HEARSE_CONTACT.name}</p>
              <p className="-mt-2 text-ink-400">{dict.contactRole}</p>
              <a href={HEARSE_CONTACT.phoneHref} className={`${linkCls} font-semibold text-white`}>
                {HEARSE_CONTACT.phone}
              </a>
              <a href={HEARSE_CONTACT.emailHref} className={linkCls}>
                {HEARSE_CONTACT.email}
              </a>
            </address>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {COMPANY.tradingNames[lang]}
            </h3>
            <address className="mt-5 flex flex-col gap-3 text-sm not-italic text-ink-300">
              <p>{COMPANY.address.full}</p>
              <a href={COMPANY.phoneHref} className={linkCls}>
                {COMPANY.phone}
              </a>
              <a href={COMPANY.emailHref} className={linkCls}>
                {COMPANY.email}
              </a>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 pt-6 pb-[calc(var(--infoblokk-h)+1.5rem)] text-xs text-ink-400 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {FOUNDED_YEAR}&ndash;{thisYear} {COMPANY.legalName} &mdash; {t.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`${MAIN_SITE_URL}/hu/altalanos-szerzodesi-feltetelek`} className={linkCls}>
              {t.terms}
            </a>
            <a href={`${MAIN_SITE_URL}/hu/adatkezelesi-tajekoztato`} className={linkCls}>
              {t.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
