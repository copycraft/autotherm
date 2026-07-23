import type { Lang } from "./constants";

/**
 * Vehicle configurator catalog - the 5-step funnel data:
 * 1. brand → 2. model/variant → 3. body type → 4. cooling unit → 5. interior lining
 *
 * Names are technical (shared across languages); descriptions are fully
 * localized. Prices are net HUF; display formatting goes through
 * `formatPrice()` (Intl.NumberFormat, localized per language).
 */

export type Localized = Record<Lang, string>;

export interface Brand {
  id: string;
  name: string;
}

export interface Variant {
  id: string;
  brandId: string;
  name: string;
  description: Localized;
  image: string;
  basePrice: number;
  cargoM3: number;
  payloadKg: number;
}

export interface BodyType {
  id: string;
  name: Localized;
  description: Localized;
  image: string;
  price: number;
  tempRange: string;
}

export interface CoolingUnit {
  id: string;
  name: string;
  description: Localized;
  price: number;
  tempRange: string;
}

export interface InteriorOption {
  id: string;
  name: Localized;
  description: Localized;
  price: number;
}

/* ---------------------------------- Brands ---------------------------------- */

export const brands: Brand[] = [
  { id: "fiat", name: "Fiat Ducato" },
  { id: "mercedes", name: "Mercedes-Benz Sprinter" },
  { id: "ford", name: "Ford Transit" },
  { id: "renault", name: "Renault Master" },
  { id: "vw", name: "Volkswagen Crafter" },
  { id: "iveco", name: "Iveco Daily" },
];

/* --------------------------------- Variants --------------------------------- */

export const variants: Variant[] = [
  {
    id: "fiat-ducato-l2h2",
    brandId: "fiat",
    name: "Ducato L2H2",
    description: {
      hu: "Közepes tengelytáv, emelt tető – városi hűtött terítésre optimalizálva.",
      en: "Medium wheelbase, high roof - built for urban chilled delivery.",
      de: "Mittlerer Radstand, Hochdach – optimiert für gekühlte Stadtlogistik.",
      ro: "Ampatament mediu, plafon înalt - optimizat pentru livrări urbane refrigerate.",
    },
    image: "/images/a404687637b3.jpg",
    basePrice: 11500000,
    cargoM3: 10,
    payloadKg: 1400,
  },
  {
    id: "fiat-ducato-l3h2",
    brandId: "fiat",
    name: "Ducato L3H2",
    description: {
      hu: "Hosszú tengelytáv, nagy raktér – maximális rakodási kapacitás 3,5 t alatt.",
      en: "Long wheelbase, large cargo area - maximum capacity under 3.5 t.",
      de: "Langer Radstand, großer Laderaum – maximale Kapazität unter 3,5 t.",
      ro: "Ampatament lung, spațiu mare de marfă - capacitate maximă sub 3,5 t.",
    },
    image: "/images/05b85e04c8d3.jpg",
    basePrice: 12300000,
    cargoM3: 13,
    payloadKg: 1350,
  },
  {
    id: "mb-sprinter-l2h2",
    brandId: "mercedes",
    name: "Sprinter 317 L2H2",
    description: {
      hu: "Megbízható, jó vezethetőségű, erős másodpiaci értékkel.",
      en: "Reliable, good drivability, strong resale value.",
      de: "Zuverlässig, gutes Fahrverhalten, hoher Wiederverkaufswert.",
      ro: "Fiabil, cu manevrabilitate bună, valoare mare la revânzare.",
    },
    image: "/images/0e90d9793302.jpg",
    basePrice: 14800000,
    cargoM3: 9.5,
    payloadKg: 1250,
  },
  {
    id: "mb-sprinter-l3h2",
    brandId: "mercedes",
    name: "Sprinter 319 L3H2",
    description: {
      hu: "V6-os erőforrás, hosszú raktér – nagy volumenű hűtött szállításhoz.",
      en: "V6 powertrain, long cargo bay - for high-volume chilled transport.",
      de: "V6-Antrieb, langer Laderaum – für großvolumige Kühltransporte.",
      ro: "Motorizare V6, compartiment lung - pentru transport refrigerat de volum mare.",
    },
    image: "/images/15f4103a8265.jpg",
    basePrice: 16200000,
    cargoM3: 12.5,
    payloadKg: 1200,
  },
  {
    id: "ford-transit-l2h2",
    brandId: "ford",
    name: "Transit 350 L2H2",
    description: {
      hu: "Kedvező fenntartás, országos szervizhálózat, bevált flottamegoldás.",
      en: "Low running costs, nationwide service network, proven fleet choice.",
      de: "Niedrige Betriebskosten, landesweites Servicenetz, bewährte Flottenwahl.",
      ro: "Costuri reduse de exploatare, rețea națională de service, alegere de flotă dovedită.",
    },
    image: "/images/2948dab7dd9a.jpg",
    basePrice: 11900000,
    cargoM3: 10.2,
    payloadKg: 1300,
  },
  {
    id: "ford-transit-l3h3",
    brandId: "ford",
    name: "Transit 350 L3H3",
    description: {
      hu: "Extra belmagasság raklapos árukhoz és görgős konténerekhez.",
      en: "Extra interior height for palletised goods and roll containers.",
      de: "Extra Innenhöhe für palettierte Ware und Rollcontainer.",
      ro: "Înălțime interioară suplimentară pentru mărfuri paletizate și containere mobile.",
    },
    image: "/images/300aebed8e8e.jpg",
    basePrice: 12800000,
    cargoM3: 13.9,
    payloadKg: 1250,
  },
  {
    id: "renault-master-l2h2",
    brandId: "renault",
    name: "Master L2H2",
    description: {
      hu: "Kiváló ár-érték arány, takarékos motorok, komfortos vezetőfülke.",
      en: "Excellent value, economical engines, comfortable cab.",
      de: "Hervorragendes Preis-Leistungs-Verhältnis, sparsame Motoren, komfortables Fahrerhaus.",
      ro: "Raport excelent calitate-preț, motoare economice, cabină confortabilă.",
    },
    image: "/images/310373572c3b.jpg",
    basePrice: 11200000,
    cargoM3: 10.8,
    payloadKg: 1350,
  },
  {
    id: "renault-master-l3h2",
    brandId: "renault",
    name: "Master L3H2",
    description: {
      hu: "Hosszított kivitel nagy volumenű, több leadási pontos terítéshez.",
      en: "Extended version for high-volume, multi-drop distribution.",
      de: "Verlängerte Version für großvolumige Verteilerverkehre mit vielen Stopps.",
      ro: "Versiune extinsă pentru distribuție de volum mare cu opriri multiple.",
    },
    image: "/images/32b4cd177558.jpg",
    basePrice: 11950000,
    cargoM3: 12.4,
    payloadKg: 1300,
  },
  {
    id: "vw-crafter-l3h3",
    brandId: "vw",
    name: "Crafter L3H3",
    description: {
      hu: "Precíz német mérnöki munka, vezetéstámogató rendszerek széles tárháza.",
      en: "Precise German engineering with a full suite of driver assistance.",
      de: "Präzise deutsche Ingenieurskunst mit umfassenden Assistenzsystemen.",
      ro: "Inginerie germană precisă, cu o gamă completă de sisteme de asistență.",
    },
    image: "/images/3cc963ec4181.jpg",
    basePrice: 14100000,
    cargoM3: 14.4,
    payloadKg: 1250,
  },
  {
    id: "vw-crafter-l4h3",
    brandId: "vw",
    name: "Crafter L4H3",
    description: {
      hu: "Kifejezetten nagy zárt raktér – ipari léptékű terítéshez.",
      en: "Extra-large enclosed cargo bay - for industrial-scale delivery.",
      de: "Extra großer geschlossener Laderaum – für Verteilung im Industriemaßstab.",
      ro: "Compartiment închis extra-mare - pentru livrare la scară industrială.",
    },
    image: "/images/45196215f76f.jpg",
    basePrice: 15400000,
    cargoM3: 16.4,
    payloadKg: 1150,
  },
  {
    id: "iveco-daily-35s16",
    brandId: "iveco",
    name: "Daily 35S16 furgon",
    description: {
      hu: "Teherautó-alapú robusztusság, kimagasló terhelhetőség furgon karosszériával.",
      en: "Truck-derived toughness with a high payload in a van body.",
      de: "LKW-basierte Robustheit mit herausragender Nutzlast im Kastenwagen.",
      ro: "Robusteșe derivată din camioane, sarcină utilă remarcabilă în caroserie de furgon.",
    },
    image: "/images/4c7a44122714.jpg",
    basePrice: 13200000,
    cargoM3: 12,
    payloadKg: 1450,
  },
  {
    id: "iveco-daily-35c16-chassis",
    brandId: "iveco",
    name: "Daily 35C16 alváz",
    description: {
      hu: "Ikerkerekes alváz egyedi dobozos felépítményhez – nagy hasznos teherrel.",
      en: "Twin-wheel chassis for custom box bodies - high usable payload.",
      de: "Zwillingsbereiftes Fahrgestell für individuelle Kofferaufbauten – hohe Nutzlast.",
      ro: "Șasiu cu roți gemene pentru cutii personalizate - sarcină utilă mare.",
    },
    image: "/images/688500d4a01a.jpg",
    basePrice: 13900000,
    cargoM3: 18,
    payloadKg: 1500,
  },
  {
    id: "fiat-ducato-chassis",
    brandId: "fiat",
    name: "Ducato alváz",
    description: {
      hu: "Alvázas kivitel egyedi méretű hűtős vagy száraz dobozhoz.",
      en: "Chassis cab for custom-size refrigerated or dry box bodies.",
      de: "Fahrgestell für Kühl- oder Trockenkoffer in Sondergröße.",
      ro: "Șasiu cabină pentru cutii frigorifice sau uscate la dimensiuni personalizate.",
    },
    image: "/images/6be9f7162b3b.jpg",
    basePrice: 10900000,
    cargoM3: 17,
    payloadKg: 1400,
  },
  {
    id: "mb-sprinter-chassis",
    brandId: "mercedes",
    name: "Sprinter alváz",
    description: {
      hu: "Prémium alváz maximális felépítmény-szabadsággal, akár több hőmérsékleti zónával.",
      en: "Premium chassis with full body freedom - multi-temperature zones available.",
      de: "Premium-Fahrgestell mit voller Aufbaufreiheit – Mehrtemperaturzonen möglich.",
      ro: "Șasiu premium cu libertate totală de carosare - zone multi-temperatură disponibile.",
    },
    image: "/images/785d3105c7c6.jpg",
    basePrice: 14300000,
    cargoM3: 17.5,
    payloadKg: 1350,
  },
];

/* -------------------------------- Body types -------------------------------- */

export const bodyTypes: BodyType[] = [
  {
    id: "refrigerated-van",
    name: {
      hu: "Hűtős furgon",
      en: "Refrigerated van",
      de: "Kühltransporter",
      ro: "Furgon frigorific",
    },
    description: {
      hu: "Raktérszigetelés hőhídmentes kivitelben, higiénikus, mosható burkolattal és hűtőberendezés-előkészítéssel.",
      en: "Thermal-bridge-free cargo insulation with hygienic washable lining, prepared for cooling unit installation.",
      de: "Wärmebrückenfreie Laderaumisolierung mit hygienischer, abwaschbarer Verkleidung, vorbereitet für den Aggregat-Einbau.",
      ro: "Izolare fără punți termice, cu căptușeală igienică lavabilă, pregătită pentru montarea unității frigorifice.",
    },
    image: "/images/79539d1d7438.jpg",
    price: 2800000,
    tempRange: "-20°C … +12°C",
  },
  {
    id: "cooled-box",
    name: {
      hu: "Hűtős doboz felépítmény",
      en: "Refrigerated box body",
      de: "Kühlkoffer-Aufbau",
      ro: "Cutie frigorifică",
    },
    description: {
      hu: "Könnyűszerkezetes szendvicspaneles hűtődoboz alvázra, egyedi méretben, akár osztott raktérrel.",
      en: "Lightweight sandwich-panel refrigerated box on chassis, custom dimensions, optional split compartments.",
      de: "Leichter Sandwichpaneel-Kühlkoffer auf Fahrgestell, Sondermaße, optional geteilter Laderaum.",
      ro: "Cutie frigorifică din panouri sandwich pe șasiu, dimensiuni personalizate, compartimentare opțională.",
    },
    image: "/images/82308068d05b.jpg",
    price: 4200000,
    tempRange: "-20°C … +12°C",
  },
  {
    id: "aluminium-box",
    name: {
      hu: "Alumínium doboz",
      en: "Aluminium box body",
      de: "Aluminiumkoffer",
      ro: "Cutie din aluminiu",
    },
    description: {
      hu: "Könnyű, korrózióálló zárt doboz száraz árukhoz – maximális hasznos teherrel.",
      en: "Light, corrosion-resistant enclosed box for dry goods - maximum payload.",
      de: "Leichter, korrosionsbeständiger Koffer für Trockengut – maximale Nutzlast.",
      ro: "Cutie închisă ușoară, rezistentă la coroziune, pentru mărfuri uscate - sarcină utilă maximă.",
    },
    image: "/images/8bd1648f42cf.jpg",
    price: 2600000,
    tempRange: "-",
  },
  {
    id: "flatbed-tarpaulin",
    name: {
      hu: "Platós-ponyvás felépítmény",
      en: "Flatbed with tarpaulin",
      de: "Pritsche mit Plane",
      ro: "Platformă cu prelată",
    },
    description: {
      hu: "Oldalról is rakodható platós kialakítás ponyvával – építőipari és általános fuvarozási feladatokra.",
      en: "Side-loading flatbed with tarpaulin - for construction and general haulage.",
      de: "Seitlich beladbare Pritsche mit Plane – für Bau und allgemeine Transporte.",
      ro: "Platformă cu încărcare laterală și prelată - pentru construcții și transport general.",
    },
    image: "/images/a51e2c833b3a.jpg",
    price: 1900000,
    tempRange: "-",
  },
];

/* ------------------------------- Cooling units ------------------------------- */

export const coolingUnits: CoolingUnit[] = [
  {
    id: "carrier-xarios-300",
    name: "Carrier Xarios 300",
    description: {
      hu: "Kompakt, közvetlen hajtású raktérhűtő közepes raktérhez – fagyasztásra is.",
      en: "Compact direct-drive unit for medium cargo bays - freezing capable.",
      de: "Kompaktes Direktantriebsaggregat für mittlere Laderäume – auch für Tiefkühlung.",
      ro: "Unitate compactă cu antrenare directă pentru compartimente medii - capabilă de congelare.",
    },
    price: 1800000,
    tempRange: "-20°C … +12°C",
  },
  {
    id: "carrier-xarios-600",
    name: "Carrier Xarios 600",
    description: {
      hu: "Nagyobb hűtőteljesítmény hosszú furgonokhoz és intenzív ajtónyitásos terítéshez.",
      en: "Higher capacity for long vans and intensive multi-drop door openings.",
      de: "Höhere Leistung für lange Kastenwagen und intensive Verteilerverkehre.",
      ro: "Capacitate mai mare pentru furgoane lungi și livrări cu deschideri frecvente de uși.",
    },
    price: 2400000,
    tempRange: "-20°C … +12°C",
  },
  {
    id: "carrier-supra-550",
    name: "Carrier Supra 550",
    description: {
      hu: "Önálló dízelmotoros aggregát dobozos felépítményekhez – motorfüggetlen hűtés.",
      en: "Self-powered diesel unit for box bodies - cooling independent of the engine.",
      de: "Dieselgetriebenes Standalone-Aggregat für Kofferaufbauten – motorunabhängige Kühlung.",
      ro: "Unitate diesel independentă pentru cutii - răcire independentă de motor.",
    },
    price: 4900000,
    tempRange: "-20°C … +12°C",
  },
  {
    id: "daikin-zea",
    name: "Daikin Zea",
    description: {
      hu: "Halk, energiahatékony hűtőegység városi éjszakai terítéshez.",
      en: "Quiet, energy-efficient unit ideal for night-time urban delivery.",
      de: "Leises, energieeffizientes Aggregat – ideal für nächtliche Stadtbelieferung.",
      ro: "Unitate silențioasă și eficientă energetic, ideală pentru livrări urbane nocturne.",
    },
    price: 2100000,
    tempRange: "-20°C … +12°C",
  },
  {
    id: "insulation-only",
    name: "Szigetelés hűtőgép nélkül",
    description: {
      hu: "Csak hőszigetelés – hűtőberendezés később is beépíthető.",
      en: "Insulation only - a cooling unit can be retrofitted at any time.",
      de: "Nur Isolierung – ein Kühlaggregat kann jederzeit nachgerüstet werden.",
      ro: "Doar izolare - unitatea frigorifică poate fi montată ulterior oricând.",
    },
    price: 0,
    tempRange: "izoterm",
  },
];

/* ------------------------------ Interior linings ------------------------------ */

export const interiorOptions: InteriorOption[] = [
  {
    id: "grp",
    name: {
      hu: "Üvegszálas (GRP) burkolat",
      en: "GRP (fibreglass) lining",
      de: "GFK-Verkleidung",
      ro: "Căptușeală GRP (fibră de sticlă)",
    },
    description: {
      hu: "Higiénikus, varratmentes, könnyen tisztítható – élelmiszeripari alapfelszereltség.",
      en: "Hygienic, jointless, easy to clean - the food-industry standard.",
      de: "Hygienisch, fugenlos, leicht zu reinigen – Standard der Lebensmittelbranche.",
      ro: "Igienică, fără îmbinări, ușor de curățat - standardul industriei alimentare.",
    },
    price: 0,
  },
  {
    id: "aluminium",
    name: {
      hu: "Alumínium burkolat",
      en: "Aluminium lining",
      de: "Aluminium-Verkleidung",
      ro: "Căptușeală din aluminiu",
    },
    description: {
      hu: "Ütésálló fém védelem intenzív rakodáshoz és görgős konténerekhez.",
      en: "Impact-resistant metal protection for heavy loading and roll cages.",
      de: "Stoßfester Metallschutz für intensive Beladung und Rollbehälter.",
      ro: "Protecție metalică rezistentă la impact pentru încărcare intensă și role.",
    },
    price: 380000,
  },
  {
    id: "stainless",
    name: {
      hu: "Rozsdamentes acél burkolat",
      en: "Stainless steel lining",
      de: "Edelstahl-Verkleidung",
      ro: "Căptușeală din oțel inoxidabil",
    },
    description: {
      hu: "Maximális higiénia és élettartam – hús- és gyógyszeripari előírásokhoz.",
      en: "Maximum hygiene and lifetime - for meat and pharma regulations.",
      de: "Maximale Hygiene und Lebensdauer – für Fleisch- und Pharmavorschriften.",
      ro: "Igienă și durabilitate maximă - pentru normele din industria cărnii și farma.",
    },
    price: 650000,
  },
  {
    id: "stainless-floor",
    name: {
      hu: "Rozsdamentes padló + GRP fal",
      en: "Stainless floor + GRP walls",
      de: "Edelstahlboden + GFK-Wände",
      ro: "Pardoseală inox + pereți GRP",
    },
    description: {
      hu: "A legnépszerűbb kombináció: strapabíró padló, könnyű falak.",
      en: "The most popular combination: heavy-duty floor, lightweight walls.",
      de: "Die beliebteste Kombination: robuster Boden, leichte Wände.",
      ro: "Cea mai populară combinație: pardoseală robustă, pereți ușori.",
    },
    price: 420000,
  },
];

/* ---------------------------------- Helpers ---------------------------------- */

export function variantsForBrand(brandId: string): Variant[] {
  return variants.filter((v) => v.brandId === brandId);
}

export function getLocale(lang: Lang): string {
  switch (lang) {
    case "en":
      return "en-US";
    case "de":
      return "de-DE";
    case "ro":
      return "ro-RO";
    default:
      return "hu-HU";
  }
}

export function formatPrice(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(getLocale(lang), {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface Selection {
  brandId: string | null;
  variantId: string | null;
  bodyTypeId: string | null;
  coolingUnitId: string | null;
  interiorId: string | null;
}

export function calculateTotal(sel: Selection): number {
  let total = 0;
  const variant = variants.find((v) => v.id === sel.variantId);
  const body = bodyTypes.find((b) => b.id === sel.bodyTypeId);
  const unit = coolingUnits.find((c) => c.id === sel.coolingUnitId);
  const interior = interiorOptions.find((i) => i.id === sel.interiorId);
  if (variant) total += variant.basePrice;
  if (body) total += body.price;
  if (unit) total += unit.price;
  if (interior) total += interior.price;
  return total;
}
