export default function Eyebrow({
  label,
  tone = "dark",
}: {
  label: string;
  /** `dark` sits on photography / ink surfaces, `light` on white and ink-50. */
  tone?: "dark" | "light";
}) {
  if (!label) return null;
  return (
    <div className="inline-flex items-center gap-3">
      <span
        className={`h-px w-8 ${tone === "dark" ? "bg-frost-300/70" : "bg-brand-500"}`}
        aria-hidden="true"
      />
      <p
        className={`text-[11px] font-bold tracking-[0.28em] uppercase ${
          tone === "dark" ? "text-frost-200" : "text-brand-600"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
