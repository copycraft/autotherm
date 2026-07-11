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
  const host = await getSetting('smtp_host');
  const port = await getSetting('smtp_port');
  const user = await getSetting('smtp_user');
  const pass = await getSetting('smtp_pass');
  const from = await getSetting('smtp_from');
  const notify = await getSetting('smtp_notify');
  return NextResponse.json({ host, port, user, pass: pass ? '********' : '', from, notify });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  if (body.host) await setSetting('smtp_host', body.host);
  if (body.port) await setSetting('smtp_port', body.port);
  if (body.user) await setSetting('smtp_user', body.user);
  if (body.pass && body.pass !== '********') await setSetting('smtp_pass', body.pass);
  if (body.from) await setSetting('smtp_from', body.from);
  if (body.notify) await setSetting('smtp_notify', body.notify);
  return NextResponse.json({ success: true });
}
