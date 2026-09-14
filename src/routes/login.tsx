import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { Logo } from "@/components/arc/Logo";
import { ArcInput } from "@/components/arc/Input";
import { ArcButton } from "@/components/arc/Button";
import { CMT, markSignedIn } from "@/lib/cmt";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();

  const enter = () => {
    markSignedIn();
    navigate({ to: "/home" });
  };

  return (
    <AppShell>
      <div className="min-h-dvh bg-[#F5F7FA] pb-10">
        <div className="cmt-metal h-2 w-full" />
        <div className="relative overflow-hidden bg-[#032558] px-6 pb-14 pt-10 text-center">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_64%)]" />
          <div className="relative">
            <div className="flex justify-center">
              <Logo variant="white" size={196} />
            </div>
            <span className="cmt-metal-pill mt-5">Non-emergency medical transportation</span>
            <h1 className="mt-5 text-[26px] font-extrabold tracking-tight text-white">Welcome back</h1>
            <p className="mt-1 text-sm leading-relaxed text-white/72">
              Log in to book and manage your rides
            </p>
          </div>
        </div>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            enter();
          }}
          className="relative z-10 -mt-7 px-4"
        >
          <div className="cmt-card p-5">
            <div className="flex flex-col gap-4">
              <ArcInput
                label="Phone Number or Email"
                type="text"
                placeholder=" "
                prefixIcon={<Mail className="h-4 w-4" />}
              />
              <div>
                <ArcInput label="Password" type="password" placeholder=" " />
                <div className="mt-2 text-right">
                  <Link to="/forgot-password" className="text-sm font-semibold text-[#0a6bdb]">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <ArcButton type="submit" block>
                Log In
              </ArcButton>
            </div>
          </div>
        </form>

        <div className="my-6 flex items-center gap-3 px-6">
          <div className="h-px flex-1 bg-[#dce3ec]" />
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5C6B7A]">
            or continue with
          </span>
          <div className="h-px flex-1 bg-[#dce3ec]" />
        </div>

        <div className="flex flex-col gap-3 px-4">
          <ArcButton variant="secondary" block type="button" onClick={enter}>
            <GoogleIcon /> Continue with Google
          </ArcButton>
          <ArcButton variant="secondary" block type="button" onClick={enter}>
            <AppleIcon /> Continue with Apple
          </ArcButton>
        </div>

        <p className="mt-8 text-center text-sm text-[#5C6B7A]">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-bold text-[#0a6bdb]">
            Sign Up
          </Link>
        </p>
        <p className="mt-3 text-center text-xs text-[#5C6B7A]">
          Need help? Call{" "}
          <a href={`tel:${CMT.phoneTel}`} className="font-semibold text-[#0a6bdb]">
            {CMT.phone}
          </a>
        </p>
      </div>
    </AppShell>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.6 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C33.9 6 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.5 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C33.9 6 29.2 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.1 0 9.7-1.9 13.2-5l-6.1-5c-2 1.4-4.5 2.2-7.1 2.2-5.1 0-9.5-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.9 2.5-2.5 4.6-4.6 6l6.1 5C41 35.9 44 30.4 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M16.7 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.5 1.3 0 1.8-.9 3.4-.9 1.6 0 2 .9 3.4.9 1.4 0 2.3-1.2 3.2-2.5.7-1 1.2-2 1.6-3.1-3.4-1.3-3.3-3.7-3.3-3.7zM14.4 4.4c.7-.9 1.2-2.1 1.1-3.4-1 0-2.3.7-3 1.6-.7.8-1.3 2.1-1.1 3.3 1.1.1 2.3-.6 3-1.5z" />
    </svg>
  );
}
