import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcInput } from "@/components/arc/Input";
import { ArcButton } from "@/components/arc/Button";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
});

function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <ScreenHeader title="Forgot Password" backTo="/login" />
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Reset Your Password</h1>
        <p className="mt-2 text-sm text-[#8A8A8A]">
          Enter your registered email and we&apos;ll send you a reset link.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/reset-sent" });
          }}
          className="mt-6 flex flex-col gap-4"
        >
          <ArcInput label="Email Address" type="email" placeholder="you@example.com" />
          <ArcButton type="submit" block>
            Send Reset Link
          </ArcButton>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-xs font-semibold uppercase tracking-widest text-[#FFC107]">
            Back to Login
          </Link>
        </div>
      </div>
    </AppShell>
  );
}