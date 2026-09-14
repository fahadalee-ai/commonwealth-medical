import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ALL_APPOINTMENTS } from "@/lib/appointments-data";
import { getLastMessage } from "@/lib/chat-store";

export const Route = createFileRoute("/support/")({
  component: SupportInbox,
  head: () => ({ meta: [{ title: "Messages · CMT" }] }),
});

function SupportInbox() {
  return (
    <AppShell>
      <ScreenHeader title="Messages" />
      <div className="px-4 pb-8 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5C6B7A]">
          Direct messages
        </p>
        <p className="mt-1 text-sm text-[#5C6B7A]">Chats are grouped by booking ID.</p>

        <div className="cmt-card mt-4 overflow-hidden">
          {ALL_APPOINTMENTS.map((ride, index) => {
            const last = getLastMessage(ride.id);
            return (
              <Link
                key={ride.id}
                to="/support/$bookingId"
                params={{ bookingId: ride.id }}
                className={`flex min-h-[76px] items-center gap-3 px-4 py-3 ${
                  index < ALL_APPOINTMENTS.length - 1 ? "border-b border-[#eef1f6]" : ""
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#0a6bdb]/10 text-[#0a6bdb]">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-extrabold text-[#032558]">{ride.reference}</p>
                    <p className="shrink-0 text-[11px] font-semibold text-[#5C6B7A]">{last?.time}</p>
                  </div>
                  <p className="mt-0.5 truncate text-xs font-semibold text-[#0a6bdb]">{ride.destination}</p>
                  <p className="mt-0.5 truncate text-xs text-[#5C6B7A]">{last?.text}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#5C6B7A]" />
              </Link>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </AppShell>
  );
}
