import Image from "next/image";
import Link from "next/link";
import { COMPANY, FOUNDED_YEAR, thisYear, type Lang } from "@/app/lib/constants";
import { getDict } from "@/app/lib/dictionaries";
import { FOOTER_KEYS, pathFor } from "@/app/lib/routes";

/**
 * Site footer - server component, zero client JS.
 * Deep-ink surface with brand glow, four-column layout, embedded map.
 */
export default function Footer({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const legalName = COMPANY.tradingNames[lang];

  const menu = FOOTER_KEYS[lang]
    .map((key) => {
      const href = pathFor(key, lang);
      const label = dict.nav[key];
      return href && label ? { href, label } : null;
    })
    .filter((x): x is { href: string; label: string } => x !== null);

  const legalLinks = (["terms", "privacy"] as const)
    .map((key) => {
      const href = pathFor(key, lang);
      const label = dict.nav[key];
      return href && label ? { href, label } : null;
    })
    .filter((x): x is { href: string; label: string } => x !== null);

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-200" role="contentinfo">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/autotherm-logo.png"
              alt="Autotherm"
              width={160}
              height={40}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-300">
              {dict.footer.tagline}
            </p>
            <div className="mt-8 flex items-center gap-5">
              <Image
                src="/images/carrier-logo.png"
                alt="Carrier Transicold"
                width={110}
                height={32}
                className="h-7 w-auto opacity-60 transition-opacity hover:opacity-100"
              />
              <Image
                src="/images/garancia-logo.png"
                alt="Garancia"
                width={64}
                height={40}
                className="h-9 w-auto opacity-60 transition-opacity hover:opacity-100"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {dict.footer.menuTitle}
            </h3>
            <nav className="mt-5 flex flex-col gap-3" aria-label="Footer">
              {menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded text-sm text-ink-300 transition-colors hover:text-frost-300 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {dict.footer.contactTitle}
            </h3>
            <address className="mt-5 flex flex-col gap-3 text-sm not-italic text-ink-300">
              <p>{COMPANY.address.full}</p>
              <a
                href={COMPANY.phoneHref}
                className="rounded font-semibold text-white transition-colors hover:text-frost-300 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none"
              >
                {COMPANY.phone}
              </a>
              <a
                href={COMPANY.emailHref}
                className="rounded transition-colors hover:text-frost-300 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none"
              >
                {COMPANY.email}
              </a>
              <p className="text-ink-400">
                {dict.common.workdays} {COMPANY.openingHours}
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {dict.footer.mapTitle}
            </h3>
            <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-white/10">
              <iframe
                src={`https://www.google.com/maps?q=${COMPANY.geo.lat},${COMPANY.geo.lng}&z=15&output=embed`}
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={dict.footer.mapAria}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-ink-400 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {FOUNDED_YEAR}&ndash;{thisYear} {legalName} &mdash;{" "}
            {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded transition-colors hover:text-frost-300 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="mx-auto max-w-7xl px-4 pb-6 text-center text-[11px] leading-relaxed text-ink-500 sm:px-6 sm:text-left lg:px-8">
          {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
