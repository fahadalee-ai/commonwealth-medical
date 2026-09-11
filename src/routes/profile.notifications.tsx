import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";

export const Route = createFileRoute("/profile/notifications")({
  component: NotifPrefs,
});

const PREFS = [
  { key: "reminders", label: "Ride reminders", desc: "Day-before and same-day pickup reminders." },
  { key: "arrival", label: "Driver arrival alerts", desc: "When your driver is en route or has arrived." },
  { key: "auth", label: "Authorization updates", desc: "Coverage and PT-1 status changes." },
  { key: "completed", label: "Trip completed", desc: "Receipts and follow-up after a ride." },
];

function NotifPrefs() {
  const [on, setOn] = useState<Record<string, boolean>>({
    reminders: true,
    arrival: true,
    auth: true,
    completed: false,
  });
  return (
    <AppShell>
      <ScreenHeader title="Notifications" backTo="/profile" />
      <ul>
        {PREFS.map((p) => (
          <li key={p.key} className="flex items-center justify-between gap-4 border-b border-[#eef1f6] bg-white p-4">
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#032558]">{p.label}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-[#5C6B7A]">{p.desc}</p>
            </div>
            <button
              onClick={() => setOn((s) => ({ ...s, [p.key]: !s[p.key] }))}
              className={`flex h-7 w-12 flex-none items-center rounded-full p-0.5 ${
                on[p.key] ? "justify-end bg-[#0a6bdb]" : "justify-start bg-[#dce3ec]"
              }`}
              aria-label={`Toggle ${p.label}`}
            >
              <span className="h-6 w-6 rounded-full bg-white shadow" />
            </button>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
