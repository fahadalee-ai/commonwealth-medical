import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";

export const Route = createFileRoute("/profile/terms")({
  component: Terms,
});

function Terms() {
  return (
    <AppShell>
      <ScreenHeader title="Terms of Service" backTo="/profile" />
      <div className="space-y-4 p-4 text-xs leading-relaxed text-[#c9c9c9]">
        <p>These terms govern your use of the ARC Electrical Solutions mobile application and services requested through it. By using the app you agree to be bound by these terms.</p>
        <p>Bookings are requests until confirmed by our dispatch team. Pricing, arrival times, and scope may be adjusted after on-site assessment.</p>
        <p>All work is performed by licensed and insured electricians and is covered by our workmanship guarantee for a period of 12 months from completion.</p>
        <p>Cancellations within 2 hours of the scheduled window may be subject to a service fee.</p>
      </div>
    </AppShell>
  );
}