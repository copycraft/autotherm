import type { ReactNode } from "react";
import Link from "next/link";

const langConfig: Record<string, { label: string; nav: Record<string, string>; contact: Record<string, string>; homeLabel: string; footerMenu: Record<string, string> }> = {
  hu: {
    label: "HU",
    homeLabel: "Autotherm",
    nav: {
      "/hu": "Kezdőlap",
      "/hu/kik-vagyunk": "Kik vagyunk?",
      "/hu/termekeink": "Termékeink",
      "/hu/szerviz": "Szerviz",
      "/hu/miert-mi": "Miért mi?",
      "/hu/kepgaleria": "Galéria",
      "/hu/kapcsolat": "Kapcsolat",
      "/hu/arajanlatkeres": "Ajánlatkérés",
      "/hu/konfigurator": "Konfigurátor",
      "/hu/hutoauto-blog": "Blog",
    },
    contact: { phone: "+3620 910 20 50", email: "autotherm@autotherm.hu", hours: "Munkanapokon (workdays) 08:00-16:30" },
    footerMenu: {
      "/hu": "Kezdőlap",
      "/hu/kik-vagyunk": "Kik vagyunk?",
      "/hu/termekeink": "Termékeink",
      "/hu/szerviz": "Szerviz",
      "/hu/miert-mi": "Miért mi?",
      "/hu/konfigurator": "Konfigurátor",
    },
  },
  en: {
    label: "EN",
    homeLabel: "Autotherm",
    nav: {
      "/en": "Home",
      "/en/who-are-we": "Who are we",
      "/en/our-products": "Our products",
      "/en/why-us": "Why us?",
      "/en/galeries": "Galeries",
      "/en/contact": "Contact",
      "/en/quotation": "Quotation",
      "/en/hutoautoblog": "Blog",
    },
    contact: { phone: "+3620 910 20 50", email: "autotherm@autotherm.hu", hours: "Workdays 08:00-16:30" },
    footerMenu: {
      "/en": "Home",
      "/en/who-are-we": "Who are we",
      "/en/our-products": "Our products",
      "/en/why-us": "Why us?",
      "/en/galeries": "Galeries",
    },
  },
  de: {
    label: "DE",
    homeLabel: "Autotherm",
    nav: {
      "/de": "Startseite",
      "/de/wer-sind-wir-3": "Wer sind wir?",
      "/de/kuehlfahrzeug": "Kühlfahrzeug",
      "/de/warum-gerade-wir": "Warum gerade wir?",
      "/de/aufbauten-galerie": "Galerie",
      "/de/kontakt": "Kontakt",
      "/de/anfrage": "Anfrage",
      "/de/hutoauto-blog-2": "Blog",
    },
    contact: { phone: "+3620 910 20 50", email: "autotherm@autotherm.hu", hours: "Workdays 08:00-16:30" },
    footerMenu: {
      "/de": "Startseite",
      "/de/wer-sind-wir-3": "Wer sind wir?",
      "/de/kuehlfahrzeug": "Kühlfahrzeug",
      "/de/warum-gerade-wir": "Warum gerade wir?",
      "/de/aufbauten-galerie": "Galerie",
    },
  },
  ro: {
    label: "RO",
    homeLabel: "Autotherm",
    nav: {
      "/ro": "Acasă",
      "/ro/cine-suntem-noi": "Cine suntem noi?",
      "/ro/carosari-furgoane-frigorifice": "Carosări furgoane frigorifice",
      "/ro/galerie-foto": "Galerie foto",
      "/ro/contact-2": "Contact",
      "/ro/cerere-oferta": "Cerere ofertă",
    },
    contact: { phone: "+3620 910 20 50", email: "autotherm@autotherm.hu", hours: "Workdays 08:00-16:30" },
    footerMenu: {
      "/ro": "Acasă",
      "/ro/cine-suntem-noi": "Cine suntem noi?",
      "/ro/carosari-furgoane-frigorifice": "Carosări furgoane frigorifice",
      "/ro/galerie-foto": "Galerie foto",
      "/ro/contact-2": "Contact",
    },
  },
};

import ClientHeader from "@/app/components/ClientHeader";
import CookieBarClient from "@/app/components/CookieBarClient";
import { FOUNDED_YEAR, thisYear } from "@/app/lib/constants";

export { langConfig };
export type LangConfig = typeof langConfig.hu;

export function SiteLayout({ children, lang }: { children: ReactNode; lang: string }) {
  const currentLang = ["hu", "en", "de", "ro"].includes(lang) ? lang : "hu";
  return (
    <>
      <TopBar lang={currentLang} />
      <Header lang={currentLang} />
      <main>{children}</main>
      <Footer lang={currentLang} />
      <CookieBar lang={currentLang} />
    </>
  );
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <SiteLayout lang={lang}>{children}</SiteLayout>;
}

function LangSwitcher({ currentLang }: { currentLang: string }) {
  const langs = [
    { code: "hu", label: "HU" },
    { code: "en", label: "EN" },
    { code: "de", label: "DE" },
    { code: "ro", label: "RO" },
  ];
  return (
    <div className="flex items-center gap-2">
      {langs.map((l) => (
        <a
          key={l.code}
          href={`/${l.code}`}
          className={`block leading-none ${l.code === currentLang ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
          title={l.label}
        >
          {l.code === "hu" && <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="16" fill="#fff"/><rect width="24" height="5.33" fill="#436F4D"/><rect y="10.67" width="24" height="5.33" fill="#CD2A3E"/></svg>}
          {l.code === "en" && <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="16" fill="#012169"/><rect x="10" width="4" height="16" fill="#fff"/><rect y="6" width="24" height="4" fill="#fff"/><rect x="11" y="1" width="2" height="14" fill="#C8102E"/><rect y="7" width="24" height="2" fill="#C8102E"/></svg>}
          {l.code === "de" && <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="5.33" fill="#000"/><rect y="5.33" width="24" height="5.33" fill="#DD0000"/><rect y="10.67" width="24" height="5.33" fill="#FFCE00"/></svg>}
          {l.code === "ro" && <svg width="24" height="16" viewBox="0 0 24 16"><rect width="8" height="16" fill="#002B7F"/><rect x="8" width="8" height="16" fill="#FCD116"/><rect x="16" width="8" height="16" fill="#CE1126"/></svg>}
        </a>
      ))}
    </div>
  );
}

function TopBar({ lang }: { lang: string }) {
  const cfg = langConfig[lang] || langConfig.hu;
  return (
    <div className="top-bar">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          <a href={`tel:${cfg.contact.phone.replace(/\s/g, "")}`} className="hover:text-[#4a68a9] transition-colors">
            {cfg.contact.phone}
          </a>
          <span className="text-[#d9d9d9]">|</span>
          <a href={`mailto:${cfg.contact.email}`} className="hover:text-[#4a68a9] transition-colors">
            {cfg.contact.email}
          </a>
          <span className="hidden md:inline text-[#999]">{cfg.contact.hours}</span>
        </div>
        <LangSwitcher currentLang={lang} />
      </div>
    </div>
  );
}

function Header({ lang }: { lang: string }) {
  const cfg = langConfig[lang] || langConfig.hu;
  const navEntries = Object.entries(cfg.nav);
  return <ClientHeader lang={lang} navEntries={navEntries} homeLabel={cfg.homeLabel} />;
}

function Footer({ lang }: { lang: string }) {
  const cfg = langConfig[lang] || langConfig.hu;

  return (
    <footer className="site-footer">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="footer-widget">
            <h3>Menu</h3>
            <div className="flex flex-col gap-2">
              {Object.entries(cfg.footerMenu).map(([href, label]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </div>
          </div>
          <div className="footer-widget">
            <h3>Elérhetőségek / Kontakt</h3>
            <div className="flex flex-col gap-2">
              <p>Sitz: 6728 Szeged, Napos út 3.</p>
              <p>{`GPS: 46° 16.060\u2019, 20° 7.331\u2019`}</p>
              <a href={`tel:${cfg.contact.phone.replace(/\s/g, "")}`}>{cfg.contact.phone}</a>
              <a href={`mailto:${cfg.contact.email}`}>{cfg.contact.email}</a>
              <a href="https://www.autotherm.hu">Web: www.autotherm.hu</a>
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
              <img src="/images/carrier-logo.png" alt="Carrier Transicold" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
              <img src="/images/garancia-logo.png" alt="Garancia" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
            </div>
          </div>
          <div className="footer-widget">
            <h3>Térkép / Map</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2740.5!2d20.15!3d46.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSzeged%2C+Napos+%C3%BAt+3!5e0!3m2!1shu!2shu!4v1"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Autotherm location"
            />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {FOUNDED_YEAR}-{thisYear} Autotherm Kft. - minden jog fenntartva</p>
          <div className="flex gap-4">
            <span>Az oldal, vagy egy részének másolása, sokszorosítása, bármilyen célú fel – és átdolgozása, kereskedelmi forgalomba hozatala tilos.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CookieBar({ lang }: { lang: string }) {
  return <CookieBarClient lang={lang} />;
}
