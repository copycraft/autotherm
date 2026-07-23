"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

/**
 * Magnetic CTA button.
 * - Cursor-following magnetic translation (spring-damped, transform-only)
 * - Glowing border on hover, y: -2 lift
 * - Immediate whileTap scale 0.96 click-down
 */

const SPRING = { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } as const;

type Variant = "primary" | "ghost" | "frost";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-500 shadow-[0_2px_10px_rgba(39,79,226,0.25),0_8px_30px_rgba(39,79,226,0.25)] hover:shadow-glow",
  ghost:
    "glass-dark text-white hover:bg-white/10 ring-1 ring-white/15 hover:ring-white/30",
  frost:
    "bg-white text-ink-900 hover:bg-frost-100 shadow-soft ring-1 ring-black/5",
};

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type,
  disabled,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 200, damping: 20, mass: 0.6 });

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.18);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.18);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  const inner = (
    <motion.span
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-tight transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none ${styles[variant]} ${disabled ? "pointer-events-none opacity-60" : ""}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={SPRING}
    >
      {children}
    </motion.span>
  );

  const motionWrapProps: HTMLMotionProps<"div"> = {
    style: { x, y },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <motion.div ref={ref} className={`inline-block ${className}`} {...motionWrapProps}>
        <Link
          href={href}
          aria-label={ariaLabel}
          className="rounded-full focus-visible:outline-none"
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} className={`inline-block ${className}`} {...motionWrapProps}>
      <button
        type={type ?? "button"}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className="rounded-full focus-visible:outline-none"
      >
        {inner}
      </button>
    </motion.div>
  );
}
