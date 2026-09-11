import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ArcButton } from "@/components/arc/Button";

export const Route = createFileRoute("/reset-sent")({
  component: ResetSent,
});

function ResetSent() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1FA463]/12 text-[#1FA463]">
          <MailCheck className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#032558]">
          Check Your Inbox
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#5C6B7A]">
          We&apos;ve sent a password reset link. Please check your email or text messages.
        </p>
        <div className="mt-8 w-full">
          <ArcButton block onClick={() => navigate({ to: "/login" })}>
            Back to Login
          </ArcButton>
        </div>
      </div>
    </AppShell>
  );
}
