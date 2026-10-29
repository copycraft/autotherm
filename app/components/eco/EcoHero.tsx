"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import MagneticButton from "@/app/components/motion/MagneticButton";
import Parallax from "@/app/components/motion/Parallax";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import VelocityStretch from "@/app/components/motion/VelocityStretch";
import Eyebrow from "@/app/components/ui/Eyebrow";
import type { EcoDict } from "@/app/lib/eco-i18n";

/**
 * ehutoauto.hu home hero: one photograph, the e-Expert on charge. On desktop the
 * plate is pinned to the right and its left edge dissolves into the page, so
 * the copy sits on clean dark and the charging port stays visible; on mobile
 * it runs full-bleed with the scrim weighted low.
 */
export default function EcoHero({
  copy,
  quoteLabel,
  quoteHref,
  technologyHref,
}: {
  copy: EcoDict["hero"];
  quoteLabel: string;
  quoteHref: string;
  technologyHref: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE_CINEMATIC, delay: reduced ? 0 : delay },
  });

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-950 lg:items-center">
      <Parallax
        className="absolute inset-x-0 top-0 h-[46svh] lg:inset-0 lg:left-auto lg:h-auto lg:w-[78%] lg:[mask-image:linear-gradient(to_right,transparent,#000_32%)]"
        speed={0.25}
      >
        <VelocityStretch className="h-full w-full">
          <Image
            src="/images/eexpert-reefer-charging.webp"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[28%_50%] lg:object-left"
          />
        </VelocityStretch>
      </Parallax>

      {/* Phones: the photo is a band across the top and fades into the page,
          so the copy below sits on plain dark instead of over a cropped photo. */}
      <div
        className="absolute inset-x-0 top-0 h-[46svh] bg-gradient-to-t from-ink-950 via-ink-950/20 to-ink-950/30 lg:hidden"
        aria-hidden="true"
      />
      <div className="absolute inset-0 hidden bg-ink-950/35 lg:block" aria-hidden="true" />
      <div
        className="absolute inset-0 hidden lg:block lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/40 lg:to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-[calc(46svh-3rem)] pb-16 sm:px-6 sm:pb-24 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <motion.div {...fade(0.1)}>
            <Eyebrow label={copy.eyebrow} />
          </motion.div>
          <RevealText
            as="h1"
            text={copy.title}
            delay={0.2}
            className="mt-8 block text-5xl font-black tracking-tighter text-balance text-white sm:text-6xl xl:text-7xl"
          />
          <motion.p
            {...fade(0.35)}
            className="mt-4 text-2xl font-extrabold tracking-tight text-frost-300 sm:text-3xl"
          >
            {copy.tagline}
          </motion.p>
          <motion.p {...fade(0.5)} className="mt-8 max-w-xl text-lg leading-relaxed text-ink-200">
            {copy.lead}
          </motion.p>
          <motion.div {...fade(0.65)} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href={quoteHref} variant="primary">
              {quoteLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </MagneticButton>
            <MagneticButton href={technologyHref} variant="ghost">
              {copy.howItWorks}
            </MagneticButton>
          </motion.div>
          <motion.ul {...fade(0.8)} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            {copy.points.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-semibold text-ink-200">
                <span className="h-1.5 w-1.5 rounded-full bg-frost-300" aria-hidden="true" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
