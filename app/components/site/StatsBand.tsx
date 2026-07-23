import CountUp from "@/app/components/motion/CountUp";
import {
  RevealGroup,
  RevealItem,
} from "@/app/components/motion/Reveal";
import { getStats } from "@/app/lib/db";
import type { Lang } from "@/app/lib/constants";
import type { Dict } from "@/app/lib/dictionaries";

export default async function StatsBand({ lang, dict }: { lang: Lang; dict: Dict }) {
  const locale =
    lang === "en" ? "en-US" : lang === "de" ? "de-DE" : lang === "ro" ? "ro-RO" : "hu-HU";
  const s = await getStats();
  const years = new Date().getFullYear() - s.foundedYear;
  const stats = [
    { value: years, suffix: dict.home.stats.yearsSuffix, label: dict.home.stats.years },
    { value: s.customers, suffix: dict.home.stats.customersSuffix, label: dict.home.stats.customers },
    { value: s.annualConversions, suffix: dict.home.stats.conversionsSuffix, label: dict.home.stats.conversions },
    { value: s.employees, suffix: "", label: dict.home.stats.employees },
  ];
  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem
              key={s.label}
              className="panel-ring rounded-3xl bg-ink-50 px-6 py-10 text-center"
            >
              <p className="text-5xl font-black tracking-tighter text-ink-900 tabular-nums sm:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} locale={locale} />
              </p>
              <p className="mt-3 text-xs font-bold tracking-[0.15em] text-ink-500 uppercase">
                {s.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
