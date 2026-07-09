// === BRANDS ===
export interface Brand {
  id: string;
  name: string;
  logo?: string;
}

export const brands: Brand[] = [
  { id: 'fiat', name: 'Fiat' },
  { id: 'mercedes', name: 'Mercedes' },
  { id: 'ford', name: 'Ford' },
  { id: 'renault', name: 'Renault' },
  { id: 'vw', name: 'Volkswagen' },
  { id: 'iveco', name: 'Iveco' },
];

// === VARIANTS (type within brand) ===
export interface Variant {
  id: string;
  brandId: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
}

export const variants: Variant[] = [
  // Fiat
  { id: 'fiat-ducato-l2h2', brandId: 'fiat', name: 'Ducato L2H2', description: 'Közepes méretű furgon, 2.5t hasznos teher', image: '/images/a404687637b3.jpg', basePrice: 11500000 },
  { id: 'fiat-ducato-l3h2', brandId: 'fiat', name: 'Ducato L3H2', description: 'Hosszított furgon, 2.8t hasznos teher', image: '/images/ae97125a0c4f.jpg', basePrice: 12200000 },
  { id: 'fiat-ducato-l4h3', brandId: 'fiat', name: 'Ducato L4H3', description: 'Maxi furgon, magas tető, 3.0t hasznos teher', image: '/images/4c7a44122714.jpg', basePrice: 13200000 },
  // Mercedes
  { id: 'merc-sprinter-l2h2', brandId: 'mercedes', name: 'Sprinter L2H2', description: 'Közepes furgon, 2.8t hasznos teher', image: '/images/785d3105c7c6.jpg', basePrice: 14000000 },
  { id: 'merc-sprinter-l3h2', brandId: 'mercedes', name: 'Sprinter L3H2', description: 'Hosszított furgon, 3.0t hasznos teher', image: '/images/0e90d9793302.jpg', basePrice: 15000000 },
  // Ford
  { id: 'ford-transit-l2h2', brandId: 'ford', name: 'Transit L2H2', description: 'Közepes furgon, 2.4t hasznos teher', image: '/images/3cc963ec4181.jpg', basePrice: 11000000 },
  { id: 'ford-transit-l3h2', brandId: 'ford', name: 'Transit L3H2', description: 'Hosszított furgon, 2.7t hasznos teher', image: '/images/6be9f7162b3b.jpg', basePrice: 11800000 },
  // Renault
  { id: 'renault-master-l2h2', brandId: 'renault', name: 'Master L2H2', description: 'Közepes furgon, 2.5t hasznos teher', image: '/images/103f979650e6.jpg', basePrice: 10500000 },
  { id: 'renault-master-l3h2', brandId: 'renault', name: 'Master L3H2', description: 'Hosszított furgon, 2.8t hasznos teher', image: '/images/b05d04ca1183.jpg', basePrice: 11200000 },
  // VW
  { id: 'vw-crafter-l2h2', brandId: 'vw', name: 'Crafter L2H2', description: 'Közepes furgon, 2.6t hasznos teher', image: '/images/a68af7b4ba26.jpg', basePrice: 13500000 },
  { id: 'vw-crafter-l3h2', brandId: 'vw', name: 'Crafter L3H2', description: 'Hosszított furgon, 2.9t hasznos teher', image: '/images/e4566315cd28.jpg', basePrice: 14300000 },
  // Iveco
  { id: 'iveco-daily-35s', brandId: 'iveco', name: 'Daily 35S', description: 'Közepes teherautó, 3.0t hasznos teher', image: '/images/32b4cd177558.jpg', basePrice: 12500000 },
  { id: 'iveco-daily-50c', brandId: 'iveco', name: 'Daily 50C', description: 'Nehéz teherautó, 4.0t hasznos teher', image: '/images/310373572c3b.jpg', basePrice: 14500000 },
  { id: 'iveco-daily-cng', brandId: 'iveco', name: 'Daily CNG', description: 'Környezetbarát CNG hajtás, 2.8t hasznos teher', image: '/images/32b4cd177558.jpg', basePrice: 16000000 },
];

// === BODY TYPES ===
export interface BodyType {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export const bodyTypes: BodyType[] = [
  { id: 'refrigerated-van', name: 'Hűtős furgon', description: 'Raktérszigetelés + hűtőberendezés. Ideális élelmiszer, gyógyszer és egyéb hőmérséklet-érzékeny áruk szállítására.', image: '/images/05b85e04c8d3.jpg', price: 2800000 },
  { id: 'insulated-box', name: 'Szigetelt doboz', description: 'Hőszigetelt doboz felépítmény alvázas járművekre. Alumínium/rozsdamentes belső burkolattal.', image: '/images/688500d4a01a.jpg', price: 3500000 },
  { id: 'chassis-body', name: 'Alvázas felépítmény', description: '3,5 tonnás alvázra épített platós-ponyvás vagy dobozos felépítmény.', image: '/images/b2c54816a378.jpg', price: 2200000 },
  { id: 'deceased-transport', name: 'Halottszállító', description: 'Speciális kialakítású halottszállító jármű. Diszkrét, méltóságteljes megjelenés.', image: '/images/e7f13b6c4bc5.jpg', price: 3800000 },
];

// === COOLING UNITS ===
export interface CoolingUnit {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: number;
}

export const coolingUnits: CoolingUnit[] = [
  { id: 'carrier-xarios', name: 'Carrier Xarios 300', description: 'Kompakt, megbízható raktérhűtő egység kisebb furgonokhoz. -20°C-ig.', price: 1800000 },
  { id: 'carrier-supra-750', name: 'Carrier Supra 750', description: 'Nagy teljesítményű hűtőegység alvázas járművekhez. -25°C-ig.', price: 2800000 },
  { id: 'carrier-supra-1250', name: 'Carrier Supra 1250', description: 'Csúcskategóriás hűtőegység nehéz feladatokhoz. -30°C-ig.', price: 3500000 },
  { id: 'daikin-lke', name: 'Daikin LKE Eco', description: 'Kompakt, energiatakarékos hűtőegység kisebb furgonokhoz. -20°C-ig.', price: 2200000 },
  { id: 'daikin-frv', name: 'Daikin FRV Pro', description: 'Nagy teljesítményű Daikin hűtőegység alvázas járművekhez. -25°C-ig.', price: 3100000 },
];

// === INTERIOR OPTIONS ===
export interface InteriorOption {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: number;
}

export const interiorOptions: InteriorOption[] = [
  { id: 'stainless', name: 'Rozsdamentes acél', description: 'Saválló, tartós, könnyen tisztítható. Élelmiszeripari előírásoknak megfelel.', price: 450000 },
  { id: 'grp', name: 'Üvegszálas (GRP)', description: 'Könnyű, korrózióálló, hőszigetelő műanyag belső burkolat.', price: 300000 },
  { id: 'aluminum', name: 'Alumínium', description: 'Könnyű, strapabíró alumínium belső borítás.', price: 250000 },
  { id: 'plywood', name: 'Rétegelt lemez', description: 'Gazdaságos megoldás, PVC bevonattal.', price: 150000 },
];

// === LANGUAGE ===
export interface ConfiguratorLang {
  title: string;
  subtitle: string;
  brandLabel: string;
  variantLabel: string;
  bodyLabel: string;
  coolingLabel: string;
  interiorLabel: string;
  summaryTitle: string;
  totalLabel: string;
  requestQuote: string;
  quoteSuccess: string;
  noCooling: string;
  nextBtn: string;
  backBtn: string;
  startOver: string;
  recommended: string;
}

export const huLang: ConfiguratorLang = {
  title: 'Járműkonfigurátor',
  subtitle: 'Állítsa össze saját hűtőautóját',
  brandLabel: '1. Márka',
  variantLabel: '2. Típus',
  bodyLabel: '3. Felépítmény',
  coolingLabel: '4. Hűtőberendezés',
  interiorLabel: '5. Belső burkolat',
  summaryTitle: 'Összegzés',
  totalLabel: 'Teljes ár (nettó)',
  requestQuote: 'Ajánlatkérés',
  quoteSuccess: 'Köszönjük! Munkatársunk hamarosan jelentkezik a konfiguráció alapján készített árajánlattal.',
  noCooling: 'Hűtőberendezés nélkül',
  nextBtn: 'Tovább',
  backBtn: 'Vissza',
  startOver: 'Újrakezdés',
  recommended: 'Ajánlott',
};

// === HELPERS ===
export function variantsForBrand(brandId: string): Variant[] {
  return variants.filter(v => v.brandId === brandId);
}

export function formatPrice(n: number): string {
  return n.toLocaleString('hu-HU') + ' Ft';
}
