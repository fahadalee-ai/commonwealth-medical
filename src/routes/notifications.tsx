import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CalendarClock, Bell, XCircle, Star } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
  head: () => ({ meta: [{ title: "Notifications · ARC" }] }),
});

const items = [
  {
    icon: CheckCircle2,
    color: "text-[#FFC107]",
    title: "Booking Approved — Generator Installation",
    time: "2h ago",
    unread: true,
  },
  {
    icon: CalendarClock,
    color: "text-[#E31E24]",
    title: "Booking Rescheduled — Lighting Installation",
    time: "Yesterday",
    unread: true,
  },
  {
    icon: Bell,
    color: "text-white",
    title: "Reminder: Panel Upgrade tomorrow at 10:00 AM",
    time: "1d ago",
    unread: true,
  },
  {
    icon: XCircle,
    color: "text-[#E31E24]",
    title: "Booking Cancelled — Data Cable Installation",
    time: "3d ago",
    unread: false,
  },
  {
    icon: Star,
    color: "text-[#FFC107]",
    title: "Service Completed — Rate your experience",
    time: "1w ago",
    unread: false,
  },
];

function Notifications() {
  return (
    <AppShell>
      <ScreenHeader title="Notifications" backTo="/home" />
      <ul>
        {items.map((n, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 border-b border-[#2A2A2A] p-4 ${n.unread ? "border-l-2 border-l-[#E31E24]" : ""}`}
          >
            <div className="flex h-10 w-10 flex-none items-center justify-center border border-[#2A2A2A] bg-[#161616]">
              <n.icon className={`h-5 w-5 ${n.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-snug">{n.title}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-[#8A8A8A]">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}