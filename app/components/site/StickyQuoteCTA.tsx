"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";

/**
 * Frictionless mobile CTA - a glassmorphic "Get Quotation" pill resting in
 * the bottom 5% of the viewport. Appears after the hero scrolls away and
 * hides itself on the quotation page (no dead-end CTAs).
 */
export default function StickyQuoteCTA({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const onQuotePage = pathname === href;

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setShow(v > 480));
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <AnimatePresence>
      {show && !onQuotePage && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
          className="fixed inset-x-0 bottom-[5vh] z-40 flex justify-center px-6 sm:hidden"
        >
          <motion.div
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
            className="w-full max-w-sm"
          >
            <Link
              href={href}
              className="glass-dark block w-full rounded-full px-8 py-4 text-center text-sm font-bold tracking-tight text-white shadow-glow ring-1 ring-frost-400/40 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {label}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
