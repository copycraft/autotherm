import type { Lang } from "@/app/lib/constants";
import { ECO_CONTACT, getEcoDict } from "@/app/lib/eco";

/** The electric-conversions sales contact, as a card. */
export default function EcoContactCard({ lang, intro }: { lang: Lang; intro?: string }) {
  const { common, contactRole } = getEcoDict(lang);

  return (
    <div className="rounded-3xl bg-ink-950 p-8 shadow-lifted">
      <p className="text-[11px] font-bold tracking-[0.2em] text-frost-300 uppercase">
        {common.contactPerson}
      </p>
      {intro && <p className="mt-4 text-sm leading-relaxed text-ink-300">{intro}</p>}
      <div className="mt-6 flex items-center gap-4">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-black text-white"
          aria-hidden="true"
        >
          {ECO_CONTACT.initials}
        </span>
        <div>
          <p className="text-lg font-extrabold tracking-tight text-white">{ECO_CONTACT.name}</p>
          <p className="text-sm text-ink-400">{contactRole}</p>
        </div>
      </div>
      <dl className="mt-6 divide-y divide-white/10 border-t border-white/10">
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-xs font-bold tracking-[0.15em] text-ink-400 uppercase">{common.phone}</dt>
          <dd>
            <a href={ECO_CONTACT.phoneHref} className="font-bold text-white transition-colors hover:text-frost-300">
              {ECO_CONTACT.phone}
            </a>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-xs font-bold tracking-[0.15em] text-ink-400 uppercase">{common.email}</dt>
          <dd>
            <a href={ECO_CONTACT.emailHref} className="font-bold break-all text-white transition-colors hover:text-frost-300">
              {ECO_CONTACT.email}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
