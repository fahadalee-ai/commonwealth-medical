import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Trash2, Plus } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcButton } from "@/components/arc/Button";

export const Route = createFileRoute("/profile/addresses")({
  component: Addresses,
});

const ADDRESSES = [
  { label: "Home", line1: "116 Wilson Ave", line2: "Spencer, MA 01562" },
  { label: "Wellspring Medical Center", line1: "100 Front St", line2: "Worcester, MA 01608" },
  { label: "UMass Memorial", line1: "55 Lake Ave N", line2: "Worcester, MA 01655" },
];

function Addresses() {
  return (
    <AppShell>
      <ScreenHeader title="Saved Addresses" backTo="/profile" />
      <div className="flex flex-col gap-3 p-4 pb-32">
        {ADDRESSES.map((a) => (
          <div key={a.line1} className="cmt-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-full bg-[#0a6bdb]/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#0a6bdb]">
                  {a.label}
                </span>
                <p className="mt-2 text-sm font-bold text-[#032558]">{a.line1}</p>
                <p className="text-xs text-[#5C6B7A]">{a.line2}</p>
              </div>
              <div className="flex gap-2">
                <button
                  aria-label="Edit"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F7FA] text-[#032558]"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  aria-label="Delete"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F7FA] text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-[#dce3ec] bg-white p-4">
        <ArcButton block variant="secondary">
          <Plus className="h-4 w-4" /> Add New Address
        </ArcButton>
      </div>
    </AppShell>
  );
}
