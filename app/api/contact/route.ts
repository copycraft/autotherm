import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission } from '@/app/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, page, lang } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Name, email, and message are required.' }, { status: 400 });
    }

    insertSubmission({ name, email, phone, message, page, lang });

    return NextResponse.json({ success: true, message: 'Köszönjük! Munkatársunk hamarosan felveszi Önnel a kapcsolatot.' });
  } catch {
    return NextResponse.json({ success: false, message: 'Hiba történt. Kérjük, próbálja újra.' }, { status: 500 });
  }
}
