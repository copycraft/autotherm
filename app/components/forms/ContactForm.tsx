"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import {
  initialContactState,
  submitContact,
} from "@/app/actions/contact";
import type { Dict } from "@/app/lib/dictionaries";

/**
 * Contact / quotation form.
 * - React 19 useActionState + useFormStatus (progressive enhancement:
 *   works with JavaScript disabled)
 * - Optional quotation fields (vehicle + temperature range)
 * - Optional hidden configurator payload
 */

const inputCls =
  "w-full rounded-2xl border-0 bg-white px-5 py-4 text-sm text-ink-900 shadow-soft ring-1 ring-ink-200 transition-shadow placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500 focus-visible:outline-none";

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-sm font-bold tracking-tight text-white transition-all hover:bg-brand-500 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
    >
      {pending && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
      )}
      {pending ? pendingLabel : label}
    </motion.button>
  );
}

export default function ContactForm({
  dict,
  lang,
  page,
  quotation = false,
  configuration,
}: {
  dict: Dict["form"];
  lang: string;
  page: string;
  quotation?: boolean;
  configuration?: string;
}) {
  const [state, formAction] = useActionState(submitContact, initialContactState);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
        className="rounded-3xl bg-white p-10 text-center shadow-soft ring-1 ring-black/5"
        role="status"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.15 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-ink-900">
          {dict.success}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{dict.successDetail}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate={false}>
      <input type="hidden" name="page" value={page} />
      <input type="hidden" name="lang" value={lang} />
      {configuration && (
        <input type="hidden" name="configuration" value={configuration} />
      )}
      {/* Honeypot */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label>
          company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-2 block text-xs font-bold tracking-wide text-ink-700 uppercase">
            {dict.name} <span className="text-brand-600" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={state.invalid?.includes("name") || undefined}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-2 block text-xs font-bold tracking-wide text-ink-700 uppercase">
            {dict.email} <span className="text-brand-600" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={state.invalid?.includes("email") || undefined}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-phone" className="mb-2 block text-xs font-bold tracking-wide text-ink-700 uppercase">
          {dict.phone}
        </label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
      </div>

      {quotation && (
        <>
          <div>
            <label htmlFor="cf-vehicle" className="mb-2 block text-xs font-bold tracking-wide text-ink-700 uppercase">
              {dict.vehicle}
            </label>
            <input
              id="cf-vehicle"
              name="vehicle"
              type="text"
              placeholder={dict.vehiclePlaceholder}
              className={inputCls}
            />
          </div>
          <fieldset>
            <legend className="mb-3 block text-xs font-bold tracking-wide text-ink-700 uppercase">
              {dict.tempRange}
            </legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {dict.tempOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-ink-700 shadow-soft ring-1 ring-ink-200 transition-all has-checked:bg-brand-50 has-checked:text-brand-800 has-checked:ring-2 has-checked:ring-brand-500"
                >
                  <input
                    type="radio"
                    name="tempRange"
                    value={opt.label}
                    className="h-4 w-4 accent-brand-600"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        </>
      )}

      <div>
        <label htmlFor="cf-message" className="mb-2 block text-xs font-bold tracking-wide text-ink-700 uppercase">
          {dict.message} {!configuration && <span className="text-brand-600" aria-hidden="true">*</span>}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required={!configuration}
          placeholder={dict.messagePlaceholder}
          aria-invalid={state.invalid?.includes("message") || undefined}
          className={`${inputCls} resize-y`}
        />
      </div>

      <AnimatePresence>
        {state.status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-700 ring-1 ring-red-200"
          >
            {dict.error}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label={dict.submit} pendingLabel={dict.sending} />
        <p className="text-xs leading-relaxed text-ink-400">
          {dict.requiredNote} {dict.privacyNote}
        </p>
      </div>
    </form>
  );
}
