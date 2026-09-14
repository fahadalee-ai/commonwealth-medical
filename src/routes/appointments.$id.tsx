import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, User as UserIcon } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcButton } from "@/components/arc/Button";
import { StatusBadge } from "@/components/arc/StatusBadge";
import { getAppointment } from "@/lib/appointments-data";
import { CMT } from "@/lib/cmt";

export const Route = createFileRoute("/appointments/$id")({
  component: RideDetail,
  notFoundComponent: () => (
    <AppShell>
      <div className="p-6">Ride not found.</div>
    </AppShell>
  ),
  errorComponent: () => (
    <AppShell>
      <div className="p-6">Something went wrong.</div>
    </AppShell>
  ),
});

function RideDetail() {
  const { id } = Route.useParams();
  const a = getAppointment(id);
  if (!a)
    return (
      <AppShell>
        <div className="p-6">Not found.</div>
      </AppShell>
    );
  const isActive = a.status === "Confirmed" || a.status === "En Route" || a.status === "Arrived";

  return (
    <AppShell>
      <ScreenHeader title={a.serviceName} backTo="/appointments" />
      <div className="px-4 pb-40 pt-4">
        <StatusBadge status={a.status} />

        <div className="mt-4 flex flex-col gap-3">
          <InfoRow label="Date & Time" value={a.date} />
          <div className="cmt-card overflow-hidden">
            <div className="p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#5C6B7A]">
                Route
              </p>
              <p className="mt-1 flex items-start gap-2 text-sm text-[#032558]">
                <MapPin className="mt-0.5 h-4 w-4 text-[#0a6bdb]" />
                {a.pickup} → {a.destination}
              </p>
            </div>
            <img
              alt="Map preview"
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=70"
              className="h-32 w-full object-cover"
            />
          </div>

          {a.notes && <InfoRow label="Notes" value={a.notes} />}
          <InfoRow label="Ride ID" value={a.reference} highlight />
          {a.driver && (
            <div className="cmt-card flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a6bdb]/10 text-[#0a6bdb]">
                <UserIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#5C6B7A]">
                  Assigned Driver
                </p>
                <p className="mt-0.5 text-sm font-bold text-[#032558]">{a.driver}</p>
              </div>
              <a
                href={`tel:${CMT.phoneTel}`}
                className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#0a6bdb] text-[#0a6bdb]"
                aria-label="Call"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[420px] -translate-x-1/2 flex-col gap-2 border-t border-[#dce3ec] bg-white p-4">
        {isActive && (
          <Link to="/appointments/$id/cancel" params={{ id: a.id }}>
            <ArcButton variant="danger" block>
              Cancel
            </ArcButton>
          </Link>
        )}
        <Link to="/appointments/$id/receipt" params={{ id: a.id }}>
          <ArcButton variant="secondary" block>
            View Receipt
          </ArcButton>
        </Link>
        <Link to="/support/$bookingId" params={{ bookingId: a.id }}>
          <ArcButton variant="ghost" block>
            Message about this ride
          </ArcButton>
        </Link>
      </div>
    </AppShell>
  );
}

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="cmt-card p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#5C6B7A]">{label}</p>
      <p className={`mt-1 text-sm ${highlight ? "font-extrabold text-[#0a6bdb]" : "text-[#032558]"}`}>
        {value}
      </p>
    </div>
  );
}
