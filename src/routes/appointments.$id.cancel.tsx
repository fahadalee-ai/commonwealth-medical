import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcButton } from "@/components/arc/Button";
import { getAppointment } from "@/lib/appointments-data";

export const Route = createFileRoute("/appointments/$id/cancel")({
  component: CancelRide,
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

const REASONS = [
  "Appointment was cancelled or moved",
  "No longer need transportation",
  "Booked the wrong time",
  "Other",
];

function CancelRide() {
  const { id } = Route.useParams();
  const appointment = getAppointment(id);
  const [reason, setReason] = useState("");
  const [reasonOpen, setReasonOpen] = useState(false);
  const [other, setOther] = useState("");
  const navigate = useNavigate();

  if (!appointment)
    return (
      <AppShell>
        <div className="p-6">Not found.</div>
      </AppShell>
    );

  return (
    <AppShell>
      <ScreenHeader title="Cancel Ride" backTo="/appointments/$id" />
      <div className="px-4 pb-32 pt-6">
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <p className="text-sm text-[#032558]">
            Cancelling <span className="font-bold">{appointment.serviceName}</span>. Please also
            notify CMT if pickup is within two hours.
          </p>
        </div>

        <h2 className="mt-6 text-xl font-extrabold tracking-tight text-[#032558]">
          Cancel this ride?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#5C6B7A]">
          Your health plan or broker may need to be updated if the appointment time changed.
        </p>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-[#5C6B7A]">
          Reason for cancellation
        </p>
        <div className="relative mt-2">
          <button
            type="button"
            onClick={() => setReasonOpen((o) => !o)}
            className="flex h-14 w-full items-center justify-between bg-[#eef1f6] px-4 text-left text-sm text-[#032558]"
          >
            <span className={reason ? "text-[#032558]" : "text-[#5C6B7A]"}>
              {reason || "Select a reason"}
            </span>
            <ChevronDown className={`h-4 w-4 text-[#5C6B7A] ${reasonOpen ? "rotate-180" : ""}`} />
          </button>
          {reasonOpen && (
            <ul className="absolute left-0 right-0 z-20 mt-1 border border-[#dce3ec] bg-white shadow-[0_8px_24px_rgba(3,37,88,0.12)]">
              {REASONS.map((r) => (
                <li key={r}>
                  <button
                    type="button"
                    onClick={() => {
                      setReason(r);
                      setReasonOpen(false);
                    }}
                    className={`flex min-h-12 w-full items-center px-4 text-left text-sm ${
                      reason === r ? "bg-[#0a6bdb] font-semibold text-white" : "text-[#032558]"
                    }`}
                  >
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {reason === "Other" && (
          <textarea
            value={other}
            onChange={(e) => setOther(e.target.value)}
            rows={3}
            placeholder="Please explain…"
            className="mt-3 w-full resize-none rounded-xl bg-[#eef1f6] p-4 text-sm text-[#032558] focus:outline-none"
          />
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[420px] -translate-x-1/2 flex-col gap-2 border-t border-[#dce3ec] bg-white p-4">
        <ArcButton
          block
          disabled={!reason || (reason === "Other" && !other.trim())}
          onClick={() => navigate({ to: "/appointments" })}
        >
          Confirm Cancellation
        </ArcButton>
        <ArcButton
          variant="secondary"
          block
          onClick={() => navigate({ to: "/appointments/$id", params: { id: appointment.id } })}
        >
          Go Back
        </ArcButton>
      </div>
    </AppShell>
  );
}
