import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import type { Lang } from "@/app/lib/constants";
import { getHearseDict } from "@/app/lib/hearse";
import type { IconName } from "@/app/lib/page-content";

/** See-what-you-get, 3-year insulation warranty. */
const ICONS: IconName[] = ["heart", "medal"];

/** The company's guarantees, on a dark band. */
export default function HearseGuarantees({ lang }: { lang: Lang }) {
  const { guarantees } = getHearseDict(lang);

  return (
    <section className="bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Eyebrow label={guarantees.eyebrow} />
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tighter text-balance text-white sm:text-5xl">
            {guarantees.title}
          </h2>
        </Reveal>
        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {guarantees.items.map((g, i) => (
            <RevealItem key={g.title} className="rounded-3xl bg-white/5 p-8 ring-1 ring-frost-300/20">
              <Icon name={ICONS[i]} className="h-7 w-7 text-frost-300" />
              <h3 className="mt-5 text-xl font-extrabold tracking-tight text-white">{g.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">{g.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
