"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";

/* ------------------------- Session dismissal store ------------------------- */

const STORAGE_KEY = "autotherm:infoblokk-dismissed";
const listeners = new Set<() => void>();
/** Used when sessionStorage is blocked: closes for this page view only. */
let dismissedFallback = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1" || dismissedFallback;
  } catch {
    return dismissedFallback;
  }
}

function dismiss() {
  dismissedFallback = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* storage blocked - the fallback flag covers this page view */
  }
  listeners.forEach((l) => l());
}

/**
 * Széchenyi 2020 EU funding infoblokk, fixed in the bottom-right corner of
 * every page. The corner-arc artwork is designed to sit flush against the
 * viewport edges; the white outside the arc has been cut to transparency so
 * it reads cleanly over dark sections too.
 *
 * Visitors can close it. That is remembered for the browser session only -
 * it is funding publicity, so it returns on the next visit. The server always
 * renders it open; useSyncExternalStore swaps in the stored state after
 * hydration without a mismatch.
 *
 * The frame is non-interactive (the transparent area above the arc would
 * otherwise swallow clicks on the content underneath). Only the close button
 * and the badge link take pointer events, and the link is clipped to the
 * visible panel. It opens the hidden GINOP grants page. Size comes from --infoblokk-w (globals.css), which the
 * footer and mobile quote pill also clear.
 */
/**
 * Outline of the opaque panel below the blue arc, traced from the image's
 * alpha channel (x in 5% steps). Used to clip the link's clickable area.
 */
const PANEL_SHAPE =
  "polygon(10% 80.4%, 15% 59.7%, 20% 47.5%, 25% 38.2%, 30% 31.2%, 35.1% 25.2%, 40.1% 20.5%, 45.1% 16.5%, 50.1% 13.4%, 55.1% 11%, 60.1% 9.3%, 65.1% 8.1%, 70.1% 7.4%, 75.1% 7.4%, 80.1% 7.9%, 85.1% 8.9%, 90.1% 10.7%, 95.1% 13%, 100% 15.7%, 100% 100%, 10% 100%)";

export default function Infoblokk({
  href,
  closeLabel,
}: {
  /** The GINOP grants page. */
  href: string;
  closeLabel: string;
}) {
  const dismissed = useSyncExternalStore(subscribe, isDismissed, () => false);

  // Once closed, stop the footer and mobile quote pill reserving room for it.
  // Set inline on <html> so it outranks the stylesheet default.
  useEffect(() => {
    const root = document.documentElement.style;
    if (dismissed) root.setProperty("--infoblokk-h", "0px");
    else root.removeProperty("--infoblokk-h");
  }, [dismissed]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={false}
          exit={{ opacity: 0, x: 24, y: 24, transition: { duration: 0.35, ease: EASE_CINEMATIC } }}
          className="pointer-events-none fixed right-0 bottom-0 z-30 w-(--infoblokk-w) print:hidden"
          style={{ viewTransitionName: "site-infoblokk" }}
        >
          {/* The link is clipped to the white panel inside the arc, so only
              the visible badge is clickable - clip-path also clips hit-testing. */}
          <Link
            href={href}
            className="pointer-events-auto block outline-none focus-visible:brightness-90"
            style={{ clipPath: PANEL_SHAPE }}
          >
            <Image
              src="/images/szechenyi-2020-infoblokk.webp"
              alt="Széchenyi 2020 – Magyarország Kormánya, Európai Unió, Európai Regionális Fejlesztési Alap – Befektetés a jövőbe. GINOP pályázatok"
              width={700}
              height={484}
              sizes="(min-width: 640px) 17.5rem, 9.5rem"
              className="h-auto w-full"
            />
          </Link>
          {/* Centred on the frame's top edge, above where the arc meets the
              right side - so it never covers the logos. */}
          <button
            type="button"
            onClick={dismiss}
            aria-label={closeLabel}
            title={closeLabel}
            className="pointer-events-auto absolute top-0 right-1.5 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/85 text-white shadow-soft ring-1 ring-white/25 transition-colors hover:bg-ink-950 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:outline-none"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-3 w-3" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
