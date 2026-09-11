import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { SERVICES, CATEGORIES, type Category } from "@/lib/services-data";

export const Route = createFileRoute("/services/")({
  component: ServicesList,
  head: () => ({ meta: [{ title: "Services · ARC Electrical Solutions" }] }),
});

function ServicesList() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category>("All");

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesQ =
        !query || s.name.toLowerCase().includes(query.toLowerCase());
      const matchesC = cat === "All" || s.categories.includes(cat);
      return matchesQ && matchesC;
    });
  }, [query, cat]);

  return (
    <AppShell>
      <ScreenHeader title="All Services" backTo="/home" />

      <div className="px-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8A8A]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
            className="h-12 w-full border border-[#2A2A2A] bg-[#161616] pl-10 pr-4 text-sm text-white placeholder:text-[#5a5a5a] focus:border-[#FFC107] focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto px-4">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`h-9 flex-none px-4 text-xs font-bold uppercase tracking-wide ${cat === c ? "bg-[#E31E24] text-white" : "border border-[#2A2A2A] bg-[#161616] text-[#8A8A8A]"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-4">
        {filtered.map((s) => (
          <li key={s.id} className="border-t border-[#2A2A2A] last:border-b">
            <Link
              to="/services/$serviceId"
              params={{ serviceId: s.id }}
              className="flex items-center gap-3 px-4 py-3"
            >
              <div className="h-16 w-16 flex-none overflow-hidden bg-[#161616]">
                <img src={s.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{s.name}</p>
                <p className="mt-0.5 truncate text-xs text-[#8A8A8A]">{s.short}</p>
              </div>
              <ChevronRight className="h-5 w-5 flex-none text-[#8A8A8A]" />
            </Link>
          </li>
        ))}
      </ul>

      <BottomNav />
    </AppShell>
  );
}