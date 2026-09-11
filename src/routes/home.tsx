import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  CarFront,
  Heart,
  ShieldCheck,
  Clock,
  Timer,
  User,
} from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { StatusBadge } from "@/components/arc/StatusBadge";
import { PAST, UPCOMING } from "@/lib/appointments-data";
import { SERVICES } from "@/lib/services-data";
import { getFirstName } from "@/lib/cmt";
import { bookingStore, type RideType } from "@/lib/booking-store";

export const Route = createFileRoute("/home")({
  component: HomeScreen,
  head: () => ({
    meta: [
      { title: "Home · CMT" },
      { name: "description", content: "Book and manage non-emergency medical transportation." },
    ],
  }),
});

const why = [
  { icon: Heart, title: "Compassionate", desc: "Every passenger treated with dignity and respect" },
  { icon: ShieldCheck, title: "Reliable", desc: "Dependable transportation you can count on" },
  { icon: Clock, title: "Safe", desc: "Focused on passenger safety and comfort" },
  { icon: Timer, title: "Punctual", desc: "Getting to appointments on time matters" },
];

function HomeScreen() {
  const upcoming = UPCOMING[0];
  const [firstName, setFirstName] = useState("Alex");
  useEffect(() => {
    setFirstName(getFirstName());
  }, []);

  return (
    <AppShell>
      <div className="bg-[#032558] px-5 pb-7 pt-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/70">Good to see you</p>
            <h1 className="text-2xl font-extrabold tracking-tight">Hi, {firstName} 👋</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative flex h-11 w-11 items-center justify-center bg-white/10"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 bg-[#0a6bdb]" />
            </Link>
            <Link
              to="/profile"
              aria-label="Profile"
              className="flex h-11 w-11 items-center justify-center bg-white/10"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <Link
          to="/book"
          className="mt-5 flex min-h-16 items-center justify-center gap-3 bg-[#0a6bdb] text-lg font-bold shadow-[0_10px_24px_rgba(10,107,219,0.35)] active:scale-[0.98]"
        >
          <CarFront className="h-6 w-6" />
          Book a Ride
        </Link>
      </div>

      <div className="px-4 pt-5">
        {upcoming && (
          <div className="cmt-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#5C6B7A]">
                  Upcoming Appointment
                </p>
                <p className="mt-1 text-base font-bold text-[#032558]">{upcoming.date}</p>
              </div>
              <StatusBadge status={upcoming.status} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#5C6B7A]">
              {upcoming.pickup} → {upcoming.destination}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                to="/track/$id"
                params={{ id: upcoming.id }}
                className="inline-flex min-h-11 items-center justify-center bg-[#0a6bdb] text-sm font-semibold text-white"
              >
                Track
              </Link>
              <Link
                to="/appointments/$id"
                params={{ id: upcoming.id }}
                className="inline-flex min-h-11 items-center justify-center border border-[#dce3ec] bg-white text-sm font-semibold text-[#032558]"
              >
                View Details
              </Link>
            </div>
          </div>
        )}

        <div className="mt-7 flex items-end justify-between">
          <h2 className="text-base font-bold text-[#032558]">Our Services</h2>
          <Link to="/services" className="text-sm font-semibold text-[#0a6bdb]">
            See all
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              to="/services/$serviceId"
              params={{ serviceId: s.id }}
              className="group relative block h-[168px] overflow-hidden bg-[#032558] shadow-[0_10px_24px_rgba(3,37,88,0.12)]"
            >
              <img
                src={s.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#032558] via-[#032558]/45 to-black/10" />
              <div className="absolute left-0 top-0 h-full w-1 bg-[#0a6bdb]" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <span className="inline-flex h-8 w-8 items-center justify-center bg-[#0a6bdb] text-white">
                  <s.icon className="h-4 w-4" />
                </span>
                <p className="mt-2 text-[13px] font-extrabold leading-snug text-white">{s.name}</p>
                <p className="mt-0.5 line-clamp-1 text-[11px] leading-relaxed text-white/80">
                  {s.short}
                </p>
                <p className="mt-1 text-[11px] font-bold text-[#4da6ff]">From {s.pricing.from}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="mt-7 text-base font-bold text-[#032558]">Why Choose CMT</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {why.map((w) => (
            <div key={w.title} className="cmt-card p-4">
              <w.icon className="h-5 w-5 text-[#0a6bdb]" />
              <p className="mt-2 text-sm font-bold text-[#032558]">{w.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#5C6B7A]">{w.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex items-end justify-between">
          <h2 className="text-base font-bold text-[#032558]">Recent Rides</h2>
          <Link to="/appointments" className="text-sm font-semibold text-[#0a6bdb]">
            See all
          </Link>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {PAST.map((r) => (
            <div key={r.id} className="cmt-card w-[240px] flex-none p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs text-[#5C6B7A]">{r.date}</p>
                <StatusBadge status={r.status} />
              </div>
              <p className="mt-2 text-sm font-bold leading-snug text-[#032558]">{r.destination}</p>
              <Link
                to="/book"
                onClick={() => bookingStore.set({ rideType: r.serviceId as RideType, dropoffLabel: r.destination })}
                className="mt-3 inline-flex min-h-10 items-center justify-center bg-[#0a6bdb] px-3 text-xs font-semibold text-white"
              >
                Book Again
              </Link>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </AppShell>
  );
}
