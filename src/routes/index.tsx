import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/arc/AppShell";
import { Logo } from "@/components/arc/Logo";
import { CMT } from "@/lib/cmt";

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
      <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#032558]">
        <div className="cmt-metal h-2 w-full" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.16),transparent_62%)]" />
        <div className="pointer-events-none absolute inset-x-8 top-[28%] h-56 rounded-full bg-[#0a6bdb]/18 blur-3xl" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-7">
          <Logo variant="white" size={280} className="cmt-logo-in" />
          <span className="cmt-metal-pill cmt-rise mt-7 max-w-[320px]">
            Non-emergency medical transportation
          </span>
          <p className="mt-4 text-center text-sm font-medium tracking-wide text-white/78">
            {CMT.tagline}
          </p>
        </div>

        <div className="relative z-10 mx-auto mb-[14%] w-48">
          <div className="cmt-metal h-[4px] overflow-hidden">
            <div className="cmt-loading-bar h-full w-1/3 bg-[#0a6bdb]" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
