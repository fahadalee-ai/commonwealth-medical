import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, User as UserIcon } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcButton } from "@/components/arc/Button";
import { getAppointment, statusColor } from "@/lib/appointments-data";

export const Route = createFileRoute("/appointments/$id")({
  component: AppointmentDetail,
  notFoundComponent: () => (
    <AppShell>
      <div className="p-6">Appointment not found.</div>
    </AppShell>
  ),
  errorComponent: () => (
    <AppShell>
      <div className="p-6">Something went wrong.</div>
    </AppShell>
  ),
});

function AppointmentDetail() {
  const { id } = Route.useParams();
  const a = getAppointment(id);
  if (!a) return <AppShell><div className="p-6">Not found.</div></AppShell>;
  const isActive = a.status === "Approved" || a.status === "Pending" || a.status === "Rescheduled";

  return (
    <AppShell>
      <ScreenHeader title={a.serviceName} backTo="/appointments" />
      <div className="px-4 pb-40 pt-4">
        <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${statusColor(a.status)}`}>
          {a.status}
        </span>

        <div className="mt-4 flex flex-col gap-3">
          <InfoRow label="Date & Time" value={a.date} />
          <div className="border border-[#2A2A2A] bg-[#161616]">
            <div className="p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">
                Service Address
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-white">
                <MapPin className="h-4 w-4 text-[#FFC107]" />
                {a.address}
              </p>
            </div>
            <div className="h-32 w-full border-t border-[#2A2A2A]">
              <img
                alt="Map preview"
                src="https://maps.geoapify.com/v1/staticmap?style=dark-matter-brown&width=800&height=300&center=lonlat:-72.5806,42.1015&zoom=13&marker=lonlat:-72.5806,42.1015;color:%23E31E24;size:medium&apiKey=demo"
                className="h-full w-full object-cover opacity-90"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </div>

          {a.notes && <InfoRow label="Notes" value={a.notes} />}
          <InfoRow label="Booking Reference" value={a.reference} highlight />
          {a.technician && (
            <div className="flex items-center gap-3 border border-[#2A2A2A] bg-[#161616] p-4">
              <div className="flex h-10 w-10 items-center justify-center border border-[#2A2A2A] text-[#FFC107]">
                <UserIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">
                  Assigned Technician
                </p>
                <p className="mt-0.5 text-sm font-bold">{a.technician}</p>
              </div>
              <button className="ml-auto flex h-9 w-9 items-center justify-center border border-[#FFC107] text-[#FFC107]" aria-label="Call">
                <Phone className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[420px] -translate-x-1/2 flex-col gap-2 border-t border-[#2A2A2A] bg-[#0D0D0D] p-4">
        {isActive && (
          <div className="flex gap-2">
            <Link
              to="/appointments/$id/reschedule"
              params={{ id: a.id }}
              className="flex-1"
            >
              <ArcButton variant="secondary" block>
                Reschedule
              </ArcButton>
            </Link>
            <Link
              to="/appointments/$id/cancel"
              params={{ id: a.id }}
              className="flex-1"
            >
              <ArcButton variant="outlineRed" block>
                Cancel
              </ArcButton>
            </Link>
          </div>
        )}
        <Link to="/profile/help">
          <ArcButton variant="outlineYellow" block>
            Contact Support
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
    <div className="border border-[#2A2A2A] bg-[#161616] p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">
        {label}
      </p>
      <p className={`mt-1 text-sm ${highlight ? "font-extrabold text-[#FFC107]" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}