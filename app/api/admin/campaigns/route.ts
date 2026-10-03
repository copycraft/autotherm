import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized, unauthorized } from "@/app/lib/admin-auth";
import { getRecentLeads } from "@/app/lib/db";

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) return unauthorized();
  const days = Number(request.nextUrl.searchParams.get("days")) || 90;
  const leads = await getRecentLeads(Math.min(days, 365));
  return NextResponse.json({ success: true, leads });
}
