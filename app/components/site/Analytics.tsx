"use client";

import { useEffect } from "react";
import {
  ADS_ID,
  GA_ID,
  META_PIXEL_ID,
  noteLanding,
  persistAttribution,
  trackEvent,
} from "@/app/lib/analytics";
import { CONSENT_EVENT, readConsent } from "@/app/lib/consent";

/**
 * Google Analytics 4 (+ optional Google Ads tag), consent-gated.
 *
 * The Google script is not requested at all until the visitor accepts
 * cookies. Consent Mode v2 signals are set so Google treats the hits as
 * consented; declining later switches measurement off again.
 * Renders nothing; does nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 */

let loaded = false;

function loadGoogle() {
  if (loaded || !GA_ID) return;
  loaded = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js requires the real `arguments` object, not a rest array.
    // eslint-disable-next-line prefer-rest-params
    (window.dataLayer as unknown[]).push(arguments);
  };

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
  if (ADS_ID) window.gtag("config", ADS_ID);

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

let metaLoaded = false;

/** Meta (Facebook / Instagram) Pixel - only loaded after consent. */
function loadMeta() {
  if (metaLoaded || !META_PIXEL_ID) return;
  metaLoaded = true;

  // Port of Meta's official snippet: a queueing stub until fbevents.js loads.
  type Fbq = ((...a: unknown[]) => void) & {
    callMethod?: (...a: unknown[]) => void;
    queue: unknown[];
    push: unknown;
    loaded: boolean;
    version: string;
  };
  const fbq = function () {
    // eslint-disable-next-line prefer-spread, prefer-rest-params
    if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments as unknown as unknown[]);
    // eslint-disable-next-line prefer-rest-params
    else fbq.queue.push(arguments);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

function revoke() {
  if (!loaded || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export default function Analytics() {
  useEffect(() => {
    noteLanding();

    const apply = () => {
      if (readConsent() === "accepted") {
        persistAttribution();
        loadGoogle();
        loadMeta();
      } else {
        revoke();
      }
    };
    apply();
    window.addEventListener(CONSENT_EVENT, apply);

    // Phone / e-mail clicks are the main conversions besides the forms.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackEvent("phone_click", { link_url: href });
      else if (href.startsWith("mailto:")) trackEvent("email_click", { link_url: href });
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener(CONSENT_EVENT, apply);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
