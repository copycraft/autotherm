"use client";

import { usePathname } from "next/navigation";
import Header, { type LangEntry, type NavEntry } from "./Header";
import { COMPANY, LANGS, type Lang } from "@/app/lib/constants";
import {
  NAV_KEYS,
  keyForSlug,
  pathFor,
  switchLangPath,
} from "@/app/lib/routes";

/**
 * Client container for the header: derives the active nav item and the
 * page-preserving language-switch targets from the current pathname.
 */
export default function HeaderContainer({
  lang,
  navLabels,
  langNames,
  quoteLabel,
  openMenuLabel,
  closeMenuLabel,
}: {
  lang: Lang;
  navLabels: Partial<Record<string, string>>;
  langNames: Record<string, string>;
  quoteLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const segments = pathname.split("/").filter(Boolean);
  const currentSlug = segments.length > 1 ? segments.slice(1).join("/") : "";
  const currentKey = keyForSlug(lang, currentSlug);

  const nav: NavEntry[] = NAV_KEYS[lang]
    .map((key) => {
      const href = pathFor(key, lang);
      const label = navLabels[key];
      if (!href || !label) return null;
      return { href, label, active: pathname === href };
    })
    .filter((x): x is NavEntry => x !== null);

  const langs: LangEntry[] = LANGS.map((code) => ({
    code,
    label: langNames[code] ?? code.toUpperCase(),
    href: currentKey ? switchLangPath(currentKey, code) : `/${code}`,
    active: code === lang,
  }));

  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;

  return (
    <Header
      homeHref={`/${lang}`}
      nav={nav}
      langs={langs}
      quoteHref={quoteHref}
      quoteLabel={quoteLabel}
      phone={COMPANY.phone}
      phoneHref={COMPANY.phoneHref}
      openMenuLabel={openMenuLabel}
      closeMenuLabel={closeMenuLabel}
    />
  );
}
