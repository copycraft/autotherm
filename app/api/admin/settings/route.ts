import { NextRequest, NextResponse } from 'next/server';
import { getSetting, setSetting } from '@/app/lib/db';

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const base64 = auth.replace('Basic ', '');
  const decoded = Buffer.from(base64, 'base64').toString();
  return decoded === 'admin:admin';
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const apiKey = (await getSetting('brevo_api_key')) ? '********' : '';
  const from = await getSetting('email_from');
  const to = await getSetting('email_to');
  return NextResponse.json({ apiKey, from, to });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  if (body.apiKey !== undefined && body.apiKey !== '********') await setSetting('brevo_api_key', body.apiKey);
  if (body.from !== undefined) await setSetting('email_from', body.from);
  if (body.to !== undefined) await setSetting('email_to', body.to);
  return NextResponse.json({ success: true });
}
