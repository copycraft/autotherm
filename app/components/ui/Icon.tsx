import type { IconName } from "@/app/lib/page-content";

/**
 * Crisp 24px stroke icon set - server-renderable, zero JS.
 * All icons are decorative by default (aria-hidden).
 */
export default function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    snowflake: (
      <>
        <path d="M12 2v20M4 6l16 12M20 6L4 18" />
        <path d="M12 2l-2 3h4l-2-3zM12 22l-2-3h4l-2 3z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    wrench: (
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.9 2.9-2.1-2.1 2.9-2.9z" />
    ),
    truck: (
      <>
        <path d="M1 7h12v9H1zM13 10h5l3 3v3h-8z" />
        <circle cx="6" cy="18.5" r="1.8" />
        <circle cx="17" cy="18.5" r="1.8" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
    factory: (
      <>
        <path d="M2 20h20M4 20V10l5 3v-3l5 3v-3l6 3.5V20" />
        <path d="M17 7l1-4h2l1 4" />
      </>
    ),
    medal: (
      <>
        <circle cx="12" cy="14" r="5" />
        <path d="M12 12.2l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3.9-1.8zM8 3l2.5 5M16 3l-2.5 5" />
      </>
    ),
    layers: (
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </>
    ),
    thermometer: (
      <>
        <path d="M10 4a2 2 0 1 1 4 0v9.3a4.5 4.5 0 1 1-4 0V4z" />
        <path d="M12 9v7" />
      </>
    ),
    heart: (
      <path d="M12 20.5s-7.5-4.7-9.5-9A5.3 5.3 0 0 1 12 6.4a5.3 5.3 0 0 1 9.5 5.1c-2 4.3-9.5 9-9.5 9z" />
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.5 2.5L16 9.5" />
      </>
    ),
    spark: (
      <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2z" />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
