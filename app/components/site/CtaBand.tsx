import MagneticButton from "@/app/components/motion/MagneticButton";
import { Reveal } from "@/app/components/motion/Reveal";
import { COMPANY } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";

export default function CtaBand({
  title,
  body,
  primaryLabel,
  quoteHref,
}: {
  title: string;
  body: string;
  primaryLabel: string;
  quoteHref: string;
}) {
  return (
    <section className="mesh-hero relative overflow-hidden py-24 sm:py-32">
      <div className="grid-overlay absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-4xl font-black tracking-tighter text-balance text-white sm:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href={quoteHref} variant="primary">
            {primaryLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </MagneticButton>
          <MagneticButton href={COMPANY.phoneHref} variant="ghost">
            {COMPANY.phone}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
