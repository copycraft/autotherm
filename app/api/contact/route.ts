import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, getSetting } from '@/app/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, page, lang } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Name, email, and message are required.' }, { status: 400 });
    }

    await insertSubmission({ name, email, phone, message, page, lang });

    try {
      const host = await getSetting('smtp_host');
      if (host) {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.default.createTransport({
          host,
          port: parseInt(await getSetting('smtp_port') || '587'),
          auth: {
            user: await getSetting('smtp_user') || '',
            pass: await getSetting('smtp_pass') || '',
          },
        });
        await transporter.sendMail({
          from: await getSetting('smtp_from') || `"${name}" <${email}>`,
          replyTo: email,
          to: await getSetting('smtp_notify') || 'vastag.peter@autotherm.hu',
          subject: `Új ajánlatkérés: ${name}`,
          text: [
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
        });
      }
    } catch {
      console.error('Email send failed (SMTP not configured or unreachable)');
    }

    return NextResponse.json({ success: true, message: 'Köszönjük! Munkatársunk hamarosan felveszi Önnel a kapcsolatot.' });
  } catch {
    return NextResponse.json({ success: false, message: 'Hiba történt. Kérjük, próbálja újra.' }, { status: 500 });
  }
}
