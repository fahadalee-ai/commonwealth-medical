import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, Star } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcButton } from "@/components/arc/Button";
import { getAppointment } from "@/lib/appointments-data";
import { CMT } from "@/lib/cmt";

export const Route = createFileRoute("/track/$id")({
  component: TrackRide,
});

const TIMELINE = ["Ride Confirmed", "Driver En Route", "Arrived", "In Progress", "Completed"] as const;

function TrackRide() {
  const { id } = Route.useParams();
  const ride = getAppointment(id) ?? getAppointment("ride_1001");
  const [active] = useState(1);
  const [cancelOpen, setCancelOpen] = useState(false);
  const navigate = useNavigate();

  if (!ride) {
    return (
      <AppShell>
        <ScreenHeader title="Track Ride" backTo="/home" />
        <p className="p-6 text-sm text-[#5C6B7A]">Ride not found.</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <ScreenHeader title="Live Tracking" backTo="/home" />
      <div className="relative h-52 w-full overflow-hidden bg-[#e8eef6]">
        <img
          alt="Live map"
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=70"
          className="h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3 z-10 bg-[#032558] px-3 py-1.5 text-xs font-bold text-white">
          ETA 12 min
        </div>
      </div>

      <div className="space-y-3 px-4 pb-10 pt-4">
        <div className="cmt-card p-4">
          <div className="flex items-center gap-3">
            <img
              src={
                ride.driverPhoto ??
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
              }
              alt=""
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#032558]">{ride.driver ?? "Marcus D."}</p>
              <p className="text-xs text-[#5C6B7A]">
                {ride.vehicle ?? "2023 Toyota Camry · White"} · {ride.plate ?? "CMT 3789"}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-[#032558]">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {ride.rating ?? 4.9}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href={`tel:${CMT.phoneTel}`}>
              <ArcButton block variant="secondary">
                <Phone className="h-4 w-4" /> Call Driver
              </ArcButton>
            </a>
            <Link to="/support">
              <ArcButton block variant="secondary">
                <MessageCircle className="h-4 w-4" /> Message
              </ArcButton>
            </Link>
          </div>
        </div>

        <div className="cmt-card mt-4 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#5C6B7A]">Status</p>
          <ol className="mt-3 space-y-3">
            {TIMELINE.map((label, i) => {
              const done = i <= active;
              return (
                <li key={label} className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                      done ? "bg-[#0a6bdb] text-white" : "bg-[#eef1f6] text-[#5C6B7A]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className={`text-sm font-semibold ${done ? "text-[#032558]" : "text-[#5C6B7A]"}`}>
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <button
          onClick={() => setCancelOpen(true)}
          className="mt-5 w-full min-h-11 text-sm font-semibold text-red-600"
        >
          Cancel Ride
        </button>
      </div>

      {cancelOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="w-full max-w-[420px] rounded-t-3xl bg-white p-5">
            <h3 className="text-lg font-extrabold text-[#032558]">Cancel this ride?</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5C6B7A]">
              Cancellations within 2 hours of pickup may require broker approval. Please contact
              CMT if your appointment time has changed.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <ArcButton
                block
                variant="danger"
                onClick={() => navigate({ to: "/appointments/$id/cancel", params: { id: ride.id } })}
              >
                Yes, cancel ride
              </ArcButton>
              <ArcButton block variant="secondary" onClick={() => setCancelOpen(false)}>
                Keep ride
              </ArcButton>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
