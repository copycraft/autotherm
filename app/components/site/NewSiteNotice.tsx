"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";

/**
 * One-time "we have a new website" notice for visitors redirected from the
 * old site (the redirects append ?from=old). It removes the parameter from
 * the address bar, remembers the dismissal for the session, and stores
 * nothing else - no cookie consent needed.
 */

const SESSION_KEY = "autotherm-new-site-notice";

export default function NewSiteNotice({
  title,
  body,
  cta,
  close,
  href,
}: {
  title: string;
  body: string;
  cta: string;
  close: string;
  href: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("from") !== "old") return;

    // Keep the address bar clean (and shareable).
    url.searchParams.delete("from");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);

    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // Session storage unavailable: just show it.
    }
    const id = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(id);
  }, []);

  function dismiss() {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Ignore storage failures.
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
          className="fixed inset-x-4 top-24 z-[58] mx-auto max-w-xl"
          role="region"
          aria-label={title}
        >
          <div className="glass relative rounded-3xl p-5 pr-12 shadow-lifted ring-1 ring-black/5">
            <p className="text-sm font-extrabold text-ink-900">{title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-700">{body}</p>
            <Link
              href={href}
              onClick={dismiss}
              className="mt-3 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {cta}
            </Link>
            <button
              type="button"
              onClick={dismiss}
              aria-label={close}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
