import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcButton } from "@/components/arc/Button";
import { getAppointment } from "@/lib/appointments-data";

export const Route = createFileRoute("/appointments/$id/reschedule")({
  component: Reschedule,
  notFoundComponent: () => (
    <AppShell>
      <div className="p-6">Not found.</div>
    </AppShell>
  ),
  errorComponent: () => (
    <AppShell>
      <div className="p-6">Error.</div>
    </AppShell>
  ),
});

function Reschedule() {
  const { id } = Route.useParams();
  const appointment = getAppointment(id);
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  if (!appointment)
    return (
      <AppShell>
        <div className="p-6">Not found.</div>
      </AppShell>
    );

  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      key: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString(undefined, { weekday: "short" }),
      num: d.getDate(),
    };
  });
  const times = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

  return (
    <AppShell>
      <ScreenHeader title="Reschedule Ride" backTo="/appointments/$id" />
      <div className="px-4 pb-32 pt-4">
        <p className="text-sm text-[#5C6B7A]">
          Rescheduling: <span className="font-bold text-[#032558]">{appointment.serviceName}</span>
        </p>

        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#5C6B7A]">New Date</p>
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {days.map((d) => {
            const sel = date === d.key;
            return (
              <button
                key={d.key}
                onClick={() => setDate(d.key)}
                className={`flex h-20 w-16 flex-none flex-col items-center justify-center rounded-2xl ${
                  sel ? "bg-[#0a6bdb] text-white" : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                  {d.day}
                </span>
                <span className="text-2xl font-extrabold leading-none">{d.num}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#5C6B7A]">New Time</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {times.map((t) => {
            const sel = time === t;
            return (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`h-11 rounded-xl text-xs font-bold ${
                  sel ? "bg-[#032558] text-white" : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-[#5C6B7A]">
          Reason for reschedule (optional)
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="Tell us why you need a new time…"
          className="mt-2 w-full resize-none rounded-xl bg-[#eef1f6] p-4 text-sm text-[#032558] focus:outline-none"
        />
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-[#dce3ec] bg-white p-4">
        <ArcButton block disabled={!date || !time} onClick={() => navigate({ to: "/appointments" })}>
          Confirm Reschedule
        </ArcButton>
      </div>
    </AppShell>
  );
}
