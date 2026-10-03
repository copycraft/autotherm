"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import { readConsent, writeConsent } from "@/app/lib/consent";

/**
 * Glassmorphic cookie consent bar.
 * Persists the decision in localStorage; renders nothing until hydrated
 * to avoid a flash for returning visitors.
 */
export default function CookieConsent({
  text,
  accept,
  decline,
}: {
  text: string;
  accept: string;
  decline: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent() === null) {
      const id = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(id);
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    writeConsent(value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
          className="fixed inset-x-4 bottom-4 z-[60] sm:inset-x-auto sm:right-6 sm:max-w-md"
          role="region"
          aria-label="Cookie consent"
        >
          <div className="glass rounded-3xl p-5 shadow-lifted ring-1 ring-black/5">
            <p className="text-[13px] leading-relaxed text-ink-700">{text}</p>
            <div className="mt-4 flex items-center gap-3">
              <motion.button
                type="button"
                onClick={() => choose("accepted")}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                className="rounded-lg bg-brand-600 px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {accept}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => choose("declined")}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                className="rounded-lg px-5 py-2.5 text-[13px] font-semibold text-ink-600 ring-1 ring-ink-200 transition-colors hover:bg-ink-100 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {decline}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
