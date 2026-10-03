"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";

/**
 * Glassmorphic sticky header.
 * - Transparent over the hero, condenses into frosted glass after 24px scroll
 * - Desktop inline nav, mobile full-screen staggered overlay menu
 * - Flag-based language switcher preserving the current page across languages
 */

export interface NavEntry {
  href: string;
  label: string;
  active: boolean;
}

export interface LangEntry {
  code: string;
  href: string;
  label: string;
  active: boolean;
}

function Flag({ code }: { code: string }) {
  switch (code) {
    case "hu":
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" aria-hidden="true" className="rounded-[2px]">
          <rect width="24" height="5.33" fill="#CD2A3E" />
          <rect y="5.33" width="24" height="5.34" fill="#fff" />
          <rect y="10.67" width="24" height="5.33" fill="#436F4D" />
        </svg>
      );
    case "en":
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" aria-hidden="true" className="rounded-[2px]">
          <rect width="24" height="16" fill="#012169" />
          <rect x="10" width="4" height="16" fill="#fff" />
          <rect y="6" width="24" height="4" fill="#fff" />
          <rect x="11" y="1" width="2" height="14" fill="#C8102E" />
          <rect y="7" width="24" height="2" fill="#C8102E" />
        </svg>
      );
    case "de":
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" aria-hidden="true" className="rounded-[2px]">
          <rect width="24" height="5.33" fill="#000" />
          <rect y="5.33" width="24" height="5.33" fill="#DD0000" />
          <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" aria-hidden="true" className="rounded-[2px]">
          <rect width="8" height="16" fill="#002B7F" />
          <rect x="8" width="8" height="16" fill="#FCD116" />
          <rect x="16" width="8" height="16" fill="#CE1126" />
        </svg>
      );
  }
}

/** eHűtőautó wordmark: leaf mark + name, with an "by Autotherm" endorsement. */
export function EcoWordmark({ light }: { light: boolean }) {
  return (
    <span className="flex items-center gap-2.5" aria-hidden="true">
      <svg
        viewBox="0 0 32 32"
        className={`h-8 w-8 shrink-0 transition-colors duration-300 lg:h-9 lg:w-9 ${light ? "text-frost-300" : "text-brand-600"}`}
      >
        <path
          fill="currentColor"
          d="M27 4C14 4 6 10.5 6 19.5c0 2.6.8 4.9 2.1 6.7L5 29.3 6.7 31l3.1-3.1c1.8 1.3 4.1 2.1 6.7 2.1C25.5 30 28 20.5 27 4Z"
        />
        <path
          d="M10 26c4-6 8.5-10.5 14-14"
          fill="none"
          stroke={light ? "#04120b" : "#ffffff"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-black tracking-tight transition-colors duration-300 lg:text-xl ${light ? "text-white" : "text-ink-900"}`}
        >
          e<span className={light ? "text-frost-300" : "text-brand-600"}>Hűtőautó</span>
        </span>
        <span
          className={`mt-1 text-[9px] font-bold tracking-[0.3em] uppercase transition-colors duration-300 ${light ? "text-white/60" : "text-ink-500"}`}
        >
          by Autotherm
        </span>
      </span>
    </span>
  );
}

/** Halottszállító wordmark: gold "A" mark + name, with a "by Autotherm" endorsement. */
export function HearseWordmark({ light }: { light: boolean }) {
  return (
    <span className="flex items-center gap-2.5" aria-hidden="true">
      <svg
        viewBox="0 0 32 32"
        className={`h-8 w-8 shrink-0 transition-colors duration-300 lg:h-9 lg:w-9 ${light ? "text-frost-300" : "text-brand-600"}`}
      >
        <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          fill="currentColor"
          d="M16 8l6.5 14h-3.4L16 14.6 12.9 22H9.5L16 8z"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-black tracking-tight transition-colors duration-300 lg:text-xl ${light ? "text-white" : "text-ink-900"}`}
        >
          Halott<span className={light ? "text-frost-300" : "text-brand-600"}>szállító</span>
        </span>
        <span
          className={`mt-1 text-[9px] font-bold tracking-[0.3em] uppercase transition-colors duration-300 ${light ? "text-white/60" : "text-ink-500"}`}
        >
          by Autotherm
        </span>
      </span>
    </span>
  );
}

export default function Header({
  homeHref,
  nav,
  langs,
  quoteHref,
  quoteLabel,
  phone,
  phoneHref,
  openMenuLabel,
  closeMenuLabel,
  brand = "autotherm",
}: {
  /** "eco" swaps the logo for the eHűtőautó wordmark (ehutoauto.hu); "hearse" for the Halottszállító wordmark (halottszallito.hu). */
  brand?: "autotherm" | "eco" | "hearse";
  homeHref: string;
  nav: NavEntry[];
  langs: LangEntry[];
  quoteHref: string;
  quoteLabel: string;
  phone: string;
  phoneHref: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 24));
    return () => unsubscribe();
  }, [scrollY]);

  // Close the mobile menu on navigation.
  useEffect(() => {
    const id = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  // Lock body scroll while the overlay menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled || open
            ? "glass shadow-[0_2px_10px_rgba(5,11,24,0.04),0_8px_30px_rgba(5,11,24,0.06)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link
            href={homeHref}
            className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label={brand === "eco" ? "eHűtőautó – Autotherm" : brand === "hearse" ? "Halottszállító – Autotherm" : "Autotherm"}
          >
            {brand === "eco" ? (
              <EcoWordmark light={!(scrolled || open)} />
            ) : brand === "hearse" ? (
              <HearseWordmark light={!(scrolled || open)} />
            ) : (
              <Image
                src="/images/autotherm-logo.webp"
                alt="Autotherm"
                width={281}
                height={24}
                className={`h-5 w-auto transition-[filter] duration-300 lg:h-6 ${scrolled || open ? "" : "brightness-0 invert"}`}
                preload
              />
            )}
          </Link>

          <nav className="flex-1 hidden items-center justify-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-tight text-nowrap transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
                  scrolled
                    ? item.active
                      ? "text-brand-700"
                      : "text-ink-700 hover:text-brand-600"
                    : item.active
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                }`}
              >
                {item.label}
                {item.active && (
                  <motion.span
                    layoutId="nav-active"
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full ${scrolled ? "bg-brand-600" : "bg-frost-300"}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-1.5 md:flex" role="group" aria-label="Language">
              {langs.map((l) => (
                <Link
                  key={l.code}
                  href={l.href}
                  hrefLang={l.code}
                  title={l.label}
                  aria-label={l.label}
                  className={`rounded-md p-1 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
                    l.active ? "opacity-100 ring-1 ring-frost-400/60" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Flag code={l.code} />
                </Link>
              ))}
            </div>

            <a
              href={phoneHref}
              aria-label={phone}
              className={`inline-flex items-center rounded-full px-3 py-2 text-sm font-bold tracking-tight transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none sm:hidden ${
                scrolled
                  ? "text-brand-600 hover:text-brand-500"
                  : "text-frost-200 hover:text-white"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>

            <Link
              href={quoteHref}
              className={`hidden rounded-lg px-5 py-2.5 text-[13px] font-bold tracking-tight text-nowrap transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none sm:inline-flex ${
                scrolled
                  ? "bg-brand-600 text-white hover:bg-brand-500 hover:shadow-glow"
                  : "bg-white/95 text-ink-900 hover:bg-white"
              }`}
            >
              {quoteLabel}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? closeMenuLabel : openMenuLabel}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none lg:hidden ${
                scrolled || open ? "text-ink-900" : "text-white"
              }`}
            >
              <span className="relative block h-3.5 w-5" aria-hidden="true">
                <motion.span
                  className="absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current"
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <motion.span
                  className="absolute left-0 top-[6px] block h-0.5 w-5 rounded-full bg-current"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="absolute left-0 top-[12px] block h-0.5 w-5 rounded-full bg-current"
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass fixed inset-0 z-40 overflow-y-auto pt-24 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <motion.nav
              className="mx-auto flex max-w-7xl flex-col gap-1 px-6 pb-10"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              aria-label="Mobile"
            >
              {nav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_CINEMATIC } },
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={`block rounded-2xl px-4 py-4 text-2xl font-bold tracking-tighter transition-colors focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none ${
                      item.active ? "text-brand-600" : "text-ink-900 hover:text-brand-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_CINEMATIC } },
                }}
                className="mt-6 flex flex-col gap-4 border-t border-ink-200/70 pt-6"
              >
                <div className="flex items-center gap-2" role="group" aria-label="Language">
                  {langs.map((l) => (
                    <Link
                      key={l.code}
                      href={l.href}
                      hrefLang={l.code}
                      aria-label={l.label}
                      className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none ${
                        l.active
                          ? "bg-brand-600 text-white ring-brand-600"
                          : "text-ink-700 ring-ink-200 hover:bg-ink-100"
                      }`}
                    >
                      <Flag code={l.code} />
                      {l.code.toUpperCase()}
                    </Link>
                  ))}
                </div>
                <a
                  href={phoneHref}
                  className="text-lg font-bold text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                >
                  {phone}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
