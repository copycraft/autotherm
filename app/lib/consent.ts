/** Cookie-consent state shared by the banner, analytics and forms. */

export const CONSENT_KEY = "autotherm-cookie-consent";
export const CONSENT_EVENT = "autotherm-consent-change";

export type Consent = "accepted" | "declined" | null;

export function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: "accepted" | "declined"): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage unavailable - the choice just applies to this page view.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
