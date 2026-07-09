'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Props {
  lang: string;
  navEntries: [string, string][];
  homeLabel: string;
}

export default function ClientHeader({ lang, navEntries, homeLabel }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`main-header sticky top-0 z-50 ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center shrink-0" onClick={closeMenu}>
            <img src="/images/autotherm-logo.png" alt="Autotherm" className="h-10 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            {navEntries.map(([href, label]) => (
              <Link key={href} href={href} className="nav-link px-3 xl:px-4 py-2 text-xs xl:text-sm font-semibold uppercase tracking-wider text-[#555] hover:text-[#4a68a9] transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />

      {/* Mobile menu panel */}
      <div className={`mobile-menu-panel ${menuOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="flex items-center">
            <img src="/images/autotherm-logo.png" alt="Autotherm" className="h-7 w-auto" />
          </span>
          <button
            onClick={closeMenu}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col py-2">
          {navEntries.map(([href, label], i) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-700 hover:text-[#4a68a9] hover:bg-gray-50 border-b border-gray-50 transition-colors"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
