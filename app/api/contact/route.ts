import { NextResponse, type NextRequest } from "next/server";
import { insertSubmission } from "@/app/lib/db";
import { escapeHtml, sendNotificationEmail } from "@/app/lib/email";

/**
 * POST /api/contact - JSON contact endpoint.
 * The public forms use Server Actions; this route remains for programmatic
 * clients and backwards compatibility.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      page?: string;
      lang?: string;
    };

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "name, email and message are required" },
        { status: 400 },
      );
    }

    const saved = await insertSubmission({
      name,
      email,
      phone: body.phone?.trim() || null,
      message,
      page: body.page?.trim() || null,
      lang: body.lang?.trim() || null,
    });

    const mailed = await sendNotificationEmail({
      subject: `Autotherm web enquiry - ${name}`,
      replyTo: { email, name },
      html: `
        <h2>New enquiry from autotherm.hu</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(body.phone ?? "-")}</p>
        <p><strong>Page:</strong> ${escapeHtml(body.page ?? "-")} (${escapeHtml(body.lang ?? "-")})</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
      `,
    });

    if (!saved && !mailed) {
      return NextResponse.json(
        { success: false, message: "delivery failed" },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/contact] failed:", err);
    return NextResponse.json(
      { success: false, message: "invalid request" },
      { status: 400 },
    );
  }
}
