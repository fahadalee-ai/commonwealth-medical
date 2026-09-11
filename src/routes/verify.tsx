import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcButton } from "@/components/arc/Button";
import { markSignedIn } from "@/lib/cmt";

export const Route = createFileRoute("/verify")({
  component: Verify,
});

function Verify() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(45);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const setDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < 5) refs.current[index + 1]?.focus();
  };

  return (
    <AppShell>
      <ScreenHeader title="Verify Your Number" backTo="/register" />
      <div className="px-6 pt-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#032558]">
          Enter the code we sent
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#5C6B7A]">
          A 6-digit verification code was sent by SMS. It may take a moment to arrive.
        </p>

        <div className="mt-8 flex justify-between gap-2">
          {code.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !code[i] && i > 0) {
                  refs.current[i - 1]?.focus();
                }
              }}
              className="h-14 w-12 rounded-xl border border-transparent bg-[#eef1f6] text-center text-xl font-bold text-[#032558] focus:border-[#032558] focus:outline-none focus:ring-2 focus:ring-[#032558]/10"
            />
          ))}
        </div>

        <div className="mt-6">
          <ArcButton
            block
            disabled={code.some((d) => !d)}
            onClick={() => {
              markSignedIn(localStorage.getItem("cmt_first_name") ?? "Alex");
              navigate({ to: "/home" });
            }}
          >
            Verify
          </ArcButton>
        </div>

        <p className="mt-6 text-center text-sm text-[#5C6B7A]">
          {seconds > 0 ? (
            <>Resend code in 0:{String(seconds).padStart(2, "0")}</>
          ) : (
            <button
              className="font-semibold text-[#0a6bdb]"
              onClick={() => setSeconds(45)}
            >
              Resend Code
            </button>
          )}
        </p>
      </div>
    </AppShell>
  );
}
