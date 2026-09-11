import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Share2, Mail } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { StatusBadge } from "@/components/arc/StatusBadge";
import { Logo } from "@/components/arc/Logo";
import { ArcButton } from "@/components/arc/Button";
import { getAppointment } from "@/lib/appointments-data";
import { CMT } from "@/lib/cmt";

export const Route = createFileRoute("/appointments/$id/receipt")({
  component: RideReceipt,
  head: () => ({ meta: [{ title: "Receipt · CMT" }] }),
});

function RideReceipt() {
  const { id } = Route.useParams();
  const ride = getAppointment(id);

  if (!ride) {
    return (
      <AppShell>
        <ScreenHeader title="Receipt" backTo="/appointments" />
        <p className="p-6 text-sm text-[#5C6B7A]">Receipt not found.</p>
      </AppShell>
    );
  }

  const rows = [
    { label: "Ride ID", value: ride.reference },
    { label: "Service", value: ride.serviceName },
    { label: "Date & time", value: ride.date },
    { label: "Pickup", value: ride.pickup },
    { label: "Destination", value: ride.destination },
    { label: "Passenger", value: "Alex Rivera" },
    { label: "Coverage", value: "MassHealth / PT-1" },
    { label: "Authorization", value: ride.reference.replace("CMT-", "AUTH-") },
    { label: "Driver", value: ride.driver ?? "Assigned at dispatch" },
    { label: "Vehicle", value: ride.vehicle ?? "CMT sedan" },
    { label: "Passenger cost", value: "$0.00" },
  ];

  const share = async () => {
    const text = `CMT Ride Receipt ${ride.reference}\n${ride.date}\n${ride.pickup} → ${ride.destination}`;
    if (navigator.share) {
      await navigator.share({ title: "CMT Ride Receipt", text });
      return;
    }
    await navigator.clipboard?.writeText(text);
  };

  return (
    <AppShell>
      <ScreenHeader title="View Receipt" backTo="/appointments" />
      <div className="px-4 pb-8 pt-4">
        <div className="overflow-hidden bg-white shadow-[0_8px_24px_rgba(3,37,88,0.06)]">
          <div className="bg-[#032558] px-4 py-5 text-white">
            <Logo variant="white" size={180} />
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                  Trip receipt
                </p>
                <p className="mt-1 text-lg font-extrabold">{ride.reference}</p>
              </div>
              <StatusBadge status={ride.status} />
            </div>
          </div>

          <div className="divide-y divide-[#eef1f6]">
            {rows.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#5C6B7A]">
                  {row.label}
                </p>
                <p className="max-w-[60%] text-right text-sm font-semibold text-[#032558]">
                  {row.value}
                </p>
              </div>
            ))}
          </div>

          <p className="border-t border-[#eef1f6] px-4 py-4 text-xs leading-relaxed text-[#5C6B7A]">
            Eligible transportation authorized by your health plan, PT-1, or transportation broker.
            Questions: {CMT.phone} · {CMT.email}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#0a6bdb] text-sm font-semibold text-white"
          >
            <Download className="h-4 w-4" /> Download
          </button>
          <button
            type="button"
            onClick={() => void share()}
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#dce3ec] bg-white text-sm font-semibold text-[#032558]"
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
        <a
          href={`mailto:${CMT.email}?subject=${encodeURIComponent(`Receipt ${ride.reference}`)}`}
          className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#F5F7FA] text-sm font-semibold text-[#032558]"
        >
          <Mail className="h-4 w-4" /> Email receipt
        </a>

        <Link to="/appointments" className="mt-3 block">
          <ArcButton block variant="ghost">
            Back to rides
          </ArcButton>
        </Link>
      </div>
    </AppShell>
  );
}
