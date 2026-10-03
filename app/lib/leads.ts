import "server-only";
import { insertLead } from "./db";

/**
 * Records which campaign / source produced a lead. Input is the JSON the
 * browser stored after cookie consent ({ first, last } touches); everything is
 * validated and truncated because it comes from the client.
 */

interface Touch {
  source?: unknown;
  medium?: unknown;
  campaign?: unknown;
  term?: unknown;
  content?: unknown;
  clickId?: unknown;
  landing?: unknown;
}

const str = (v: unknown, max = 120) =>
  typeof v === "string" ? v.slice(0, max) : "";

export async function recordLead(input: {
  attributionJson: string;
  formType: string;
  lang: string;
}): Promise<void> {
  if (!input.attributionJson) return; // no consent / direct visit: nothing to attribute
  try {
    const parsed = JSON.parse(input.attributionJson.slice(0, 4000)) as {
      first?: Touch;
      last?: Touch;
    };
    const last = parsed.last ?? {};
    const first = parsed.first ?? last;
    await insertLead({
      form_type: str(input.formType, 20),
      lang: str(input.lang, 5),
      source: str(last.source),
      medium: str(last.medium),
      campaign: str(last.campaign),
      term: str(last.term),
      content: str(last.content),
      // Keep only the id type (gclid, fbclid, ...), never the value itself.
      click_id: str(last.clickId, 200).split("=")[0],
      landing: str(last.landing, 200),
      first_source: str(first.source),
      first_medium: str(first.medium),
      first_campaign: str(first.campaign),
    });
  } catch {
    // Malformed JSON from a client: ignore, the enquiry itself is unaffected.
  }
}
