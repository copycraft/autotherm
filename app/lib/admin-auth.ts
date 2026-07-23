import "server-only";
import type { NextRequest } from "next/server";
import { getSetting } from "./db";

/**
 * Admin API authentication - HTTP Basic.
 * The password can be overridden via the `admin_password` settings key;
 * falls back to the ADMIN_PASSWORD env var, then the legacy default.
 */
export async function isAuthorized(request: NextRequest): Promise<boolean> {
  try {
    const header = request.headers.get("authorization") ?? "";
    if (!header.startsWith("Basic ")) return false;
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    if (separator === -1) return false;
    const user = decoded.slice(0, separator);
    const pass = decoded.slice(separator + 1);

    const stored = await getSetting("admin_password");
    const expected = stored || process.env.ADMIN_PASSWORD || "admin";
    return user === "admin" && pass === expected;
  } catch {
    return false;
  }
}

export function unauthorized(): Response {
  return new Response(JSON.stringify({ success: false, message: "unauthorized" }), {
    status: 401,
    headers: {
      "content-type": "application/json",
      "www-authenticate": 'Basic realm="autotherm-admin"',
    },
  });
}
