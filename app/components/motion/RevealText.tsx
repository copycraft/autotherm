"use client";

import { motion, type Variants } from "framer-motion";
import { EASE_CINEMATIC } from "./Reveal";

/**
 * Word-by-word staggered headline reveal.
 * Words translate up + fade with tight 0.04s stagger - transform/opacity only.
 */

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
};

const TAG_MAP = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

export default function RevealText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}) {
  const MotionTag = TAG_MAP[Tag];
  const words = text.split(" ");
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom pb-1">
          <motion.span variants={word} className="inline-block will-change-transform">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export { container as textContainer, word as textWord };
