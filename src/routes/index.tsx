import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/arc/AppShell";
import { Logo } from "@/components/arc/Logo";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/onboarding" }), 1800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <AppShell>
      <div className="relative flex min-h-dvh flex-col items-center justify-center bg-[#0D0D0D] px-6">
        <Logo size={220} />
        <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFC107]">
          Powering Your Home & Business,
          <br />
          The Right Way.
        </p>
        <div className="absolute bottom-[26%] left-1/2 h-[3px] w-40 -translate-x-1/2 overflow-hidden bg-[#161616]">
          <div className="arc-loading-bar h-full w-1/3 bg-[#FFC107]" />
        </div>
      </div>
    </AppShell>
  );
}
