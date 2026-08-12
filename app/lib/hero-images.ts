import type { PageKey } from "@/app/lib/routes";

/**
 * Page-header photography.
 *
 * Only five plates in the library are large enough to survive a full-bleed
 * header (2818px and 1334px wide); everything else tops out at 600px and turns
 * soft when stretched. So headers draw from this shortlist by theme rather than
 * from each page's own `heroImage`, which stays where it is sharp — inline in
 * the page body at its native size.
 *
 * Replace these with higher-resolution shots as they become available.
 */

/** Fleet lined up outside the Szeged plant — the company itself. */
const PLANT = "/images/688500d4a01a.webp";
/** Box truck in snow — the cold chain, wide and calm. */
const COLD = "/images/05b85e04c8d3.webp";
/** Rear door hardware — precision, tolerances, build quality. */
const HARDWARE = "/images/b05d04ca1183.webp";
/** Tail lift and underrun detail — mechanical service work. */
const MECHANICAL = "/images/4c7a44122714.webp";
/** Red Caddy, side open — the product range at its most approachable. */
const PRODUCT = "/images/fca243146ad0.webp";

export const HERO_IMAGE_FALLBACK = COLD;

export const heroImageFor: Partial<Record<PageKey, string>> = {
  about: COLD,
  products: PRODUCT,
  service: MECHANICAL,
  carrierService: MECHANICAL,
  ourService: MECHANICAL,
  bodyRepair: MECHANICAL,
  whyUs: HARDWARE,
  commercialBodies: COLD,
  cooledBodies: COLD,
  vanIsolations: PRODUCT,
  deceasedTransport: HARDWARE,
  gallery: PLANT,
  blog: HARDWARE,
  contact: PLANT,
  quotation: PRODUCT,
};
