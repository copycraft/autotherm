import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission } from '@/app/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, page, lang } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Name, email, and message are required.' }, { status: 400 });
    }

    await insertSubmission({ name, email, phone, message, page, lang });

    if (process.env.SMTP_HOST) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.default.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          auth: {
            user: process.env.SMTP_USER || '',
            pass: process.env.SMTP_PASS || '',
          },
        });
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"${name}" <${email}>`,
          replyTo: email,
          to: process.env.NOTIFICATION_EMAIL || 'vastag.peter@autotherm.hu',
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
      } catch {
        console.error('Email send failed (SMTP not configured or unreachable)');
      }
    }

    return NextResponse.json({ success: true, message: 'Köszönjük! Munkatársunk hamarosan felveszi Önnel a kapcsolatot.' });
  } catch {
    return NextResponse.json({ success: false, message: 'Hiba történt. Kérjük, próbálja újra.' }, { status: 500 });
  }
}
