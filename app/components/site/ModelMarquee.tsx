import Icon from "@/app/components/ui/Icon";
import type { IconName } from "@/app/lib/page-content";

/**
 * Slow marquee of vehicle names under a small caption: the base vehicles a
 * site converts. The list is rendered twice so the loop is seamless; the
 * second copy is hidden from assistive tech.
 */
export default function ModelMarquee({
  title,
  items,
  icon = "snowflake",
}: {
  title: string;
  items: string[];
  icon?: IconName;
}) {
  return (
    <section className="overflow-hidden border-b border-ink-100 bg-white py-16">
      <p className="px-4 text-center text-xs font-bold tracking-[0.28em] text-ink-400 uppercase">
        {title}
      </p>
      <ul className="mt-8 flex w-max animate-marquee items-center gap-10">
        {[...items, ...items].map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length ? true : undefined}
            className="flex items-center gap-10 text-3xl font-black tracking-tighter whitespace-nowrap text-ink-200 sm:text-5xl"
          >
            {item}
            <Icon name={icon} className="h-6 w-6 text-brand-300" />
          </li>
        ))}
      </ul>
    </section>
  );
}
