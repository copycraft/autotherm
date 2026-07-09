'use client';
import { useState } from "react";

interface ContactFormProps {
  lang: string;
  successTitle?: string;
  successText?: string;
  submitLabel?: string;
  fields?: { name: boolean; email: boolean; phone: boolean; message: boolean };
}

export default function ContactForm({
  lang,
  successTitle = "Köszönjük!",
  successText = "Munkatársunk hamarosan felveszi Önnel a kapcsolatot.",
  submitLabel = "Küldés",
  fields = { name: true, email: true, phone: true, message: true },
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, page: window.location.pathname, lang }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
    } catch { /* ignore */ }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-[#4a68a9] mb-4">{successTitle}</h2>
        <p className="text-[#666]">{successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.name && (
        <div>
          <label className="block text-sm font-bold text-[#555] mb-1">{lang === 'hu' ? 'Név' : lang === 'de' ? 'Name' : lang === 'ro' ? 'Nume' : 'Name'}</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]" placeholder={lang === 'hu' ? 'Az Ön neve' : lang === 'de' ? 'Ihr Name' : lang === 'ro' ? 'Numele dvs.' : 'Your name'} required />
        </div>
      )}
      {fields.email && (
        <div>
          <label className="block text-sm font-bold text-[#555] mb-1">{lang === 'hu' ? 'E-mail' : 'E-Mail'}</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]" placeholder="email@example.com" required />
        </div>
      )}
      {fields.phone && (
        <div>
          <label className="block text-sm font-bold text-[#555] mb-1">{lang === 'hu' ? 'Telefonszám' : lang === 'de' ? 'Telefon' : lang === 'ro' ? 'Telefon' : 'Phone'}</label>
          <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]" placeholder="+36 20 123 4567" />
        </div>
      )}
      {fields.message && (
        <div>
          <label className="block text-sm font-bold text-[#555] mb-1">{lang === 'hu' ? 'Üzenet' : lang === 'de' ? 'Nachricht' : lang === 'ro' ? 'Mesaj' : 'Message'}</label>
          <textarea rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2.5 border border-[#d9d9d9] outline-none focus:border-[#4a68a9]" placeholder={lang === 'hu' ? 'Írja meg üzenetét...' : lang === 'de' ? 'Ihre Nachricht...' : lang === 'ro' ? 'Scrieți mesajul dvs...' : 'Write your message...'} required></textarea>
        </div>
      )}
      <button type="submit" className="button w-full text-center">{submitLabel}</button>
    </form>
  );
}
