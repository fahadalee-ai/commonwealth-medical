import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcButton } from "@/components/arc/Button";
import { getAppointment } from "@/lib/appointments-data";

export const Route = createFileRoute("/appointments/$id/cancel")({
  component: CancelAppt,
  notFoundComponent: () => <AppShell><div className="p-6">Not found.</div></AppShell>,
  errorComponent: () => <AppShell><div className="p-6">Error.</div></AppShell>,
});

const REASONS = ["Change of plans", "Found another provider", "Price", "Other"];

function CancelAppt() {
  const { id } = Route.useParams();
  const appointment = getAppointment(id);
  if (!appointment) return <AppShell><div className="p-6">Not found.</div></AppShell>;
  const [reason, setReason] = useState<string>("");
  const [other, setOther] = useState("");
  const navigate = useNavigate();

  return (
    <AppShell>
      <ScreenHeader title="Cancel Appointment" backTo="/appointments/$id" />
      <div className="px-4 pb-32 pt-6">
        <div className="flex items-center gap-3 border border-[#E31E24] bg-[#161616] p-4">
          <AlertTriangle className="h-5 w-5 text-[#E31E24]" />
          <p className="text-xs text-white">
            Cancelling <span className="font-bold">{appointment.serviceName}</span>. This action can&apos;t be undone.
          </p>
        </div>

        <h2 className="mt-6 text-xl font-extrabold tracking-tight">Cancel Appointment?</h2>
        <p className="mt-2 text-xs text-[#8A8A8A]">
          Let us know why so we can improve our service.
        </p>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-[#8A8A8A]">
          Reason for cancellation
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-2 h-12 w-full border border-[#2A2A2A] bg-[#161616] px-4 text-sm text-white focus:border-[#FFC107] focus:outline-none"
        >
          <option value="">Select a reason</option>
          {REASONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        {reason === "Other" && (
          <textarea
            value={other}
            onChange={(e) => setOther(e.target.value)}
            rows={3}
            placeholder="Please explain…"
            className="mt-3 w-full resize-none border border-[#2A2A2A] bg-[#161616] p-4 text-sm text-white placeholder:text-[#5a5a5a] focus:border-[#FFC107] focus:outline-none"
          />
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[420px] -translate-x-1/2 flex-col gap-2 border-t border-[#2A2A2A] bg-[#0D0D0D] p-4">
        <ArcButton
          block
          disabled={!reason || (reason === "Other" && !other.trim())}
          onClick={() => navigate({ to: "/appointments" })}
        >
          Confirm Cancellation
        </ArcButton>
        <ArcButton variant="secondary" block onClick={() => navigate({ to: "/appointments/$id", params: { id: appointment.id } })}>
          Go Back
        </ArcButton>
      </div>
    </AppShell>
  );
}