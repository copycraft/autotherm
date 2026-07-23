"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import ContactForm from "@/app/components/forms/ContactForm";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import type { Lang } from "@/app/lib/constants";
import {
  bodyTypes,
  brands,
  calculateTotal,
  coolingUnits,
  formatPrice,
  interiorOptions,
  variantsForBrand,
  type Selection,
} from "@/app/lib/configurator-data";
import type { Dict } from "@/app/lib/dictionaries";

/**
 * 5-step vehicle configurator - the Porsche-configurator treatment:
 * brand → model → body type → cooling unit → interior lining.
 *
 * - <AnimatePresence mode="wait"> cross-fades between steps
 * - Selections pop with the brand color and a thick focus ring
 * - The summary panel recalculates through Intl.NumberFormat on every click
 * - The final review step embeds the quotation form with the configuration
 *   payload injected - zero friction between "configured" and "requested"
 */

const SPRING = { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } as const;

const EMPTY: Selection = {
  brandId: null,
  variantId: null,
  bodyTypeId: null,
  coolingUnitId: null,
  interiorId: null,
};

function OptionCard({
  selected,
  onSelect,
  title,
  description,
  price,
  image,
  meta,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
  price?: string;
  image?: string;
  meta?: string[];
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white text-left transition-shadow duration-300 focus-visible:ring-4 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
        selected
          ? "shadow-glow ring-2 ring-brand-600"
          : "panel-ring shadow-soft hover:shadow-lifted"
      }`}
    >
      {image && (
        <div className="relative h-36 w-full overflow-hidden sm:h-44">
          <Image
            src={image}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {selected && (
            <div className="absolute inset-0 bg-brand-600/15" aria-hidden="true" />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-extrabold tracking-tight text-ink-900">{title}</h3>
          <span
            aria-hidden="true"
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
              selected ? "bg-brand-600 text-white" : "bg-ink-100 text-transparent"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>
        {description && (
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-600">{description}</p>
        )}
        {meta && meta.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {meta.map((m) => (
              <span key={m} className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-semibold text-ink-500 ring-1 ring-ink-100">
                {m}
              </span>
            ))}
          </div>
        )}
        {price && (
          <p className={`mt-3 text-sm font-black tabular-nums ${selected ? "text-brand-600" : "text-ink-900"}`}>
            {price}
          </p>
        )}
      </div>
    </motion.button>
  );
}

export default function Configurator({
  dict,
  lang,
  page,
}: {
  dict: Dict;
  lang: Lang;
  page: string;
}) {
  const c = dict.configurator;
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Selection>(EMPTY);

  const total = useMemo(() => calculateTotal(sel), [sel]);
  const fmt = (n: number) => formatPrice(n, lang);

  const brand = brands.find((b) => b.id === sel.brandId) ?? null;
  const variant = variantsForBrand(sel.brandId ?? "").find((v) => v.id === sel.variantId) ?? null;
  const body = bodyTypes.find((b) => b.id === sel.bodyTypeId) ?? null;
  const unit = coolingUnits.find((u) => u.id === sel.coolingUnitId) ?? null;
  const interior = interiorOptions.find((i) => i.id === sel.interiorId) ?? null;

  const stepDone = [
    sel.brandId !== null,
    sel.variantId !== null,
    sel.bodyTypeId !== null,
    sel.coolingUnitId !== null,
    sel.interiorId !== null,
  ];
  const review = step === 5;

  const configText = useMemo(() => {
    const lines: string[] = [];
    if (brand) lines.push(`${c.steps[0]}: ${brand.name}`);
    if (variant) lines.push(`${c.steps[1]}: ${variant.name} (${fmt(variant.basePrice)})`);
    if (body) lines.push(`${c.steps[2]}: ${body.name[lang]} (${fmt(body.price)})`);
    if (unit) lines.push(`${c.steps[3]}: ${unit.name} (${unit.price > 0 ? fmt(unit.price) : c.included})`);
    if (interior) lines.push(`${c.steps[4]}: ${interior.name[lang]} (${interior.price > 0 ? fmt(interior.price) : c.included})`);
    if (lines.length > 0) lines.push(`${c.total}: ${fmt(total)}`);
    return lines.join("\n");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, variant, body, unit, interior, total, lang]);

  function pick(patch: Partial<Selection>) {
    setSel((prev) => {
      const next = { ...prev, ...patch };
      // Changing brand invalidates the model choice.
      if (patch.brandId && patch.brandId !== prev.brandId) next.variantId = null;
      return next;
    });
  }

  const stepTitles = c.steps;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Step rail */}
      <nav aria-label={c.title} className="mb-12">
        <ol className="flex flex-wrap items-center gap-2">
          {stepTitles.map((title, i) => {
            const active = step === i;
            const reachable = i === 0 || stepDone.slice(0, i).every(Boolean);
            return (
              <li key={title} className="flex items-center gap-2">
                <motion.button
                  type="button"
                  disabled={!reachable}
                  onClick={() => setStep(i)}
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING}
                  aria-current={active ? "step" : undefined}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold tracking-tight transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
                    active
                      ? "bg-brand-600 text-white shadow-glow"
                      : stepDone[i]
                        ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                        : reachable
                          ? "bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50"
                          : "cursor-not-allowed bg-white text-ink-300 ring-1 ring-ink-100"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] tabular-nums ${
                      active ? "bg-white/20" : stepDone[i] ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-500"
                    }`}
                    aria-hidden="true"
                  >
                    {stepDone[i] && !active ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className="hidden sm:inline">{title}</span>
                </motion.button>
                {i < stepTitles.length - 1 && (
                  <span className="h-px w-4 bg-ink-200" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_22rem]">
        {/* Step canvas */}
        <div className="min-h-[28rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
            >
              {step === 0 && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                  {brands.map((b) => (
                    <OptionCard
                      key={b.id}
                      selected={sel.brandId === b.id}
                      onSelect={() => pick({ brandId: b.id })}
                      title={b.name}
                    />
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {variantsForBrand(sel.brandId ?? "").map((v) => (
                    <OptionCard
                      key={v.id}
                      selected={sel.variantId === v.id}
                      onSelect={() => pick({ variantId: v.id })}
                      title={v.name}
                      description={v.description[lang]}
                      price={fmt(v.basePrice)}
                      image={v.image}
                      meta={[
                        `${c.cargoVolume}: ${v.cargoM3} m³`,
                        `${c.payload}: ${v.payloadKg} kg`,
                      ]}
                    />
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {bodyTypes.map((b) => (
                    <OptionCard
                      key={b.id}
                      selected={sel.bodyTypeId === b.id}
                      onSelect={() => pick({ bodyTypeId: b.id })}
                      title={b.name[lang]}
                      description={b.description[lang]}
                      price={fmt(b.price)}
                      image={b.image}
                      meta={[`${c.tempRange}: ${b.tempRange}`]}
                    />
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {coolingUnits.map((u) => (
                    <OptionCard
                      key={u.id}
                      selected={sel.coolingUnitId === u.id}
                      onSelect={() => pick({ coolingUnitId: u.id })}
                      title={u.name}
                      description={u.description[lang]}
                      price={u.price > 0 ? fmt(u.price) : c.included}
                      meta={[`${c.tempRange}: ${u.tempRange}`]}
                    />
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {interiorOptions.map((i) => (
                    <OptionCard
                      key={i.id}
                      selected={sel.interiorId === i.id}
                      onSelect={() => pick({ interiorId: i.id })}
                      title={i.name[lang]}
                      description={i.description[lang]}
                      price={i.price > 0 ? fmt(i.price) : c.included}
                    />
                  ))}
                </div>
              )}

              {review && (
                <div className="panel-ring rounded-4xl bg-white p-8 shadow-soft sm:p-10">
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
                    {c.requestQuote}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.quoteHint}</p>
                  <div className="mt-8">
                    <ContactForm
                      dict={dict.form}
                      lang={lang}
                      page={page}
                      quotation
                      configuration={configText}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Step navigation */}
          {!review && (
            <div className="mt-10 flex items-center justify-between">
              <motion.button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                whileTap={{ scale: 0.96 }}
                transition={SPRING}
                className="rounded-full px-6 py-3 text-sm font-bold text-ink-600 ring-1 ring-ink-200 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {dict.common.back}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setStep((s) => Math.min(5, s + 1))}
                disabled={!stepDone[step]}
                whileTap={{ scale: 0.96 }}
                whileHover={stepDone[step] ? { y: -2 } : undefined}
                transition={SPRING}
                className="rounded-full bg-brand-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-brand-500 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {step === 4 ? c.requestQuote : dict.common.next}
              </motion.button>
            </div>
          )}
        </div>

        {/* Summary panel */}
        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label={c.summaryTitle}>
          <div className="panel-ring overflow-hidden rounded-4xl bg-white shadow-soft">
            <div className="mesh-hero relative p-6">
              <div className="grid-overlay absolute inset-0" aria-hidden="true" />
              <h2 className="relative text-lg font-extrabold tracking-tight text-white">
                {c.summaryTitle}
              </h2>
            </div>
            <div className="flex flex-col gap-3 p-6">
              {configText === "" ? (
                <p className="text-sm leading-relaxed text-ink-500">{c.emptySummary}</p>
              ) : (
                <>
                  {[
                    brand && { label: stepTitles[0], value: brand.name, price: null as string | null },
                    variant && { label: stepTitles[1], value: variant.name, price: fmt(variant.basePrice) },
                    body && { label: stepTitles[2], value: body.name[lang], price: fmt(body.price) },
                    unit && { label: stepTitles[3], value: unit.name, price: unit.price > 0 ? fmt(unit.price) : c.included },
                    interior && { label: stepTitles[4], value: interior.name[lang], price: interior.price > 0 ? fmt(interior.price) : c.included },
                  ]
                    .filter((row): row is { label: string; value: string; price: string | null } => Boolean(row))
                    .map((row) => (
                      <div key={row.label} className="flex items-start justify-between gap-4 border-b border-ink-100 pb-3 last:border-0">
                        <div>
                          <p className="text-[11px] font-bold tracking-wide text-ink-400 uppercase">{row.label}</p>
                          <p className="text-sm font-semibold text-ink-900">{row.value}</p>
                        </div>
                        {row.price && (
                          <p className="text-sm font-bold text-ink-700 tabular-nums">{row.price}</p>
                        )}
                      </div>
                    ))}
                  <div className="mt-2 rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-200">
                    <p className="text-[11px] font-bold tracking-wide text-brand-700 uppercase">{c.total}</p>
                    <motion.p
                      key={total}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE_CINEMATIC }}
                      className="mt-1 text-3xl font-black tracking-tighter text-brand-700 tabular-nums"
                    >
                      {fmt(total)}
                    </motion.p>
                    <p className="mt-2 text-[11px] leading-relaxed text-ink-500">{c.netNote}</p>
                  </div>
                  {stepDone.every(Boolean) && !review && (
                    <motion.button
                      type="button"
                      onClick={() => setStep(5)}
                      whileTap={{ scale: 0.96 }}
                      whileHover={{ y: -2 }}
                      transition={SPRING}
                      className="mt-1 w-full rounded-full bg-brand-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-brand-500 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {c.requestQuote}
                    </motion.button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSel(EMPTY);
                      setStep(0);
                    }}
                    className="mt-1 text-xs font-semibold text-ink-400 underline-offset-4 transition-colors hover:text-ink-600 hover:underline focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                  >
                    {c.restart}
                  </button>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
