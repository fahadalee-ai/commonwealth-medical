import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { SERVICES } from "@/lib/services-data";

export const Route = createFileRoute("/services/")({
  component: ServicesList,
  head: () => ({ meta: [{ title: "Services · CMT" }] }),
});

function ServicesList() {
  return (
    <AppShell>
      <ScreenHeader title="Our Services" backTo="/home" />
      <ul className="p-4">
        {SERVICES.map((s) => (
          <li key={s.id} className="mb-3">
            <Link
              to="/services/$serviceId"
              params={{ serviceId: s.id }}
              className="flex overflow-hidden bg-white shadow-[0_8px_24px_rgba(3,37,88,0.06)]"
            >
              <img src={s.image} alt="" className="h-[92px] w-[92px] flex-none object-cover" />
              <div className="flex min-w-0 flex-1 items-center gap-2 p-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#0a6bdb]">
                    {s.category}
                  </p>
                  <p className="truncate text-sm font-bold text-[#032558]">{s.name}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[#5C6B7A]">
                    {s.short}
                  </p>
                  <p className="mt-1.5 text-xs font-extrabold text-[#0a6bdb]">
                    From {s.pricing.from}{" "}
                    <span className="font-semibold text-[#5C6B7A]">· {s.pricing.unit}</span>
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 flex-none text-[#5C6B7A]" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <BottomNav />
    </AppShell>
  );
}
