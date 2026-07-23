import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized, unauthorized } from "@/app/lib/admin-auth";
import { getSettings, getStats, setSetting } from "@/app/lib/db";

const MASK = "********";

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) return unauthorized();
  const [settings, stats] = await Promise.all([
    getSettings(["brevo_api_key", "email_from", "email_to"]),
    getStats(),
  ]);
  const apiKey = settings.get("brevo_api_key");
  const from = settings.get("email_from");
  const to = settings.get("email_to");
  return NextResponse.json({
    success: true,
    apiKey: apiKey ? MASK : "",
    from: from ?? "",
    to: to ?? "",
    stats: {
      foundedYear: stats.foundedYear,
      customers: stats.customers,
      annualConversions: stats.annualConversions,
      employees: stats.employees,
    },
  });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) return unauthorized();
  try {
    const body = (await request.json()) as {
      apiKey?: string;
      from?: string;
      to?: string;
      stats?: {
        foundedYear?: number;
        customers?: number;
        annualConversions?: number;
        employees?: number;
      };
    };
    const tasks: Promise<boolean>[] = [];
    if (body.apiKey !== undefined && body.apiKey !== MASK) {
      tasks.push(setSetting("brevo_api_key", body.apiKey));
    }
    if (body.from !== undefined) tasks.push(setSetting("email_from", body.from));
    if (body.to !== undefined) tasks.push(setSetting("email_to", body.to));
    if (body.stats) {
      if (body.stats.foundedYear !== undefined) tasks.push(setSetting("stat_foundedYear", String(body.stats.foundedYear)));
      if (body.stats.customers !== undefined) tasks.push(setSetting("stat_customers", String(body.stats.customers)));
      if (body.stats.annualConversions !== undefined) tasks.push(setSetting("stat_annualConversions", String(body.stats.annualConversions)));
      if (body.stats.employees !== undefined) tasks.push(setSetting("stat_employees", String(body.stats.employees)));
    }
    await Promise.all(tasks);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "invalid request" },
      { status: 400 },
    );
  }
}
