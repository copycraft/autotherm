import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import SmoothScroll from "@/app/components/motion/SmoothScroll";
import Analytics from "@/app/components/site/Analytics";
import Footer from "@/app/components/site/Footer";
import HeaderContainer from "@/app/components/site/HeaderContainer";
import Infoblokk from "@/app/components/site/Infoblokk";
import { LANGS, isLang } from "@/app/lib/constants";

const CookieConsent = dynamic(
  () => import("@/app/components/site/CookieConsent"),
);
const StickyQuoteCTA = dynamic(
  () => import("@/app/components/site/StickyQuoteCTA"),
);
import { dictionaries, getDict } from "@/app/lib/dictionaries";
import { pathFor } from "@/app/lib/routes";
import { buildPageMetadata } from "@/app/lib/seo";

export function generateStaticParams(): { lang: string }[] {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return buildPageMetadata("home", lang);
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDict(lang);
  const langNames = Object.fromEntries(
    LANGS.map((l) => [l, dictionaries[l].langName]),
  );
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;

  return (
    <SmoothScroll>
      <HeaderContainer
        lang={lang}
        navLabels={dict.nav}
        langNames={langNames}
        quoteLabel={dict.common.getQuote}
        openMenuLabel={dict.common.openMenu}
        closeMenuLabel={dict.common.closeMenu}
      />
      {/* The page body transitions via template.tsx (which React remounts on
          every navigation). Header and footer live here in the layout, persist
          across routes, and are pinned in globals.css so they stay put while
          the content dissolves. */}
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
      <Infoblokk
        href={pathFor("grants", lang) ?? pathFor("grants", "hu") ?? `/${lang}`}
        closeLabel={dict.gallery.close}
      />
      <StickyQuoteCTA href={quoteHref} label={dict.stickyCta} />
      <CookieConsent
        text={dict.cookie.text}
        accept={dict.cookie.accept}
        decline={dict.cookie.decline}
      />
      <Analytics />
    </SmoothScroll>
  );
}
