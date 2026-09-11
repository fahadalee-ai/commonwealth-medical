import { createFileRoute } from "@tanstack/react-router";
import { Bell, CarFront, CheckCircle2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
  head: () => ({ meta: [{ title: "Notifications · CMT" }] }),
});

const items = [
  {
    icon: CarFront,
    title: "Driver en route — Wellspring Medical Center",
    time: "Today · 8:42 AM",
    unread: true,
  },
  {
    icon: Bell,
    title: "Ride reminder: Tuesday 9:30 AM pickup",
    time: "Yesterday",
    unread: true,
  },
  {
    icon: ShieldCheck,
    title: "Authorization confirmed for PT-1 trip CMT-8842-KL",
    time: "2d ago",
    unread: false,
  },
  {
    icon: CheckCircle2,
    title: "Ride completed — UMass Memorial Medical Center",
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
            className={`flex items-start gap-3 border-b border-[#eef1f6] bg-white p-4 ${
              n.unread ? "border-l-4 border-l-[#0a6bdb]" : ""
            }`}
          >
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#0a6bdb]/10 text-[#0a6bdb]">
              <n.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-snug text-[#032558]">{n.title}</p>
              <p className="mt-1 text-xs text-[#5C6B7A]">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
