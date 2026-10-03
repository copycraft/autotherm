"use client";

import { usePathname } from "next/navigation";
import Header, { type LangEntry, type NavEntry } from "@/app/components/site/Header";
import { LANGS, type Lang } from "@/app/lib/constants";
import { ECO_CONTACT, ECO_PAGES, ecoPath, getEcoDict, parseEcoPath } from "@/app/lib/eco";

/**
 * Header for ehutoauto.hu: the shared Header with the eco wordmark, the eco
 * menu, the electric-conversions sales line and the language flags.
 */
export default function EcoHeader({
  lang,
  langNames,
}: {
  lang: Lang;
  langNames: Record<string, string>;
}) {
  // On the eco domain the address bar shows the public paths ("/technologia",
  // "/en/technology"), so the active item is a plain comparison and the flags
  // lead to the same page in the other language.
  const pathname = usePathname() ?? "/";
  const current = parseEcoPath(pathname).page ?? "home";
  const dict = getEcoDict(lang);

  const nav: NavEntry[] = ECO_PAGES.map((page) => ({
    href: ecoPath(page, lang),
    label: dict.nav[page],
    active: pathname === ecoPath(page, lang),
  }));

  const langs: LangEntry[] = LANGS.map((code) => ({
    code,
    label: langNames[code] ?? code.toUpperCase(),
    href: ecoPath(current, code),
    active: code === lang,
  }));

  return (
    <Header
      brand="eco"
      homeHref={ecoPath("home", lang)}
      nav={nav}
      langs={langs}
      quoteHref={ecoPath("quote", lang)}
      quoteLabel={dict.common.getQuote}
      phone={ECO_CONTACT.phone}
      phoneHref={ECO_CONTACT.phoneHref}
      openMenuLabel={dict.common.openMenu}
      closeMenuLabel={dict.common.closeMenu}
    />
  );
}
