"use client";

import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useScrollMetrics } from "./SmoothScroll";

/**
 * Scroll-reactive reveal primitives.
 *
 * Rather than playing a fixed animation whenever an element crosses a
 * threshold, each reveal samples the scroll at the instant it is triggered:
 *
 * - **Direction** — content travels *with* the page. Scrolling down, elements
 *   rise from below; scrolling back up, they settle down from above. Nothing
 *   ever animates against the direction you are moving.
 * - **Speed** — a fast flick widens the throw slightly and shortens the
 *   duration, so content catches up with the viewport instead of trailing it.
 *   A slow, deliberate scroll gets the full cinematic ease.
 *
 * Transform/opacity only, so everything stays GPU-composited.
 */

export const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

/** Scroll state sampled at the moment an element reveals. */
type RevealTiming = { sign: 1 | -1; speed: number };

const NEUTRAL: RevealTiming = { sign: 1, speed: 0 };

/**
 * Where the element starts. Vertical reveals take their sign from the scroll
 * direction; horizontal ones keep the explicit direction they were given.
 */
function hiddenOffset(direction: Direction, distance: number, timing: RevealTiming) {
  const reach = distance * (1 + timing.speed * 0.6);
  switch (direction) {
    case "up":
    case "down":
      return { y: reach * timing.sign };
    case "left":
      return { x: reach };
    case "right":
      return { x: -reach };
    default:
      return {};
  }
}

function revealTransition(timing: RevealTiming, delay: number) {
  return {
    duration: 0.8 - timing.speed * 0.32,
    ease: EASE_CINEMATIC,
    // Staged delays collapse when scrolling fast — otherwise a quick flick
    // leaves content still waiting to appear well after it is on screen.
    delay: delay * (1 - timing.speed * 0.6),
  };
}

/** Samples scroll direction + speed once per entry into view. */
function useRevealTiming(inView: boolean, once: boolean) {
  const { intensity, direction } = useScrollMetrics();
  const [timing, setTiming] = useState<RevealTiming>(NEUTRAL);
  const revealed = useRef(false);

  useEffect(() => {
    if (!inView) {
      if (!once) revealed.current = false;
      return;
    }
    if (revealed.current) return;
    revealed.current = true;
    setTiming({ sign: direction.get(), speed: intensity.get() });
  }, [inView, once, intensity, direction]);

  return { timing, revealed };
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
  direction?: Direction;
  distance?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const { timing, revealed } = useRevealTiming(inView, once);
  const controls = useAnimationControls();

  useEffect(() => {
    if (!revealed.current) return;
    // Re-seat at the sampled offset while still invisible, then play.
    controls.set({ opacity: 0, ...hiddenOffset(direction, distance, timing) });
    controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      transition: revealTransition(timing, delay),
    });
  }, [timing, controls, direction, distance, delay, revealed]);

  useEffect(() => {
    if (once || inView || !revealed.current) return;
    controls.start({ opacity: 0, ...hiddenOffset(direction, distance, timing) });
  }, [inView, once, controls, direction, distance, timing, revealed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...hiddenOffset(direction, distance, NEUTRAL) }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------- Staggered groups ---------------------------- */

/**
 * Carries the group's sampled timing to its items, so every child re-seats
 * itself with the same direction and speed before the stagger plays.
 */
const GroupTimingContext = createContext<RevealTiming>(NEUTRAL);

const groupVariants: Variants = {
  hidden: {},
  visible: (timing: RevealTiming) => ({
    transition: {
      // Tighter stagger the faster you are moving.
      staggerChildren: Math.max(0.035, 0.09 - timing.speed * 0.05),
      delayChildren: 0.05,
    },
  }),
};

type ItemCustom = { direction: Direction; distance: number; timing: RevealTiming };

const itemVariants: Variants = {
  hidden: ({ direction, distance, timing }: ItemCustom) => ({
    opacity: 0,
    ...hiddenOffset(direction, distance, timing),
  }),
  visible: ({ timing }: ItemCustom) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: revealTransition(timing, 0),
  }),
};

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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const { timing, revealed } = useRevealTiming(inView, once);
  const controls = useAnimationControls();

  useEffect(() => {
    if (!revealed.current) return;
    controls.set("hidden");
    controls.start("visible");
  }, [timing, controls, revealed]);

  return (
    <GroupTimingContext.Provider value={timing}>
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        variants={groupVariants}
        custom={timing}
      >
        {children}
      </motion.div>
    </GroupTimingContext.Provider>
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
  direction?: Direction;
  distance?: number;
}) {
  const timing = useContext(GroupTimingContext);
  const custom = useMemo<ItemCustom>(
    () => ({ direction, distance, timing }),
    [direction, distance, timing],
  );

  return (
    <motion.div className={className} variants={itemVariants} custom={custom}>
      {children}
    </motion.div>
  );
}

/**
 * Curtain wipe, expressed as clip-path insets. The plate uncovers from the
 * edge the scroll is coming from: scrolling down it rises from the bottom,
 * scrolling back up it drops from the top. The insets overshoot by 12% on
 * every other side so the element's own shadow is never clipped mid-wipe.
 */
const WIPE_OPEN = "inset(-12% -12% -12% -12%)";
function wipeClosed(sign: 1 | -1) {
  return sign === 1 ? "inset(100% -12% -12% -12%)" : "inset(-12% -12% 100% -12%)";
}

/**
 * Image reveal: a curtain wipe with a camera-dolly scale underneath it. The
 * plate also drifts in from the scroll direction, and a fast approach
 * tightens the move.
 */
export function DollyImage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { timing, revealed } = useRevealTiming(inView, true);
  const controls = useAnimationControls();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!revealed.current) return;
    const duration = 1.1 - timing.speed * 0.4;
    if (reduced) {
      controls.set({ clipPath: "none" });
      controls.start({ opacity: 1, transition: { duration: 0.3 } });
      return;
    }
    controls.set({
      opacity: 1,
      clipPath: wipeClosed(timing.sign),
      scale: 1.08 + timing.speed * 0.03,
      y: 24 * timing.sign,
    });
    controls
      .start({
        clipPath: WIPE_OPEN,
        scale: 1,
        y: 0,
        transition: {
          duration,
          ease: EASE_CINEMATIC,
          // The scale settles a touch after the wipe lands, like a lens easing off.
          scale: { duration: duration * 1.25, ease: EASE_CINEMATIC },
        },
      })
      // Drop the clip entirely once open: hover zooms and ring focus styles
      // should never be clipped by a leftover inset.
      .then(() => controls.set({ clipPath: "none" }));
  }, [timing, controls, revealed, reduced]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
