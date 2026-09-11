import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { Logo } from "@/components/arc/Logo";
import { ArcInput } from "@/components/arc/Input";
import { ArcButton } from "@/components/arc/Button";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  return (
    <AppShell>
      <div className="min-h-dvh px-6 pb-10 pt-10">
        <div className="flex justify-center">
          <Logo size={110} />
        </div>
        <div className="mt-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Create Your Account</h1>
          <p className="mt-2 text-sm text-[#8A8A8A]">
            Sign up to start booking electrical services.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/home" });
          }}
          className="mt-6 flex flex-col gap-4"
        >
          <ArcInput label="Full Name" placeholder="John Doe" />
          <ArcInput label="Email Address" type="email" placeholder="you@example.com" />
          <ArcInput label="Phone Number" type="tel" placeholder="(555) 123-4567" />
          <ArcInput label="Password" type="password" placeholder="••••••••" />
          <ArcInput label="Confirm Password" type="password" placeholder="••••••••" />

          <button
            type="button"
            onClick={() => setAgreed((a) => !a)}
            className="mt-2 flex items-start gap-3 text-left"
          >
            <span
              className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center border ${agreed ? "border-[#E31E24] bg-[#E31E24]" : "border-[#2A2A2A] bg-[#161616]"}`}
            >
              {agreed && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
            </span>
            <span className="text-xs text-[#8A8A8A]">
              I agree to the{" "}
              <span className="text-[#FFC107] underline">Terms of Service</span> and{" "}
              <span className="text-[#FFC107] underline">Privacy Policy</span>
            </span>
          </button>

          <ArcButton type="submit" block disabled={!agreed} className="mt-2">
            Create Account
          </ArcButton>
        </form>

        <p className="mt-8 text-center text-xs text-[#8A8A8A]">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#FFC107]">
            Log In
          </Link>
        </p>
      </div>
    </AppShell>
  );
}