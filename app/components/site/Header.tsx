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
}: {
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
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled || open
            ? "glass shadow-[0_2px_10px_rgba(5,11,24,0.04),0_8px_30px_rgba(5,11,24,0.06)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link
            href={homeHref}
            className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label="Autotherm"
          >
            <Image
              src="/images/autotherm-logo.png"
              alt="Autotherm"
              width={148}
              height={36}
              className={`h-8 w-auto transition-[filter] duration-300 lg:h-9 ${scrolled || open ? "" : "brightness-0 invert"}`}
              preload
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-tight transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
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

          <div className="flex items-center gap-3">
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

            <Link
              href={quoteHref}
              className={`hidden rounded-full px-5 py-2.5 text-[13px] font-bold tracking-tight transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none sm:inline-flex ${
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
