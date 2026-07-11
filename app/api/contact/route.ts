import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, getSetting } from '@/app/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, page, lang } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Name, email, and message are required.' }, { status: 400 });
    }

    try {
      await insertSubmission({ name, email, phone, message, page, lang });
    } catch {
      // DB save is best-effort on Workers
    }

    try {
      const apiKey = await getSetting('brevo_api_key');
      if (apiKey) {
        const fromEmail = await getSetting('email_from') || 'hutoautok@hutoautok.hu';
        const toEmail = await getSetting('email_to') || 'vastag.peter@autotherm.hu';
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { email: fromEmail },
            to: [{ email: toEmail }],
            replyTo: { email },
            subject: `Új ajánlatkérés: ${name}`,
            textContent: [
              `Új ajánlatkérés érkezett az autotherm.hu oldalról`,
              ``,
              `Név: ${name}`,
              `Email: ${email}`,
              `Telefon: ${phone || '—'}`,
              `Oldal: ${page || '—'}`,
              `Nyelv: ${lang || '—'}`,
              ``,
              `Üzenet:`,
              message,
            ].join('\n'),
          }),
        });
      }
    } catch {
      console.error('Email send failed');
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: 'Hiba történt. Kérjük, próbálja újra.' }, { status: 500 });
  }
}
