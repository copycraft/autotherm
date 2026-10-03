"use client";

import { usePathname } from "next/navigation";
import Header, { type NavEntry } from "@/app/components/site/Header";
import { ECO_CONTACT, ECO_NAV, ECO_PATHS } from "@/app/lib/eco";

/**
 * Header for ehutoauto.hu: the shared Header with the eco wordmark, the eco
 * menu and the electric-conversions sales line. Hungarian only, so no
 * language switcher.
 */
export default function EcoHeader() {
  // On the eco domain the address bar shows clean paths ("/technologia"),
  // so the active item is a plain comparison.
  const pathname = usePathname() ?? "/";

  const nav: NavEntry[] = ECO_NAV.map(({ key, label }) => ({
    href: ECO_PATHS[key],
    label,
    active: pathname === ECO_PATHS[key],
  }));

  return (
    <Header
      brand="eco"
      homeHref={ECO_PATHS.home}
      nav={nav}
      langs={[]}
      quoteHref={ECO_PATHS.quote}
      quoteLabel="Árajánlatot kérek"
      phone={ECO_CONTACT.phone}
      phoneHref={ECO_CONTACT.phoneHref}
      openMenuLabel="Menü megnyitása"
      closeMenuLabel="Menü bezárása"
    />
  );
}
