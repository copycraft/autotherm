"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import type { IconName } from "@/app/lib/page-content";

/**
 * Crisp 24px stroke icon set that draws itself.
 *
 * The first time an icon scrolls into view its strokes trace on in order,
 * like a pen - pathLength 0 → 1, one shape after another. Server markup is
 * always the undrawn state; reduced motion only changes the timing (instant),
 * never the markup, so hydration can't mismatch.
 * All icons are decorative by default (aria-hidden).
 */

type Shape =
  | { kind: "path"; d: string }
  | { kind: "circle"; cx: number; cy: number; r: number };

const p = (d: string): Shape => ({ kind: "path", d });
const c = (cx: number, cy: number, r: number): Shape => ({ kind: "circle", cx, cy, r });

const SHAPES: Record<IconName, Shape[]> = {
  snowflake: [p("M12 2v20M4 6l16 12M20 6L4 18"), p("M12 2l-2 3h4l-2-3zM12 22l-2-3h4l-2 3z")],
  shield: [p("M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"), p("M9 12l2 2 4-4")],
  wrench: [
    p("M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.9 2.9-2.1-2.1 2.9-2.9z"),
  ],
  truck: [p("M1 7h12v9H1zM13 10h5l3 3v3h-8z"), c(6, 18.5, 1.8), c(17, 18.5, 1.8)],
  clock: [c(12, 12, 9), p("M12 7v5l3.5 2")],
  factory: [p("M2 20h20M4 20V10l5 3v-3l5 3v-3l6 3.5V20"), p("M17 7l1-4h2l1 4")],
  medal: [
    c(12, 14, 5),
    p("M12 12.2l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3.9-1.8zM8 3l2.5 5M16 3l-2.5 5"),
  ],
  layers: [p("M12 3l9 5-9 5-9-5 9-5z"), p("M3 13l9 5 9-5")],
  thermometer: [p("M10 4a2 2 0 1 1 4 0v9.3a4.5 4.5 0 1 1-4 0V4z"), p("M12 9v7")],
  heart: [p("M12 20.5s-7.5-4.7-9.5-9A5.3 5.3 0 0 1 12 6.4a5.3 5.3 0 0 1 9.5 5.1c-2 4.3-9.5 9-9.5 9z")],
  check: [c(12, 12, 9), p("M8 12.5l2.5 2.5L16 9.5")],
  spark: [p("M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2z")],
};

type DrawCustom = { index: number; reduced: boolean };

const draw: Variants = {
  // Opacity hides the round line-cap dot that a zero-length stroke still paints.
  hidden: { pathLength: 0, opacity: 0 },
  visible: ({ index, reduced }: DrawCustom) => {
    const delay = reduced ? 0 : 0.15 + index * 0.14;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: reduced ? 0 : 0.9, ease: EASE_CINEMATIC, delay },
        opacity: { duration: 0.01, delay },
      },
    };
  },
};

export default function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {SHAPES[name].map((shape, index) => {
        const custom: DrawCustom = { index, reduced };
        return shape.kind === "path" ? (
          <motion.path key={index} d={shape.d} variants={draw} custom={custom} />
        ) : (
          <motion.circle
            key={index}
            cx={shape.cx}
            cy={shape.cy}
            r={shape.r}
            variants={draw}
            custom={custom}
          />
        );
      })}
    </motion.svg>
  );
}
