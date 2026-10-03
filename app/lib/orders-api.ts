import "server-only";

/**
 * Generic REST client for incoming orders / quotation requests.
 *
 * Placeholder integration: every enquiry is POSTed as JSON to an external
 * endpoint. Point it at the real order system by setting two variables
 * (never exposed to the browser):
 *
 *   ORDERS_API_URL  full endpoint, e.g. https://api.example.com/v1/orders
 *   ORDERS_API_KEY  optional, sent as `Authorization: Bearer <key>`
 *
 * Local dev: put them in .dev.vars. Production:
 *   npx wrangler secret put ORDERS_API_URL
 *   npx wrangler secret put ORDERS_API_KEY
 *
 * Request body (adjust the mapping in `sendOrder` to the real API):
 *   { "source": "autotherm.hu", "type": "enquiry", "createdAt": ISO-8601,
 *     "customer": { "name", "email", "phone" },
 *     "message": string, "page": string, "lang": string }
 */

export interface OrderInput {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  page?: string | null;
  lang?: string | null;
}

export async function sendOrder(order: OrderInput): Promise<boolean> {
  const url = process.env.ORDERS_API_URL;
  if (!url) {
    console.warn("[orders] ORDERS_API_URL not set - order not forwarded.");
    return false;
  }

  try {
    const key = process.env.ORDERS_API_KEY;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        ...(key ? { authorization: `Bearer ${key}` } : {}),
      },
      body: JSON.stringify({
        source: "autotherm.hu",
        type: "enquiry",
        createdAt: new Date().toISOString(),
        customer: {
          name: order.name,
          email: order.email,
          phone: order.phone ?? null,
        },
        message: order.message,
        page: order.page ?? null,
        lang: order.lang ?? null,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error("[orders] API error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[orders] sendOrder failed:", err);
    return false;
  }
}
