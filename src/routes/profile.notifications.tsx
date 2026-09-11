import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";

export const Route = createFileRoute("/profile/notifications")({
  component: NotifPrefs,
});

const PREFS = [
  { key: "confirmations", label: "Booking confirmations", desc: "When a booking is approved or updated." },
  { key: "reminders", label: "Appointment reminders", desc: "Day-before and same-day reminders." },
  { key: "promos", label: "Promotions & offers", desc: "Occasional discounts and seasonal deals." },
  { key: "completed", label: "Service completion", desc: "Prompts to rate finished jobs." },
];

function NotifPrefs() {
  const [on, setOn] = useState<Record<string, boolean>>({
    confirmations: true, reminders: true, promos: false, completed: true,
  });
  return (
    <AppShell>
      <ScreenHeader title="Notifications" backTo="/profile" />
      <ul>
        {PREFS.map((p) => (
          <li key={p.key} className="flex items-center justify-between gap-4 border-b border-[#2A2A2A] p-4">
            <div className="min-w-0">
              <p className="text-sm font-bold">{p.label}</p>
              <p className="mt-0.5 text-xs text-[#8A8A8A]">{p.desc}</p>
            </div>
            <button
              onClick={() => setOn((s) => ({ ...s, [p.key]: !s[p.key] }))}
              className={`flex h-6 w-11 flex-none items-center p-0.5 ${on[p.key] ? "justify-end bg-[#E31E24]" : "justify-start bg-[#2A2A2A]"}`}
              aria-label={`Toggle ${p.label}`}
            >
              <span className="h-5 w-5 bg-white" />
            </button>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}