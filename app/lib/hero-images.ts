import type { PageKey } from "@/app/lib/routes";

/**
 * Page-header photography.
 *
 * Headers are full-bleed, so they draw from a shortlist of plates large enough
 * to survive that (2560px+), picked by theme, rather than from each page's own
 * `heroImage`, which stays inline in the page body where smaller files stay
 * sharp. The title sits on the left, so plates read best with their subject
 * on the right.
 *
 * Still waiting on a real shot for the service pages (a technician at work);
 * MECHANICAL is the roof-unit close-up until then.
 */

/** Fleet lined up outside the Szeged plant — the company itself. */
const PLANT = "/images/688500d4a01a.webp";
/** Box truck in snow — the cold chain, wide and calm. */
const COLD = "/images/05b85e04c8d3.webp";
/** Roof-mounted cooling unit on the black Sprinter — detail and build quality. */
const DETAIL = "/images/header-roof-unit.webp";
/** Carrier roof unit on the Iveco Daily box — the equipment the service pages are about. */
const MECHANICAL = "/images/header-service-unit.webp";
/** Black Sprinter refrigerated van in front of the plant — the core product. */
const PRODUCT = "/images/header-sprinter-plant.webp";
/** Deceased-transport interior, doors open, lit — the specialist build. */
const FUNERAL = "/images/header-deceased-interior.webp";

export const HERO_IMAGE_FALLBACK = COLD;

/**
 * Focal point per plate (CSS object-position). Headers are far wider than a
 * 16:9 photo on desktop and far narrower on phones, so each plate is aimed at
 * its subject instead of the default upper-middle crop.
 */
export const heroImagePosition: Partial<Record<string, string>> = {
  [PRODUCT]: "62% 45%",
  [DETAIL]: "58% 72%",
  [FUNERAL]: "50% 28%",
  [MECHANICAL]: "50% 30%",
};

export const heroImageFor: Partial<Record<PageKey, string>> = {
  about: COLD,
  products: PRODUCT,
  service: MECHANICAL,
  carrierService: MECHANICAL,
  ourService: MECHANICAL,
  bodyRepair: MECHANICAL,
  whyUs: DETAIL,
  commercialBodies: COLD,
  cooledBodies: COLD,
  vanIsolations: PRODUCT,
  deceasedTransport: FUNERAL,
  gallery: PLANT,
  blog: DETAIL,
  contact: PLANT,
  quotation: PRODUCT,
  grants: PLANT,
};
