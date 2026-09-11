import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { CMT } from "@/lib/cmt";

export const Route = createFileRoute("/support")({
  component: Support,
  head: () => ({ meta: [{ title: "Support · CMT" }] }),
});

const FAQS = [
  {
    q: "How does authorization work?",
    a: "Your health plan, PT-1, or transportation broker authorizes eligible rides. Keep your member ID or authorization number handy when you book.",
  },
  {
    q: "What if I need to cancel?",
    a: "Open the ride and choose Cancel Ride. If your pickup is soon, please also call CMT at (774) 622-3789 so we can notify your driver.",
  },
  {
    q: "Can someone ride with me?",
    a: "Yes. Toggle the companion/escort option when you book. Let us know if they also need mobility assistance.",
  },
  {
    q: "Do you provide wheelchair transportation?",
    a: "Yes. Select Wheelchair or Walker/Cane Assistance in your profile or during booking so we send the right vehicle.",
  },
  {
    q: "What areas do you serve?",
    a: "CMT is based in Spencer, MA and serves clients through MassHealth/PT-1 and approved transportation broker programs.",
  },
];

function Support() {
  const [open, setOpen] = useState<number | null>(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "cmt", text: "Hi, this is CMT dispatch. How can we help with your ride today?" },
  ]);
  const [draft, setDraft] = useState("");

  return (
    <AppShell>
      <ScreenHeader title="Messages / Support" />
      <div className="p-4 pb-8">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`tel:${CMT.phoneTel}`}
            className="cmt-card flex min-h-[88px] flex-col items-start justify-center gap-2 p-4"
          >
            <Phone className="h-5 w-5 text-[#0a6bdb]" />
            <span className="text-sm font-bold text-[#032558]">Call CMT</span>
            <span className="text-xs text-[#5C6B7A]">{CMT.phone}</span>
          </a>
          <a
            href={`mailto:${CMT.email}`}
            className="cmt-card flex min-h-[88px] flex-col items-start justify-center gap-2 p-4"
          >
            <Mail className="h-5 w-5 text-[#0a6bdb]" />
            <span className="text-sm font-bold text-[#032558]">Email us</span>
            <span className="text-xs text-[#5C6B7A]">{CMT.email}</span>
          </a>
        </div>

        <button
          onClick={() => setChatOpen(true)}
          className="cmt-card mt-3 flex w-full items-center gap-3 p-4 text-left"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a6bdb]/10 text-[#0a6bdb]">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-[#032558]">Live chat</p>
            <p className="text-xs text-[#5C6B7A]">Message dispatch for same-day help</p>
          </div>
        </button>

        <div className="cmt-card mt-3 flex items-start gap-3 p-4">
          <MapPin className="mt-0.5 h-5 w-5 text-[#0a6bdb]" />
          <div>
            <p className="text-sm font-bold text-[#032558]">{CMT.name}</p>
            <p className="text-xs leading-relaxed text-[#5C6B7A]">{CMT.address}</p>
          </div>
        </div>

        <h2 className="mt-8 text-base font-bold text-[#032558]">Frequently asked</h2>
        <ul className="mt-3 overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(3,37,88,0.06)]">
          {FAQS.map((f, i) => (
            <li key={i} className="border-b border-[#eef1f6] last:border-b-0">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-3 p-4 text-left"
              >
                <span className="text-sm font-bold text-[#032558]">{f.q}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-none text-[#0a6bdb] transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <p className="px-4 pb-4 text-sm leading-relaxed text-[#5C6B7A]">{f.a}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <BottomNav />

      {chatOpen && (
        <div className="fixed inset-0 z-50 mx-auto flex max-w-[420px] flex-col bg-white">
          <div className="flex h-14 items-center justify-between border-b border-[#dce3ec] px-4">
            <p className="font-bold text-[#032558]">CMT Dispatch</p>
            <button onClick={() => setChatOpen(false)} className="text-sm font-semibold text-[#0a6bdb]">
              Close
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.from === "cmt"
                    ? "bg-[#F5F7FA] text-[#032558]"
                    : "ml-auto bg-[#0a6bdb] text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-[#dce3ec] p-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              setMessages((prev) => [
                ...prev,
                { from: "me", text: draft },
                {
                  from: "cmt",
                  text: "Thanks — a dispatcher will follow up shortly. For urgent changes, please call (774) 622-3789.",
                },
              ]);
              setDraft("");
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message"
              className="h-12 flex-1 rounded-xl bg-[#eef1f6] px-4 text-sm text-[#032558] focus:outline-none"
            />
            <button type="submit" className="h-12 rounded-xl bg-[#0a6bdb] px-4 text-sm font-semibold text-white">
              Send
            </button>
          </form>
        </div>
      )}
    </AppShell>
  );
}
