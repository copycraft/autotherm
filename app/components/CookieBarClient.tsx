'use client';
import { useSyncExternalStore } from 'react';

function getCookieAccepted() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('at-cookie-accepted') === '1';
}

function subscribeToCookie(cb: () => void) {
  window.addEventListener('storage', cb);
  return () => window.removeEventListener('storage', cb);
}

export default function CookieBarClient({ lang }: { lang: string }) {
  const accepted = useSyncExternalStore(subscribeToCookie, getCookieAccepted, () => false);

  if (accepted) return null;

  const accept = () => {
    localStorage.setItem('at-cookie-accepted', '1');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="cookie-bar animate-fadeInUp" style={{ animationDuration: '0.5s' }}>
      <span>
        {lang === "hu" && "Kedves Látogató! Tájékoztatjuk, hogy a honlap felhasználói élmény fokozásának érdekében sütiket alkalmazunk. A honlapunk használatával ön a tájékoztatásunkat tudomásul veszi."}
        {lang === "en" && "Dear Visitor! We use cookies to enhance your experience. By using our website you agree to our use of cookies."}
        {lang === "de" && "Sehr geehrter Besucher! Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Mit der Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu."}
        {lang === "ro" && "Stimate vizitator! Folosim cookie-uri pentru a vă îmbunătăți experiența. Prin utilizarea site-ului nostru, sunteți de acord cu utilizarea cookie-urilor."}
      </span>
      <button onClick={accept}>{lang === "hu" ? "Elfogadom" : lang === "de" ? "Akzeptieren" : "Accept"}</button>
    </div>
  );
}
