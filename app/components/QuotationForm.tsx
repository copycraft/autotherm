'use client';
import { useState } from "react";

const temps = [
  { value: "-20C", label: "–20 °C" },
  { value: "-10C", label: "–10 °C" },
  { value: "-5C", label: "–5 °C" },
  { value: "0+5C", label: "0 °C – +5 °C" },
  { value: "+5+10C", label: "+5 °C – +10 °C" },
  { value: "+15+25C", label: "+15 °C – +25 °C" },
  { value: "other", label: "Egyéb hőmérséklet" },
];

export default function QuotationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [requirements, setRequirements] = useState("");
  const [product, setProduct] = useState("");
  const [temperature, setTemperature] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${lastName} ${firstName}`,
          email,
          phone,
          message: [
            `Miknek kell megfelelnie: ${requirements}`,
            `Szállítandó termék: ${product}`,
            `Hőmérséklet: ${temperature}`,
            `Projekt leírása: ${projectDesc}`,
            `Cégnév: ${company}`,
          ].join('\n'),
          page: '/hu/arajanlatkeres',
          lang: 'hu',
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
    } catch { /* ignore */ }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#4a68a9] mb-4">Köszönjük ajánlatkérését!</h2>
        <p className="text-[#666] max-w-md mx-auto">Munkatársunk 12 órán belül felveszi Önnel a kapcsolatot a megadott elérhetőségek egyikén.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1 */}
      <div>
        <label className="block text-sm font-bold text-[#555] mb-2">Miknek kell megfelelnie az autónak?</label>
        <textarea
          rows={3}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]"
          placeholder="Pl. HACCP, ATEX, gyógyszeripari előírások..."
          required
        />
      </div>

      {/* Section 2 */}
      <div>
        <label className="block text-sm font-bold text-[#555] mb-2">Mi a termék, amit az ügyfél szállítani szeretne?</label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]"
          placeholder="Pl. fagylalt, gyógyszer, húsáru..."
          required
        />
      </div>

      {/* Section 3 */}
      <div>
        <label className="block text-sm font-bold text-[#555] mb-3">Milyen hőmérsékleten szeretne szállítani?</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {temps.map((t) => (
            <label
              key={t.value}
              className={`flex items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                temperature === t.value
                  ? 'border-[#4a68a9] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="temperature"
                value={t.value}
                checked={temperature === t.value}
                onChange={(e) => setTemperature(e.target.value)}
                className="accent-[#4a68a9]"
                required
              />
              <span className="text-sm font-semibold text-[#262626]">{t.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 4 */}
      <div>
        <label className="block text-sm font-bold text-[#555] mb-2">Projekt leírása</label>
        <textarea
          rows={4}
          value={projectDesc}
          onChange={(e) => setProjectDesc(e.target.value)}
          className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]"
          placeholder="Részletes projektleírás, egyedi igények..."
        />
      </div>

      {/* Section 5: Adatok */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-[#262626] mb-4">Adatok</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-[#555] mb-1">Vezetéknév</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]"
              placeholder="Vezetéknév"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#555] mb-1">Keresztnév</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]"
              placeholder="Keresztnév"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#555] mb-1">Telefon</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]"
              placeholder="+36 20 123 4567"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#555] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]"
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-[#555] mb-1">Cégnév</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]"
              placeholder="Cégnév"
            />
          </div>
        </div>
      </div>

      {/* Section 6: GDPR */}
      <div className="border-t border-gray-200 pt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-[#4a68a9]"
            required
          />
          <span className="text-sm text-[#555] leading-relaxed">
            Hozzájárulok, hogy a(z) Autotherm Kft. CRM rendszerében kezelje az adataimat.
          </span>
        </label>
      </div>

      <button type="submit" className="button w-full text-center py-3.5 text-white">
        Ajánlatkérés
      </button>
    </form>
  );
}
