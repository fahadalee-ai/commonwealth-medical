import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bell,
  CarFront,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Clock,
  Timer,
  User,
} from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { Logo } from "@/components/arc/Logo";
import { StatusBadge } from "@/components/arc/StatusBadge";
import { PAST, UPCOMING } from "@/lib/appointments-data";
import { SERVICES } from "@/lib/services-data";
import { CMT, getFirstName } from "@/lib/cmt";
import { bookingStore, type RideType } from "@/lib/booking-store";
import heroImage from "@/assets/onboarding/welcome.jpg";

export const Route = createFileRoute("/home")({
  component: HomeScreen,
  head: () => ({
    meta: [
      { title: "Home · CMT" },
      { name: "description", content: "Book and manage non-emergency medical transportation." },
    ],
  }),
});

const values = [
  { icon: Heart, label: "Compassionate", desc: "Every passenger treated with dignity and respect" },
  { icon: ShieldCheck, label: "Reliable", desc: "Dependable rides you can count on" },
  { icon: Clock, label: "Safe", desc: "Focused on passenger safety and comfort" },
  { icon: Timer, label: "Punctual", desc: "On time for every appointment" },
];

function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function splitRideWhen(date: string) {
  const [day, time] = date.split(" · ");
  return { day: day ?? date, time: time ?? "" };
}

function isTodayRide(date: string) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return date.startsWith(today);
}

function HomeScreen() {
  const upcoming = UPCOMING[0];
  const [firstName, setFirstName] = useState("");
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setFirstName(getFirstName());
    setGreeting(greetingForNow());
  }, []);

  const when = upcoming ? splitRideWhen(upcoming.date) : null;
  const nextIsToday = upcoming ? isTodayRide(upcoming.date) : false;

  return (
    <AppShell>
      <header className="flex items-center justify-between bg-white px-4 py-3">
        <Logo size={118} />
        <div className="flex items-center gap-2">
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center bg-[#F5F7FA] text-[#032558]"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 bg-[#0a6bdb]" />
          </Link>
          <Link
            to="/profile"
            aria-label="Profile"
            className="flex h-11 w-11 items-center justify-center bg-[#032558] text-white"
          >
            {firstName ? (
              <span className="text-sm font-extrabold">{firstName.slice(0, 1)}</span>
            ) : (
              <User className="h-5 w-5" />
            )}
          </Link>
        </div>
      </header>

      <section className="relative h-[196px] overflow-hidden">
        <img
          src={heroImage}
          alt="CMT driver assisting a passenger"
          className="h-full w-full object-cover object-[center_18%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#032558] via-[#032558]/62 to-[#032558]/25" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4da6ff]">
            {greeting}
          </p>
          <h1 className="mt-1 text-[28px] font-extrabold leading-none tracking-tight">
            {firstName ? `${firstName}` : "Welcome"}
          </h1>
          <p className="mt-2 text-sm text-white/78">{CMT.tagline}</p>
        </div>
      </section>

      <div className="relative z-10 -mt-8 px-4">
        {upcoming && when ? (
          <Link
            to="/appointments/$id"
            params={{ id: upcoming.id }}
            className="cmt-card block overflow-hidden"
          >
            <div className="flex">
              <div className="flex w-[92px] shrink-0 flex-col items-center justify-center bg-[#0a6bdb] px-2 py-5 text-center text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/80">
                  {nextIsToday ? "Today" : "Next"}
                </p>
                <p className="mt-1 text-[20px] font-extrabold leading-none">{when.time || "—"}</p>
              </div>
              <div className="min-w-0 flex-1 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#5C6B7A]">
                      Upcoming ride
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-[#032558]">{when.day}</p>
                  </div>
                  <StatusBadge status={upcoming.status} />
                </div>
                <p className="mt-2 flex items-start gap-1.5 text-[13px] leading-snug text-[#5C6B7A]">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0a6bdb]" />
                  <span className="line-clamp-2">
                    {upcoming.pickup} → {upcoming.destination}
                  </span>
                </p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#0a6bdb]">
                  View details <ArrowRight className="h-4 w-4" />
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="cmt-card p-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#5C6B7A]">
              No upcoming ride
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#032558]">Ready when you are</p>
            <p className="mt-1 text-xs leading-relaxed text-[#5C6B7A]">
              Book a ride to your next appointment. PT-1 and MassHealth trips are covered when authorized.
            </p>
          </div>
        )}

        <div className="mt-3 grid grid-cols-3 gap-2">
          <Link
            to="/book"
            className="flex min-h-[86px] flex-col items-center justify-center gap-1.5 bg-[#032558] px-2 text-center text-white"
          >
            <CarFront className="h-5 w-5" />
            <span className="text-[11px] font-extrabold leading-tight">Book a ride</span>
          </Link>
          <a
            href={`tel:${CMT.phoneTel}`}
            className="flex min-h-[86px] flex-col items-center justify-center gap-1.5 bg-white px-2 text-center shadow-[0_8px_24px_rgb(3_37_88_/_6%)]"
          >
            <Phone className="h-5 w-5 text-[#0a6bdb]" />
            <span className="text-[11px] font-extrabold leading-tight text-[#032558]">Call CMT</span>
          </a>
          <Link
            to="/support"
            className="flex min-h-[86px] flex-col items-center justify-center gap-1.5 bg-white px-2 text-center shadow-[0_8px_24px_rgb(3_37_88_/_6%)]"
          >
            <MessageCircle className="h-5 w-5 text-[#0a6bdb]" />
            <span className="text-[11px] font-extrabold leading-tight text-[#032558]">Get help</span>
          </Link>
        </div>

        <div className="mt-7 flex items-end justify-between">
          <h2 className="text-base font-extrabold text-[#032558]">Our services</h2>
          <Link to="/services" className="text-sm font-bold text-[#0a6bdb]">
            See all
          </Link>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              to="/services/$serviceId"
              params={{ serviceId: s.id }}
              className="group relative h-[168px] w-[196px] shrink-0 overflow-hidden bg-[#032558]"
            >
              <img
                src={s.image}
                alt={s.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#032558] via-[#032558]/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <span className="inline-flex h-7 w-7 items-center justify-center bg-[#0a6bdb] text-white">
                  <s.icon className="h-3.5 w-3.5" />
                </span>
                <p className="mt-2 text-[13px] font-extrabold leading-snug text-white">{s.name}</p>
                <p className="mt-1 text-[11px] font-bold text-[#4da6ff]">from {s.pricing.from}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-7">
          <span className="cmt-metal-pill">Why choose CMT</span>
          <p className="mt-3 text-sm text-[#5C6B7A]">{CMT.values}</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {values.map((v) => (
              <div key={v.label} className="cmt-card p-4">
                <span className="inline-flex h-10 w-10 items-center justify-center bg-[#0a6bdb]/10 text-[#0a6bdb]">
                  <v.icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-extrabold text-[#032558]">{v.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#5C6B7A]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-end justify-between">
          <h2 className="text-base font-extrabold text-[#032558]">Recent rides</h2>
          <Link to="/appointments" className="text-sm font-bold text-[#0a6bdb]">
            See all
          </Link>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {PAST.map((r) => (
            <div key={r.id} className="cmt-card flex items-center gap-3 p-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#0a6bdb]/10 text-[#0a6bdb]">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold text-[#032558]">{r.destination}</p>
                <p className="mt-0.5 text-xs text-[#5C6B7A]">{r.date}</p>
              </div>
              <Link
                to="/book"
                onClick={() => bookingStore.set({ rideType: r.serviceId as RideType, dropoffLabel: r.destination })}
                className="inline-flex min-h-10 shrink-0 items-center bg-[#0a6bdb] px-3 text-xs font-bold text-white"
              >
                Book again
              </Link>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </AppShell>
  );
}
