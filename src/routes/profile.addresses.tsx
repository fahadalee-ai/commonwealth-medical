import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Trash2, Plus } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcButton } from "@/components/arc/Button";

export const Route = createFileRoute("/profile/addresses")({
  component: Addresses,
});

const ADDRESSES = [
  { label: "Home", line1: "142 Oakridge Ave", line2: "Springfield, MA 01103" },
  { label: "Office", line1: "88 Commerce Blvd, Suite 300", line2: "Springfield, MA 01108" },
  { label: "Other", line1: "Mom's House · 512 Maple Lane", line2: "Chicopee, MA 01013" },
];

function Addresses() {
  return (
    <AppShell>
      <ScreenHeader title="Saved Addresses" backTo="/profile" />
      <div className="flex flex-col gap-3 p-4 pb-32">
        {ADDRESSES.map((a) => (
          <div key={a.line1} className="border border-[#2A2A2A] bg-[#161616] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block bg-[#FFC107] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black">
                  {a.label}
                </span>
                <p className="mt-2 text-sm font-bold">{a.line1}</p>
                <p className="text-xs text-[#8A8A8A]">{a.line2}</p>
              </div>
              <div className="flex gap-2">
                <button aria-label="Edit" className="flex h-8 w-8 items-center justify-center border border-[#2A2A2A] text-white">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button aria-label="Delete" className="flex h-8 w-8 items-center justify-center border border-[#2A2A2A] text-[#E31E24]">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-[#2A2A2A] bg-[#0D0D0D] p-4">
        <ArcButton block variant="secondary">
          <Plus className="h-4 w-4" /> Add New Address
        </ArcButton>
      </div>
    </AppShell>
  );
}