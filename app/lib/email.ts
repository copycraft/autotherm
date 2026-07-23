import "server-only";
import { getSettings } from "./db";

/**
 * Transactional email via the Brevo HTTP API - pure fetch(), zero Node.js
 * native modules, fully Cloudflare Workers compatible.
 *
 * Credentials are stored in the settings table (managed from /at-admin):
 *   brevo_api_key, email_from, email_to
 */

export interface OutgoingMail {
  subject: string;
  html: string;
  replyTo?: { email: string; name?: string };
}

export async function sendNotificationEmail(
  mail: OutgoingMail,
): Promise<boolean> {
  try {
    const settings = await getSettings(["brevo_api_key", "email_from", "email_to"]);
    const apiKey = settings.get("brevo_api_key");
    const from = settings.get("email_from");
    const to = settings.get("email_to");
    if (!apiKey || !from || !to) {
      console.warn("[email] Brevo not configured - skipping notification.");
      return false;
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: from, name: "Autotherm Web" },
        to: [{ email: to }],
        subject: mail.subject,
        htmlContent: mail.html,
        ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      console.error("[email] Brevo API error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] sendNotificationEmail failed:", err);
    return false;
  }
}

const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const ESCAPE_RE = /[&<>"']/g;

export function escapeHtml(value: string): string {
  return value.replace(ESCAPE_RE, (c) => ESCAPE_MAP[c]);
}
