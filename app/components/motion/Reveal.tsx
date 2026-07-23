"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-triggered reveal primitives.
 * Apple-cinematic easing, transform/opacity only (GPU-composited),
 * stagger orchestration for lists and grids.
 */

export const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

function itemVariants(direction: "up" | "down" | "left" | "right" | "none", distance: number): Variants {
  const offset =
    direction === "up"
      ? { y: distance }
      : direction === "down"
        ? { y: -distance }
        : direction === "left"
          ? { x: distance }
          : direction === "right"
            ? { x: -distance }
            : {};
  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: EASE_CINEMATIC },
    },
  };
}

export function Reveal({
  children,
  className,
  direction = "up",
  distance = 28,
  delay = 0,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: itemVariants(direction, distance).hidden,
        visible: {
          ...(itemVariants(direction, distance).visible as object),
          transition: { duration: 0.8, ease: EASE_CINEMATIC, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  amount = 0.15,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
  distance = 28,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}) {
  return (
    <motion.div className={className} variants={itemVariants(direction, distance)}>
      {children}
    </motion.div>
  );
}

/** Image reveal with subtle camera-dolly scale (1.05 → 1). */
export function DollyImage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: EASE_CINEMATIC }}
    >
      {children}
    </motion.div>
  );
}
