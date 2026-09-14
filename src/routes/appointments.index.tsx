import { createFileRoute, Link } from "@tanstack/react-router";
import { CarFront } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { StatusBadge } from "@/components/arc/StatusBadge";
import { ArcButton } from "@/components/arc/Button";
import { ALL_APPOINTMENTS, type Appointment } from "@/lib/appointments-data";
import { bookingStore, type RideType } from "@/lib/booking-store";

export const Route = createFileRoute("/appointments/")({
  component: RideHistory,
  head: () => ({ meta: [{ title: "Ride History · CMT" }] }),
});

function RideHistory() {
  const grouped = ALL_APPOINTMENTS.reduce<Record<string, Appointment[]>>((acc, ride) => {
    acc[ride.month] = acc[ride.month] ? [...acc[ride.month], ride] : [ride];
    return acc;
  }, {});

  return (
    <AppShell>
      <ScreenHeader title="Rides" />
      <div className="px-4 pb-4 pt-2">
        {ALL_APPOINTMENTS.length === 0 ? (
          <div className="cmt-card mt-10 px-6 py-12 text-center">
            <CarFront className="mx-auto h-10 w-10 text-[#0a6bdb]" />
            <p className="mt-3 text-lg font-bold text-[#032558]">No rides yet</p>
            <p className="mt-1 text-sm text-[#5C6B7A]">
              Book your first ride to a medical appointment or approved destination.
            </p>
            <Link to="/book" className="mt-5 inline-block w-full">
              <ArcButton block>Book Your First Ride</ArcButton>
            </Link>
          </div>
        ) : (
          Object.entries(grouped).map(([month, rides]) => (
            <section key={month} className="mb-6">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#5C6B7A]">
                {month}
              </h2>
              <div className="flex flex-col gap-3">
                {rides.map((ride) => (
                  <RideCard key={ride.id} ride={ride} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
      <BottomNav />
    </AppShell>
  );
}

function RideCard({ ride }: { ride: Appointment }) {
  return (
    <div className="cmt-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[15px] font-extrabold text-[#032558]">{ride.serviceName}</p>
          <p className="mt-1 text-xs text-[#5C6B7A]">{ride.date}</p>
        </div>
        <StatusBadge status={ride.status} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#5C6B7A]">
        {ride.pickup} → {ride.destination}
      </p>
      <div className="mt-4 flex gap-2">
        <Link
          to="/book"
          onClick={() =>
            bookingStore.set({
              rideType: ride.serviceId as RideType,
              dropoff: ride.destination,
              dropoffLabel: ride.destination,
            })
          }
          className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl bg-[#0a6bdb] text-xs font-semibold text-white"
        >
          Rebook
        </Link>
        <Link
          to="/appointments/$id/receipt"
          params={{ id: ride.id }}
          className="inline-flex min-h-10 flex-1 items-center justify-center border border-[#dce3ec] text-xs font-semibold text-[#032558]"
        >
          View Receipt
        </Link>
      </div>
    </div>
  );
}
