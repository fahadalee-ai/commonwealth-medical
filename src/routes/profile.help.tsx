import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Phone, Mail, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";

export const Route = createFileRoute("/profile/help")({
  component: Help,
});

const FAQS = [
  { q: "How soon can you schedule my appointment?", a: "Most requests are confirmed within a few hours. Same-day service is often available for urgent electrical issues." },
  { q: "Are your electricians licensed and insured?", a: "Yes — every technician is fully licensed, background-checked, and covered by liability insurance." },
  { q: "Do you offer estimates?", a: "Free on-site estimates are available for most residential and commercial jobs. Larger installations may include a small consultation fee." },
  { q: "How do I reschedule or cancel?", a: "Open My Appointments, pick the booking, and use the Reschedule or Cancel button. Changes may require dispatcher approval." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, ACH, and financing options for larger installations." },
];

function Help() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <AppShell>
      <ScreenHeader title="Help & Support" backTo="/profile" />
      <div className="p-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#8A8A8A]">
          Frequently Asked
        </h2>
        <ul className="mt-3 border border-[#2A2A2A]">
          {FAQS.map((f, i) => (
            <li key={i} className="border-b border-[#2A2A2A] last:border-b-0">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 bg-[#161616] p-4 text-left"
              >
                <span className="text-sm font-bold">{f.q}</span>
                <ChevronDown className={`h-4 w-4 flex-none text-[#FFC107] transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="border-t border-[#2A2A2A] bg-[#0D0D0D] p-4">
                  <p className="text-xs leading-relaxed text-[#c9c9c9]">{f.a}</p>
                </div>
              )}
            </li>
          ))}
        </ul>

        <h2 className="mt-8 text-xs font-bold uppercase tracking-widest text-[#8A8A8A]">
          Contact Us
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <a href="tel:+15551234567" className="flex flex-col items-center gap-2 border border-[#FFC107] p-3 text-[#FFC107]">
            <Phone className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Call</span>
          </a>
          <a href="mailto:support@arcelectrical.com" className="flex flex-col items-center gap-2 border border-[#FFC107] p-3 text-[#FFC107]">
            <Mail className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Email</span>
          </a>
          <a href="https://wa.me/15551234567" className="flex flex-col items-center gap-2 border border-[#FFC107] p-3 text-[#FFC107]">
            <MessageCircle className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
          </a>
        </div>

        <div className="mt-6 border border-[#2A2A2A] bg-[#161616] p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">Business Contact</p>
          <p className="mt-2 text-sm font-bold">(555) 123-4567</p>
          <p className="text-xs text-[#8A8A8A]">support@arcelectrical.com</p>
          <p className="mt-2 text-xs text-[#8A8A8A]">Mon–Sat · 7:00 AM — 8:00 PM</p>
        </div>
      </div>
    </AppShell>
  );
}