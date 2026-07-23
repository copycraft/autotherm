"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import MagneticButton from "@/app/components/motion/MagneticButton";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import { textWord } from "@/app/components/motion/RevealText";

/**
 * Cinematic homepage hero.
 * - Dark mesh-gradient stage with engineering grid overlay
 * - Word-staggered display headline (first line white, second frost gradient)
 * - Scroll-linked parallax: content drifts up + fades as the user scrolls
 * - Floating product image card with slow parallax counter-motion
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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  const words = (text: string) => text.split(" ");

  return (
    <section
      ref={ref}
      className="mesh-hero relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="grid-overlay absolute inset-0" aria-hidden="true" />
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -top-32 left-1/3 h-[34rem] w-[34rem] rounded-full bg-brand-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 pt-32 pb-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 0.1 }}
            className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2"
          >
            <span className="h-1.5 w-1.5 animate-shimmer rounded-full bg-frost-300" aria-hidden="true" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-frost-200 uppercase">
              {eyebrow}
            </p>
          </motion.div>

          <h1 className="mt-8 text-5xl font-black tracking-tighter text-balance sm:text-6xl xl:text-7xl">
            <motion.span
              className="block text-white"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.25 } } }}
              aria-label={titleA}
            >
              {words(titleA).map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
                  <motion.span variants={textWord} className="inline-block will-change-transform">
                    {w}
                    {i < words(titleA).length - 1 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              ))}
            </motion.span>
            <motion.span
              className="text-frost-gradient block"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.45 } } }}
              aria-label={titleB}
            >
              {words(titleB).map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
                  <motion.span variants={textWord} className="inline-block will-change-transform">
                    {w}
                    {i < words(titleB).length - 1 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_CINEMATIC, delay: 0.7 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-300"
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
        </motion.div>

        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE_CINEMATIC, delay: 0.5 }}
          className="relative hidden lg:block"
        >
          <div className="relative overflow-hidden rounded-4xl shadow-lifted ring-1 ring-white/15">
            <Image
              src={image}
              alt=""
              aria-hidden="true"
              width={880}
              height={660}
              preload
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-[30rem] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" aria-hidden="true" />
            <div className="glass-dark absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl px-5 py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-frost-400/20 text-frost-300" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M12 2v20M4 6l16 12M20 6L4 18" />
                </svg>
              </span>
              <p className="text-sm font-semibold text-white">{badge}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <p className="text-[10px] font-bold tracking-[0.25em] text-ink-400 uppercase">
          {scrollHint}
        </p>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-[1.5px] rounded-full bg-gradient-to-b from-frost-300 to-transparent"
        />
      </motion.div>
    </section>
  );
}
