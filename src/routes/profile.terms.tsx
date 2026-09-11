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
      <div className="space-y-4 p-4 text-sm leading-relaxed text-[#5C6B7A]">
        <p>
          These terms govern your use of the Commonwealth Medical Transportation (CMT) mobile
          application and non-emergency medical transportation services requested through it.
        </p>
        <p>
          Ride bookings are requests until confirmed by dispatch. Final pickup windows depend on
          traffic, authorization, and facility readiness.
        </p>
        <p>
          Eligible transportation is typically authorized by your health plan, PT-1, or
          transportation broker. CMT does not guarantee coverage for unauthorized trips.
        </p>
        <p>
          Cancellations close to the scheduled pickup may require a call to (774) 622-3789 so we
          can notify your driver and update your broker if needed.
        </p>
      </div>
    </AppShell>
  );
}
