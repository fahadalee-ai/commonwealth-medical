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
      <div className="space-y-4 p-4 text-sm leading-relaxed text-[#5C6B7A]">
        <p>
          We collect only the information needed to book, dispatch, and complete your rides —
          name, contact details, pickup and destination addresses, mobility needs, and coverage
          identifiers you provide.
        </p>
        <p>
          We never sell your data. Information may be shared with your assigned driver, dispatch
          team, and authorizing health plan or transportation broker as required to fulfill the
          trip.
        </p>
        <p>
          You can request updates or deletion of your account by contacting
          info@ridewithcmt.com or calling (774) 622-3789.
        </p>
      </div>
    </AppShell>
  );
}
