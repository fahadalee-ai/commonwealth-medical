import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ChevronLeft,
  Check,
  Clock,
  ShieldCheck,
  MapPin,
  Accessibility,
  ChevronDown,
  CircleDollarSign,
} from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ArcButton } from "@/components/arc/Button";
import { getService, SERVICES } from "@/lib/services-data";
import { bookingStore, type RideType } from "@/lib/booking-store";

export const Route = createFileRoute("/services/$serviceId")({
  component: ServiceDetail,
  head: () => ({ meta: [{ title: "Service · CMT" }] }),
  notFoundComponent: () => (
    <AppShell>
      <div className="p-6">Service not found.</div>
    </AppShell>
  ),
  errorComponent: () => (
    <AppShell>
      <div className="p-6">Something went wrong.</div>
    </AppShell>
  ),
});

function ServiceDetail() {
  const { serviceId } = Route.useParams();
  const service = getService(serviceId);
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) {
    return (
      <AppShell>
        <div className="p-6">Service not found.</div>
      </AppShell>
    );
  }

  const related = SERVICES.filter((s) => s.id !== service.id);

  return (
    <AppShell>
      <div className="relative h-[38dvh] w-full">
        <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#032558] via-[#032558]/35 to-[#032558]/25" />
        <Link
          to="/home"
          aria-label="Back"
          className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center bg-white text-[#032558]"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="absolute inset-x-0 bottom-0 px-4 pb-5">
          <span className="bg-[#0a6bdb] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
            {service.category}
          </span>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-white">
            {service.name}
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-white/85">{service.short}</p>
        </div>
      </div>

      <div className="px-4 pb-40 pt-5">
        <p className="text-sm leading-relaxed text-[#5C6B7A]">{service.description}</p>

        <div className="mt-5 bg-[#032558] p-4 text-white">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Starting at</p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <p className="text-[32px] font-extrabold leading-none">{service.pricing.from}</p>
            <p className="pb-0.5 text-sm font-semibold text-white/80">{service.pricing.unit}</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/80">{service.pricing.coveredLabel}</p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <InfoTile icon={Clock} label="Lead time" value={service.leadTime} />
          <InfoTile icon={ShieldCheck} label="Coverage" value={service.coverage} />
        </div>

        <Section title="Best for">
          <ul className="space-y-2">
            {service.bestFor.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </ul>
        </Section>

        <Section title="How it works">
          <ol className="space-y-3">
            {service.howItWorks.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center bg-[#032558] text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-[#032558]">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Pricing">
          <div className="bg-white shadow-[0_8px_24px_rgba(3,37,88,0.06)]">
            {service.pricing.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-start justify-between gap-4 border-b border-[#eef1f6] px-4 py-3 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-bold text-[#032558]">{row.label}</p>
                  {row.note && <p className="mt-0.5 text-xs text-[#5C6B7A]">{row.note}</p>}
                </div>
                <p className="flex-none text-sm font-extrabold text-[#0a6bdb]">{row.price}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 flex gap-2 text-xs leading-relaxed text-[#5C6B7A]">
            <CircleDollarSign className="mt-0.5 h-3.5 w-3.5 flex-none text-[#0a6bdb]" />
            {service.pricing.disclaimer}
          </p>
        </Section>

        <Section title="What's included">
          <ul className="space-y-2">
            {service.included.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </ul>
        </Section>

        <Section title="Typical destinations">
          <ul className="space-y-2">
            {service.destinations.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#032558]">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-[#0a6bdb]" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Mobility support">
          <div className="flex flex-wrap gap-2">
            {service.mobility.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 bg-[#0a6bdb]/10 px-3 py-2 text-xs font-semibold text-[#032558]"
              >
                <Accessibility className="h-3.5 w-3.5 text-[#0a6bdb]" />
                {item}
              </span>
            ))}
          </div>
        </Section>

        <Section title="What to bring">
          <ul className="space-y-2">
            {service.whatToBring.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </ul>
        </Section>

        <Section title="Hours">
          <p className="text-sm leading-relaxed text-[#5C6B7A]">{service.hours}</p>
        </Section>

        <Section title="Gallery">
          <div className="flex gap-3 overflow-x-auto">
            {service.gallery.map((g) => (
              <img
                key={g}
                src={g}
                alt=""
                className="h-28 w-40 flex-none object-cover"
              />
            ))}
          </div>
        </Section>

        <Section title="Questions">
          <ul className="divide-y divide-[#eef1f6] bg-white shadow-[0_8px_24px_rgba(3,37,88,0.06)]">
            {service.faqs.map((f, i) => (
              <li key={f.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-sm font-bold text-[#032558]">{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 flex-none text-[#0a6bdb] transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="px-4 pb-4 text-sm leading-relaxed text-[#5C6B7A]">{f.a}</p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Related services">
          <div className="flex gap-3 overflow-x-auto">
            {related.map((s) => (
              <Link
                key={s.id}
                to="/services/$serviceId"
                params={{ serviceId: s.id }}
                className="w-40 flex-none overflow-hidden bg-white shadow-[0_8px_24px_rgba(3,37,88,0.06)]"
              >
                <img src={s.image} alt="" className="h-20 w-full object-cover" />
                <div className="p-2">
                  <p className="text-[12px] font-bold leading-tight text-[#032558]">{s.name}</p>
                  <p className="mt-1 text-[11px] font-extrabold text-[#0a6bdb]">
                    From {s.pricing.from}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-[#dce3ec] bg-white p-4">
        <Link to="/book" onClick={() => bookingStore.set({ rideType: service.id as RideType })}>
          <ArcButton block>Book This Ride</ArcButton>
        </Link>
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-7">
      <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#032558]">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="mt-0.5 h-4 w-4 flex-none text-[#1FA463]" strokeWidth={3} />
      <span className="text-sm leading-relaxed text-[#032558]">{text}</span>
    </li>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-3 shadow-[0_8px_24px_rgba(3,37,88,0.06)]">
      <Icon className="h-4 w-4 text-[#0a6bdb]" />
      <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-[#5C6B7A]">{label}</p>
      <p className="mt-1 line-clamp-4 text-xs leading-relaxed text-[#032558]">{value}</p>
    </div>
  );
}
