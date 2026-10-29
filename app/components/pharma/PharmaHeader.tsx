"use client";

import { usePathname } from "next/navigation";
import Header, { type LangEntry, type NavEntry } from "@/app/components/site/Header";
import { LANGS, type Lang } from "@/app/lib/constants";
import {
  PHARMA_CONTACT,
  PHARMA_PAGES,
  getPharmaDict,
  parsePharmaPath,
  pharmaPath,
} from "@/app/lib/pharma";

/**
 * Header for Pharmacontrol: the shared Header with the pharma wordmark, the
 * pharma menu, the company sales line and the language flags.
 */
export default function PharmaHeader({
  lang,
  langNames,
}: {
  lang: Lang;
  langNames: Record<string, string>;
}) {
  // On the pharma domain the address bar shows the public paths
  // ("/megoldasok", "/en/solutions"), so the active item is a plain comparison
  // and the flags lead to the same page in the other language.
  const pathname = usePathname() ?? "/";
  const current = parsePharmaPath(pathname).page ?? "home";
  const dict = getPharmaDict(lang);

  const nav: NavEntry[] = PHARMA_PAGES.map((page) => ({
    href: pharmaPath(page, lang),
    label: dict.nav[page],
    active: pathname === pharmaPath(page, lang),
  }));

  const langs: LangEntry[] = LANGS.map((code) => ({
    code,
    label: langNames[code] ?? code.toUpperCase(),
    href: pharmaPath(current, code),
    active: code === lang,
  }));

  return (
    <Header
      brand="pharma"
      lang={lang}
      homeHref={pharmaPath("home", lang)}
      nav={nav}
      langs={langs}
      quoteHref={pharmaPath("quote", lang)}
      quoteLabel={dict.common.getQuote}
      phone={PHARMA_CONTACT.phone}
      phoneHref={PHARMA_CONTACT.phoneHref}
      openMenuLabel={dict.common.openMenu}
      closeMenuLabel={dict.common.closeMenu}
    />
  );
}
