import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcButton } from "@/components/arc/Button";
import { UPCOMING, PAST, CANCELLED, statusColor, type Appointment } from "@/lib/appointments-data";

export const Route = createFileRoute("/appointments/")({
  component: AppointmentsList,
  head: () => ({ meta: [{ title: "My Appointments · ARC" }] }),
});

type Tab = "Upcoming" | "Past" | "Cancelled";

function AppointmentsList() {
  const [tab, setTab] = useState<Tab>("Upcoming");
  const list =
    tab === "Upcoming" ? UPCOMING : tab === "Past" ? PAST : CANCELLED;

  return (
    <AppShell>
      <ScreenHeader title="My Appointments" />

      <div className="flex border-b border-[#2A2A2A]">
        {(["Upcoming", "Past", "Cancelled"] as Tab[]).map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative flex-1 py-3 text-xs font-bold uppercase tracking-widest ${active ? "text-white" : "text-[#8A8A8A]"}`}
            >
              {t}
              {active && (
                <span className="absolute -bottom-px left-0 right-0 mx-auto h-0.5 w-10 bg-[#E31E24]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 p-4">
        {list.length === 0 && (
          <p className="py-12 text-center text-sm text-[#8A8A8A]">
            Nothing here yet.
          </p>
        )}
        {list.map((apt) => (
          <ApptCard key={apt.id} apt={apt} tab={tab} />
        ))}
      </div>

      <BottomNav />
    </AppShell>
  );
}

function ApptCard({ apt, tab }: { apt: Appointment; tab: Tab }) {
  return (
    <div className="border border-[#2A2A2A] bg-[#161616]">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-extrabold leading-tight">{apt.serviceName}</p>
            <p className="mt-1 text-xs text-[#8A8A8A]">{apt.date}</p>
          </div>
          <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${statusColor(apt.status)}`}>
            {apt.status}
          </span>
        </div>
        <p className="mt-3 truncate text-xs text-[#8A8A8A]">{apt.address}</p>
        {tab === "Cancelled" && apt.cancelReason && (
          <p className="mt-2 text-xs italic text-[#8A8A8A]">
            Reason: {apt.cancelReason}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-[#2A2A2A] p-3">
        {tab === "Upcoming" ? (
          <div className="flex gap-2">
            <Link
              to="/appointments/$id/reschedule"
              params={{ id: apt.id }}
              className="border border-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
            >
              Reschedule
            </Link>
            <Link
              to="/appointments/$id/cancel"
              params={{ id: apt.id }}
              className="border border-[#E31E24] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E31E24]"
            >
              Cancel
            </Link>
          </div>
        ) : tab === "Past" ? (
          <Link
            to="/book"
            className="border border-[#FFC107] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#FFC107]"
          >
            Book Again
          </Link>
        ) : (
          <div />
        )}
        <Link
          to="/appointments/$id"
          params={{ id: apt.id }}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white"
        >
          View Details <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

// intentionally unused import guard
export const _tokens = { ArcButton };