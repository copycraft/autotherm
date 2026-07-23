import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import CookieConsent from "@/app/components/site/CookieConsent";
import Footer from "@/app/components/site/Footer";
import HeaderContainer from "@/app/components/site/HeaderContainer";
import StickyQuoteCTA from "@/app/components/site/StickyQuoteCTA";
import { LANGS, isLang } from "@/app/lib/constants";
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
    <>
      <HeaderContainer
        lang={lang}
        navLabels={dict.nav}
        langNames={langNames}
        quoteLabel={dict.common.getQuote}
        openMenuLabel={dict.common.openMenu}
        closeMenuLabel={dict.common.closeMenu}
      />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
      <StickyQuoteCTA href={quoteHref} label={dict.stickyCta} />
      <CookieConsent
        text={dict.cookie.text}
        accept={dict.cookie.accept}
        decline={dict.cookie.decline}
      />
    </>
  );
}
