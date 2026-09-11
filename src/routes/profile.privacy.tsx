import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";

export const Route = createFileRoute("/profile/privacy")({
  component: Privacy,
});

function Privacy() {
  return (
    <AppShell>
      <ScreenHeader title="Privacy Policy" backTo="/profile" />
      <div className="space-y-4 p-4 text-xs leading-relaxed text-[#c9c9c9]">
        <p>We collect only the information necessary to schedule, deliver, and follow up on your electrical service — name, contact details, service address, and job notes/photos you provide.</p>
        <p>We never sell your data. Personal information is shared only with the assigned technician and payment processor as needed to fulfill the booking.</p>
        <p>You can request deletion of your account and associated data at any time from Settings or by contacting support.</p>
      </div>
    </AppShell>
  );
}