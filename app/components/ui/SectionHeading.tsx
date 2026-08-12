import { Reveal } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";

/**
 * Editorial section heading - eyebrow, staggered display title, relaxed lead.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const alignCls = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      <Reveal direction="up" distance={16}>
        <div className={`inline-flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className={`h-px w-8 ${dark ? "bg-frost-300/70" : "bg-brand-500"}`} aria-hidden="true" />
          <p
            className={`text-xs font-bold tracking-[0.28em] uppercase ${dark ? "text-frost-300" : "text-brand-600"}`}
          >
            {eyebrow}
          </p>
        </div>
      </Reveal>
      <RevealText
        as="h2"
        text={title}
        delay={0.1}
        className={`mt-4 block text-4xl font-extrabold tracking-tighter text-balance sm:text-5xl ${dark ? "text-white" : "text-ink-900"}`}
      />
      {lead && (
        <Reveal direction="up" distance={20} delay={0.25}>
          <p
            className={`mt-6 text-lg leading-relaxed ${dark ? "text-ink-300" : "text-ink-600"}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
