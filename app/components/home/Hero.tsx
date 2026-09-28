"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Fragment, useRef } from "react";
import MagneticButton from "@/app/components/motion/MagneticButton";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import { textWord } from "@/app/components/motion/RevealText";
import Eyebrow from "@/app/components/ui/Eyebrow";

/**
 * Photographic homepage hero.
 * - Full-bleed plant photography carries the page; no synthetic gradients
 * - Layered scrim keeps the headline legible over a bright, high-key image
 * - Scroll-linked parallax: the plate drifts slower than the copy
 * - Hard edge into the next section (no soft fade) for an editorial cut
 */
export default function Hero({
  eyebrow,
  titleA,
  titleB,
  lead,
  ctaPrimary,
  ctaPrimaryHref,
  ctaSecondary,
  ctaSecondaryHref,
  badge,
  scrollHint,
  image,
}: {
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  badge: string;
  scrollHint: string;
  image: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const plateY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const words = (text: string) => text.split(" ");

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-950 lg:items-center"
    >
      <motion.div style={{ y: plateY }} className="absolute inset-0" aria-hidden="true">
        <Image
          src={image}
          alt=""
          fill
          preload
          quality={90}
          sizes="100vw"
          className="scale-105 object-cover object-center"
        />
      </motion.div>

      {/* Scrim: flat base for overall legibility, then weighted left (desktop
          reading column) and bottom (mobile, where copy sits low). */}
      <div className="absolute inset-0 bg-ink-950/45" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/10 lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/72 lg:to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-20 sm:px-6 sm:pb-28 lg:px-8 lg:py-32">
        <motion.div style={{ y: contentY }} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 0.1 }}
          >
            <Eyebrow label={eyebrow} />
          </motion.div>

          <h1 className="mt-8 text-4xl font-black tracking-tighter text-white sm:text-6xl xl:text-7xl">
            <motion.span
              className="block"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.25 } } }}
              aria-label={titleA}
            >
              {words(titleA).map((w, i) => (
                <Fragment key={i}>
                  <span className="-mx-[0.1em] inline-block overflow-hidden px-[0.1em] align-bottom pb-1">
                    <motion.span variants={textWord} className="inline-block will-change-transform">
                      {w}
                    </motion.span>
                  </span>
                  {i < words(titleA).length - 1 ? " " : null}
                </Fragment>
              ))}
            </motion.span>
            <motion.span
              className="block"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.45 } } }}
              aria-label={titleB}
            >
              {words(titleB).map((w, i) => (
                <Fragment key={i}>
                  <span className="-mx-[0.1em] inline-block overflow-hidden px-[0.1em] align-bottom pb-1">
                    <motion.span variants={textWord} className="inline-block will-change-transform">
                      {w}
                    </motion.span>
                  </span>
                  {i < words(titleB).length - 1 ? " " : null}
                </Fragment>
              ))}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_CINEMATIC, delay: 0.7 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-200"
          >
            {lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_CINEMATIC, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href={ctaPrimaryHref} variant="primary">
              {ctaPrimary}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </MagneticButton>
            <MagneticButton href={ctaSecondaryHref} variant="ghost">
              {ctaSecondary}
            </MagneticButton>
          </motion.div>

          {/* Credential line — a caption on the photograph, not a floating card. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE_CINEMATIC, delay: 1.05 }}
            className="mt-12 flex items-center gap-4 border-t border-white/15 pt-5"
          >
            <span className="text-frost-300" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M12 2v20M4 6l16 12M20 6L4 18" />
              </svg>
            </span>
            <p className="text-[13px] font-semibold tracking-tight text-ink-200">{badge}</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute right-8 bottom-8 hidden flex-col items-center gap-2 lg:flex"
        aria-hidden="true"
      >
        <p className="text-[10px] font-bold tracking-[0.25em] text-ink-300 uppercase [writing-mode:vertical-rl]">
          {scrollHint}
        </p>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-10 w-px origin-top bg-frost-300/70"
        />
      </motion.div>
    </section>
  );
}
