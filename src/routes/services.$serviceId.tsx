import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Check } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ArcButton } from "@/components/arc/Button";
import { getService, SERVICES } from "@/lib/services-data";
import { bookingStore } from "@/lib/booking-store";

export const Route = createFileRoute("/services/$serviceId")({
  component: ServiceDetail,
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
  if (!service) {
    return (
      <AppShell>
        <div className="p-6">Service not found.</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="relative h-[40dvh] w-full">
        <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/60 via-transparent to-[#0D0D0D]" />
        <Link
          to="/services"
          aria-label="Back"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center bg-[#0D0D0D]/70 backdrop-blur-sm"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </Link>
      </div>

      <div className="px-4 pb-40 pt-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#FFC107] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black">
            {service.category}
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight">
          {service.name}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#c9c9c9]">
          {service.description}
        </p>

        <h2 className="mt-6 text-sm font-extrabold uppercase tracking-widest text-white">
          Gallery
        </h2>
        <div className="mt-3 flex gap-3 overflow-x-auto">
          {service.gallery.map((g: string, i: number) => (
            <div key={i} className="h-28 w-40 flex-none overflow-hidden bg-[#161616]">
              <img src={g} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <h2 className="mt-6 text-sm font-extrabold uppercase tracking-widest text-white">
          What&apos;s Included
        </h2>
        <ul className="mt-3 flex flex-col gap-2 border border-[#2A2A2A] bg-[#161616] p-4">
          {service.included.map((item: string) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 flex-none text-[#FFC107]" strokeWidth={3} />
              <span className="text-sm text-white">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-6 text-sm font-extrabold uppercase tracking-widest text-white">
          Related Services
        </h2>
        <div className="mt-3 flex gap-3 overflow-x-auto">
          {SERVICES.filter((s) => s.id !== service.id)
            .slice(0, 5)
            .map((s) => (
              <Link
                key={s.id}
                to="/services/$serviceId"
                params={{ serviceId: s.id }}
                className="w-36 flex-none border border-[#2A2A2A] bg-[#161616]"
              >
                <div className="h-20 w-full overflow-hidden">
                  <img src={s.image} alt="" className="h-full w-full object-cover" />
                </div>
                <p className="p-2 text-[11px] font-bold leading-tight">{s.name}</p>
              </Link>
            ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-[#2A2A2A] bg-[#0D0D0D] p-4">
        <Link
          to="/book"
          onClick={() => bookingStore.set({ serviceId: service.id })}
        >
          <ArcButton block>Book This Service</ArcButton>
        </Link>
      </div>
    </AppShell>
  );
}