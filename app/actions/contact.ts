"use server";

import { insertSubmission } from "@/app/lib/db";
import { escapeHtml, sendNotificationEmail } from "@/app/lib/email";

/**
 * Contact / quotation Server Action.
 * Consumed by useActionState - forms function natively without JavaScript
 * (progressive enhancement), and get optimistic pending UI with it.
 */

export interface ContactFormState {
  status: "idle" | "success" | "error";
  invalid?: string[];
}

export const initialContactState: ContactFormState = { status: "idle" };

function asText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    // Honeypot - bots fill every field; humans never see this one.
    if (asText(formData.get("company_website")) !== "") {
      return { status: "success" };
    }

    const name = asText(formData.get("name"));
    const email = asText(formData.get("email"));
    const phone = asText(formData.get("phone"));
    const message = asText(formData.get("message"));
    const vehicle = asText(formData.get("vehicle"));
    const tempRange = asText(formData.get("tempRange"));
    const configuration = asText(formData.get("configuration"));
    const page = asText(formData.get("page"));
    const lang = asText(formData.get("lang"));

    const invalid: string[] = [];
    if (name.length < 2) invalid.push("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) invalid.push("email");
    if (message.length < 2 && configuration.length === 0) invalid.push("message");
    if (invalid.length > 0) return { status: "error", invalid };

    const parts: string[] = [];
    if (message) parts.push(message);
    if (vehicle) parts.push(`Vehicle: ${vehicle}`);
    if (tempRange) parts.push(`Temperature range: ${tempRange}`);
    if (configuration) parts.push(`Configuration:\n${configuration}`);
    const fullMessage = parts.join("\n\n");

    // Persist first (best effort), notify second - neither failure is fatal
    // for the other.
    const saved = await insertSubmission({
      name,
      email,
      phone: phone || null,
      message: fullMessage,
      page: page || null,
      lang: lang || null,
    });

    const mailed = await sendNotificationEmail({
      subject: `Autotherm web enquiry - ${name}`,
      replyTo: { email, name },
      html: `
        <h2>New enquiry from autotherm.hu</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
        <p><strong>Page:</strong> ${escapeHtml(page || "-")} (${escapeHtml(lang || "-")})</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(fullMessage).replaceAll("\n", "<br/>")}</p>
      `,
    });

    if (!saved && !mailed) return { status: "error" };
    return { status: "success" };
  } catch (err) {
    console.error("[action] submitContact failed:", err);
    return { status: "error" };
  }
}
