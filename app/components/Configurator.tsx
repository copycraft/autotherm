'use client';
import { useState } from 'react';
import { brands, variants, bodyTypes, coolingUnits, interiorOptions, variantsForBrand, type Brand, type Variant, type BodyType, type CoolingUnit, type InteriorOption, type ConfiguratorLang } from '@/app/lib/configurator-data';

interface Props { lang: ConfiguratorLang; }

function StepIcon({ num, active }: { num: number; active: boolean }) {
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${active ? 'bg-[#4a68a9] text-white scale-100' : 'bg-gray-200 text-gray-500 scale-90'}`}>
      {num}
    </div>
  );
}

export default function Configurator({ lang }: Props) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [body, setBody] = useState<BodyType | null>(null);
  const [cooling, setCooling] = useState<CoolingUnit | null>(null);
  const [interior, setInterior] = useState<InteriorOption | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);

  const previewImage = variant?.image || body?.image || '/images/05b85e04c8d3.jpg';

  const allSet = brand && variant && body;

  async function handleSubmit() {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Konfigurátor',
          email: 'configurator@autotherm.hu',
          message: [
            `Márka: ${brand?.name}`,
            `Típus: ${variant?.name}`,
            `Felépítmény: ${body?.name}`,
            `Hűtés: ${cooling?.name || 'Nincs'}`,
            `Belső: ${interior?.name || 'Nincs'}`,
          ].join('\n'),
          page: '/hu/konfigurator',
          lang: 'hu',
        }),
      });
      if ((await res.json()).success) setSubmitted(true);
    } catch { /* ignore */ }
  }

  function reset() {
    setBrand(null); setVariant(null); setBody(null); setCooling(null); setInterior(null);
    setStep(0); setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-lg animate-scaleIn">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#262626] mb-4">{lang.quoteSuccess}</h2>
          <button onClick={reset} className="text-sm text-[#4a68a9] font-semibold hover:underline">{lang.startOver}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* LEFT: Preview image */}
      <div className="relative lg:flex-1 lg:min-h-screen bg-gray-900 overflow-hidden lg:sticky lg:top-0">
        <img
          src={previewImage}
          alt="Preview"
          className="w-full h-[40vh] lg:h-full lg:absolute lg:inset-0 object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/40 lg:via-transparent lg:to-transparent" />
        <div className="absolute bottom-6 left-6 text-white lg:top-6 lg:bottom-auto">
          <h1 className="text-2xl lg:text-3xl font-extrabold">{lang.title}</h1>
          <p className="text-sm text-white/70 mt-1">{lang.subtitle}</p>
        </div>
      </div>

      {/* RIGHT: Config panel */}
      <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0 border-l border-gray-200 bg-white overflow-y-auto lg:max-h-screen">
        <div className="p-6 lg:p-8 pb-24 lg:pb-8 relative">
          {/* Step 1: Brand */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <StepIcon num={1} active={step >= 0} />
              <span className={`text-sm font-bold transition-colors duration-300 ${step >= 0 ? 'text-[#262626]' : 'text-gray-400'}`}>{lang.brandLabel}</span>
            </div>
            <div className={`transition-all duration-300 ease-out ${step === 0 ? 'opacity-100' : 'opacity-30'}`}>
              <div className="grid grid-cols-3 gap-2">
                {brands.map(b => (
                  <button
                    key={b.id}
                    onClick={() => { setBrand(b); setVariant(null); setStep(1); }}
                    className={`py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      brand?.id === b.id ? 'border-[#4a68a9] bg-blue-50 text-[#4a68a9]' : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Variant */}
          {brand && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <StepIcon num={2} active={step >= 1} />
                <span className={`text-sm font-bold transition-colors duration-300 ${step >= 1 ? 'text-[#262626]' : 'text-gray-400'}`}>{lang.variantLabel}</span>
              </div>
              <div className={`transition-all duration-300 ease-out ${step === 1 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="space-y-2">
                  {variantsForBrand(brand.id).map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => { setVariant(v); setStep(2); }}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        variant?.id === v.id ? 'border-[#4a68a9] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-[#262626]">{v.name}</div>
                          <div className="text-xs text-gray-500 truncate">{v.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Body type */}
          {variant && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <StepIcon num={3} active={step >= 2} />
                <span className={`text-sm font-bold transition-colors duration-300 ${step >= 2 ? 'text-[#262626]' : 'text-gray-400'}`}>{lang.bodyLabel}</span>
              </div>
              <div className={`transition-all duration-300 ease-out ${step === 2 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="space-y-2">
                  {bodyTypes.map((b, i) => (
                    <button
                      key={b.id}
                      onClick={() => { setBody(b); setStep(3); }}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        body?.id === b.id ? 'border-[#4a68a9] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img src={b.image} alt={b.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-[#262626]">{b.name}</div>
                          <div className="text-xs text-gray-500 line-clamp-2">{b.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Cooling */}
          {body && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <StepIcon num={4} active={step >= 3} />
                <span className={`text-sm font-bold transition-colors duration-300 ${step >= 3 ? 'text-[#262626]' : 'text-gray-400'}`}>{lang.coolingLabel}</span>
              </div>
              <div className={`transition-all duration-300 ease-out ${step === 3 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="space-y-2">
                  <button
                    onClick={() => { setCooling(null); setStep(4); }}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      cooling === null ? 'border-[#4a68a9] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#262626]">{lang.noCooling}</div>
                    <div className="text-xs text-gray-500">Csak raktérszigetelés, hűtőgép nélkül</div>
                  </button>
                  {coolingUnits.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => { setCooling(c); setStep(4); }}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        cooling?.id === c.id ? 'border-[#4a68a9] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm text-[#262626] flex items-center gap-2">
                            {c.name}
                            {c.id === 'carrier-xarios' && <span className="text-[10px] font-bold text-white bg-[#4a68a9] px-2 py-0.5 rounded">{lang.recommended}</span>}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">{c.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Interior */}
          {body && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <StepIcon num={5} active={step >= 4} />
                <span className={`text-sm font-bold transition-colors duration-300 ${step >= 4 ? 'text-[#262626]' : 'text-gray-400'}`}>{lang.interiorLabel}</span>
              </div>
              <div className={`transition-all duration-300 ease-out ${step === 4 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="space-y-2">
                  {interiorOptions.map((i, idx) => (
                    <button
                      key={i.id}
                      onClick={() => { setInterior(i); setStep(5); }}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        interior?.id === i.id ? 'border-[#4a68a9] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm text-[#262626]">{i.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{i.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          {step === 5 && allSet && (
            <div className="mt-8 p-5 bg-gray-50 rounded-2xl border border-gray-200 animate-fadeInUp">
              <h3 className="font-bold text-[#262626] mb-4">{lang.summaryTitle}</h3>
              <div className="space-y-2 text-sm mb-5">
                <SummaryRow label="Márka" value={brand.name} />
                <SummaryRow label="Típus" value={variant.name} />
                <SummaryRow label="Felépítmény" value={body.name} />
                <SummaryRow label="Hűtés" value={cooling ? cooling.name : lang.noCooling} />
                <SummaryRow label="Belső" value={interior?.name ?? '—'} />
              </div>
              <button onClick={handleSubmit} className="button w-full mt-2 text-center py-3.5 text-white">{lang.requestQuote}</button>
              <button onClick={reset} className="block mx-auto mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors">{lang.startOver}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}:</span>{' '}
      <span className="font-semibold text-[#262626]">{value}</span>
    </div>
  );
}
