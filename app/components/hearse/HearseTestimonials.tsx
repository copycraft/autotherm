import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import Eyebrow from "@/app/components/ui/Eyebrow";
import type { Lang } from "@/app/lib/constants";
import { getHearseDict } from "@/app/lib/hearse";

/** Opening and closing quotation marks per language. */
const QUOTES: Record<Lang, [string, string]> = {
  hu: ["„", "”"],
  en: ["“", "”"],
  de: ["„", "“"],
  ro: ["„", "”"],
};

/** Customer quotes from the original site; `limit` shows only the first few. */
export default function HearseTestimonials({ lang, limit }: { lang: Lang; limit?: number }) {
  const { testimonials } = getHearseDict(lang);
  const items = testimonials.items.slice(0, limit);
  const [open, close] = QUOTES[lang];

  return (
    <section className="mesh-light py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Eyebrow label={testimonials.eyebrow} tone="light" />
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl">
            {testimonials.title}
          </h2>
        </Reveal>
        <RevealGroup className={`mt-12 grid grid-cols-1 gap-4 ${items.length > 1 ? "md:grid-cols-2" : ""}`}>
          {items.map((t) => (
            <RevealItem key={t.name} className="panel-ring rounded-3xl bg-white p-8 shadow-soft">
              <blockquote className="text-lg leading-relaxed text-ink-700">
                {open}
                {t.quote}
                {close}
              </blockquote>
              <p className="mt-6 border-t border-ink-100 pt-4 text-sm font-extrabold tracking-tight text-ink-900">
                {t.name}
              </p>
              <p className="text-sm text-ink-500">{t.role}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
