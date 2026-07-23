import Link from "next/link";

/**
 * Global 404 - rendered outside the [lang] segment, so it offers all four
 * language homepages instead of guessing.
 */
export default function NotFound() {
  const langs = [
    { href: "/hu", label: "Magyar", text: "Az oldal nem található" },
    { href: "/en", label: "English", text: "Page not found" },
    { href: "/de", label: "Deutsch", text: "Seite nicht gefunden" },
    { href: "/ro", label: "Română", text: "Pagina nu a fost găsită" },
  ];
  return (
    <main className="mesh-hero relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <p className="text-frost-gradient text-8xl font-black tracking-tighter sm:text-9xl">
        404
      </p>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
        {langs[0].text}
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-300">
        Page not found · Seite nicht gefunden · Pagina nu a fost găsită
      </p>
      <nav
        aria-label="Language selection"
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        {langs.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="glass-dark rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
