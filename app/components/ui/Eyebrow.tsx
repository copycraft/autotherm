export default function Eyebrow({ label }: { label: string }) {
  if (!label) return null;
  return (
    <div className="inline-flex items-center gap-3">
      <span className="h-px w-8 bg-frost-300/70" aria-hidden="true" />
      <p className="text-[11px] font-bold tracking-[0.28em] text-frost-200 uppercase">
        {label}
      </p>
    </div>
  );
}
