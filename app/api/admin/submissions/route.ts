import { NextRequest, NextResponse } from 'next/server';
import { getAllSubmissions } from '@/app/lib/db';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin';

function unauthorized() {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (!auth || !auth.startsWith('Basic ')) return unauthorized();

  const encoded = auth.slice(6);
  const decoded = Buffer.from(encoded, 'base64').toString();
  const [user, pass] = decoded.split(':');

  if (user !== ADMIN_USER || pass !== ADMIN_PASS) return unauthorized();

  try {
    const submissions = getAllSubmissions();
    return NextResponse.json({ success: true, submissions });
  } catch {
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
