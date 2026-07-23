import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized, unauthorized } from "@/app/lib/admin-auth";
import { getAllSubmissions } from "@/app/lib/db";

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) return unauthorized();
  const submissions = await getAllSubmissions();
  return NextResponse.json({ success: true, submissions });
}
