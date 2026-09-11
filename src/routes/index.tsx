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
    const t = setTimeout(() => {
      navigate({ to: "/onboarding" });
    }, 2500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <AppShell className="bg-[#032558]">
      <div className="relative flex min-h-dvh flex-col items-center justify-center bg-[#032558] px-8">
        <div className="relative flex flex-col items-center">
          <div className="pointer-events-none absolute left-1/2 top-[42%] h-32 w-32 -translate-x-1/2 -translate-y-1/2">
            <span className="cmt-pulse-ring absolute inset-0 bg-[#0a6bdb]/40" />
            <span className="absolute inset-3 bg-[#0a6bdb]/20 blur-md" />
          </div>
          <Logo variant="white" size={300} className="cmt-logo-in relative z-10" />
        </div>

        <div className="absolute bottom-[18%] left-1/2 w-44 -translate-x-1/2">
          <div className="h-[3px] overflow-hidden bg-white/15">
            <div className="cmt-loading-bar h-full w-1/3 bg-[#0a6bdb]" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
