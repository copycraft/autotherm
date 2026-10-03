"use client";

import { usePathname } from "next/navigation";
import Header, { type LangEntry, type NavEntry } from "@/app/components/site/Header";
import { LANGS, type Lang } from "@/app/lib/constants";
import { HEARSE_CONTACT, HEARSE_PAGES, getHearseDict, hearsePath, parseHearsePath } from "@/app/lib/hearse";

/**
 * Header for halottszallito.hu: the shared Header with the hearse wordmark,
 * the hearse menu, the hearse sales line and the language flags.
 */
export default function HearseHeader({
  lang,
  langNames,
}: {
  lang: Lang;
  langNames: Record<string, string>;
}) {
  // On the hearse domain the address bar shows the public paths ("/miert-mi",
  // "/en/why-us"), so the active item is a plain comparison and the flags
  // lead to the same page in the other language.
  const pathname = usePathname() ?? "/";
  const current = parseHearsePath(pathname).page ?? "home";
  const dict = getHearseDict(lang);

  const nav: NavEntry[] = HEARSE_PAGES.map((page) => ({
    href: hearsePath(page, lang),
    label: dict.nav[page],
    active: pathname === hearsePath(page, lang),
  }));

  const langs: LangEntry[] = LANGS.map((code) => ({
    code,
    label: langNames[code] ?? code.toUpperCase(),
    href: hearsePath(current, code),
    active: code === lang,
  }));

  return (
    <Header
      brand="hearse"
      homeHref={hearsePath("home", lang)}
      nav={nav}
      langs={langs}
      quoteHref={hearsePath("quote", lang)}
      quoteLabel={dict.common.getQuote}
      phone={HEARSE_CONTACT.phone}
      phoneHref={HEARSE_CONTACT.phoneHref}
      openMenuLabel={dict.common.openMenu}
      closeMenuLabel={dict.common.closeMenu}
    />
  );
}
