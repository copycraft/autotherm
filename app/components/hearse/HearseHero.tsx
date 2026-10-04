"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import MagneticButton from "@/app/components/motion/MagneticButton";
import Parallax from "@/app/components/motion/Parallax";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import VelocityStretch from "@/app/components/motion/VelocityStretch";
import Eyebrow from "@/app/components/ui/Eyebrow";
import type { HearseDict } from "@/app/lib/hearse-i18n";

/**
 * halottszallito.hu home hero. Workshop photography on the plate, kept dark
 * and dignified with a charcoal overlay.
 */
export default function HearseHero({
  copy,
  quoteLabel,
  quoteHref,
  buildsHref,
}: {
  copy: HearseDict["hero"];
  quoteLabel: string;
  quoteHref: string;
  buildsHref: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE_CINEMATIC, delay: reduced ? 0 : delay },
  });

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950">
      {/* Workshop plate: parallax drift underneath, velocity stretch on the move. */}
      <Parallax className="absolute inset-0" speed={0.3}>
        <VelocityStretch className="h-full w-full">
          <Image
            src="/images/hearse/hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-[1.08] object-cover opacity-40"
          />
        </VelocityStretch>
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-32 pb-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-32">
        <div className="lg:col-span-7">
          <motion.div {...fade(0.1)}>
            <Eyebrow label={copy.eyebrow} />
          </motion.div>
          <RevealText
            as="h1"
            text={copy.title}
            delay={0.2}
            className="mt-8 block text-5xl font-black tracking-tighter text-balance text-white sm:text-6xl xl:text-7xl"
          />
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
            <MagneticButton href={buildsHref} variant="ghost">
              {copy.buildsLabel}
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
