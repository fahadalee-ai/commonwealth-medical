import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { BottomNav } from "@/components/arc/BottomNav";
import { CMT } from "@/lib/cmt";

export const Route = createFileRoute("/profile/help")({
  component: FaqScreen,
  head: () => ({ meta: [{ title: "FAQ · CMT" }] }),
});

const FAQS = [
  {
    q: "How does authorization work?",
    a: "Your health plan, PT-1, or transportation broker authorizes eligible rides. Keep your member ID or authorization number handy when you book.",
  },
  {
    q: "What if I need to cancel?",
    a: `Open the ride and choose Cancel Ride. If your pickup is soon, please also call CMT at ${CMT.phone} so we can notify your driver.`,
  },
  {
    q: "Can someone ride with me?",
    a: "Yes. Toggle the companion/escort option when you book. Let us know if they also need mobility assistance.",
  },
  {
    q: "Do you provide wheelchair transportation?",
    a: "Yes. Select Wheelchair or Walker/Cane Assistance when you book so we send the right vehicle.",
  },
  {
    q: "What areas do you serve?",
    a: "CMT is based in Spencer, MA and serves clients through MassHealth/PT-1 and approved transportation broker programs.",
  },
  {
    q: "How do I message dispatch about a ride?",
    a: "Open Support and tap the booking ID for that trip. Each ride has its own chat thread.",
  },
];

function FaqScreen() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <AppShell>
      <ScreenHeader title="FAQ" backTo="/profile" />
      <div className="p-4 pb-8">
        <p className="text-sm leading-relaxed text-[#5C6B7A]">
          Common questions about booking, coverage, and ride support.
        </p>

        <ul className="cmt-card mt-4 overflow-hidden">
          {FAQS.map((f, i) => (
            <li key={f.q} className="border-b border-[#eef1f6] last:border-b-0">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-3 p-4 text-left"
              >
                <span className="text-sm font-bold text-[#032558]">{f.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[#0a6bdb] transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
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
    </AppShell>
  );
}
