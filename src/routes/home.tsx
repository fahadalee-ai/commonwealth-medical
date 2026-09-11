import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Search, ShieldCheck, Clock, Award } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { Logo } from "@/components/arc/Logo";
import { ArcButton } from "@/components/arc/Button";
import { SERVICES } from "@/lib/services-data";

export const Route = createFileRoute("/home")({
  component: HomeScreen,
  head: () => ({
    meta: [
      { title: "Home · ARC Electrical Solutions" },
      { name: "description", content: "Book trusted electrical services in a few taps." },
    ],
  }),
});

const promos = [
  {
    title: "Generator Installation Special",
    subtitle: "Book Now for Storm Season",
    image:
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Whole-Home Rewiring",
    subtitle: "Free On-Site Estimate",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  },
];

function HomeScreen() {
  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-[#161616]">
            <Logo size={28} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#8A8A8A]">Welcome</p>
            <p className="text-sm font-bold">Hi, Alex 👋</p>
          </div>
        </div>
        <Link
          to="/notifications"
          className="relative flex h-10 w-10 items-center justify-center bg-[#161616]"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center bg-[#E31E24] px-1 text-[9px] font-bold text-white">
            3
          </span>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8A8A]" />
          <input
            placeholder="Search for a service..."
            className="h-12 w-full border border-[#2A2A2A] bg-[#161616] pl-10 pr-4 text-sm text-white placeholder:text-[#5a5a5a] focus:border-[#FFC107] focus:outline-none"
          />
        </div>
      </div>

      {/* Promo carousel */}
      <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
        {promos.map((p, idx) => (
          <div
            key={p.title}
            className="relative h-40 w-[88%] flex-none snap-center overflow-hidden"
          >
            <img src={p.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D0D0D]/90 via-[#0D0D0D]/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <span className="mb-1 inline-block w-fit bg-[#FFC107] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black">
                {idx === 0 ? "Special" : "Estimate"}
              </span>
              <p className="text-lg font-extrabold leading-tight">{p.title}</p>
              <p className="text-xs text-[#e5e5e5]">{p.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="mt-6 px-4">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-extrabold uppercase tracking-tight">Our Services</h2>
            <div className="mt-1 h-0.5 w-10 bg-[#E31E24]" />
          </div>
          <Link to="/services" className="text-xs font-bold uppercase text-[#FFC107]">
            See All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              to="/services/$serviceId"
              params={{ serviceId: s.id }}
              className="flex flex-col border border-[#2A2A2A] bg-[#161616]"
            >
              <div className="relative h-24 w-full overflow-hidden">
                <img src={s.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent" />
                <s.icon className="absolute right-2 top-2 h-4 w-4 text-[#FFC107]" />
              </div>
              <div className="flex-1 p-3">
                <p className="text-xs font-bold leading-tight">{s.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick book */}
      <div className="mx-4 mt-8 bg-[#E31E24] p-5">
        <p className="text-lg font-extrabold uppercase leading-tight">
          Ready to get started?
        </p>
        <p className="mt-1 text-xs text-white/90">
          Same-day appointments often available.
        </p>
        <Link to="/book" className="mt-4 inline-flex">
          <ArcButton variant="secondary">Book an Appointment</ArcButton>
        </Link>
      </div>

      {/* Why choose */}
      <div className="mt-8 px-4">
        <h2 className="text-lg font-extrabold uppercase tracking-tight">
          Why Choose ARC
        </h2>
        <div className="mt-1 h-0.5 w-10 bg-[#E31E24]" />
        <div className="mt-4 flex flex-col gap-3">
          <WhyRow icon={ShieldCheck} title="Licensed & Insured" desc="Fully certified electricians on every job." />
          <WhyRow icon={Clock} title="Same-Day Service Available" desc="Fast dispatch for urgent electrical needs." />
          <WhyRow icon={Award} title="Satisfaction Guaranteed" desc="Backed by our workmanship guarantee." />
        </div>
      </div>

      <BottomNav />
    </AppShell>
  );
}

function WhyRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof ShieldCheck;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3 border border-[#2A2A2A] bg-[#161616] p-4">
      <div className="flex h-10 w-10 flex-none items-center justify-center border border-[#2A2A2A] text-[#FFC107]">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-[#8A8A8A]">{desc}</p>
      </div>
    </div>
  );
}