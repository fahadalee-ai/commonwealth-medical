import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcInput } from "@/components/arc/Input";
import { ArcButton } from "@/components/arc/Button";
import { StepIndicator } from "@/components/arc/StepIndicator";
import { markOnboarded } from "@/lib/cmt";

export const Route = createFileRoute("/register")({
  component: Register,
});

const PROGRAMS = ["MassHealth/PT-1", "Transportation Broker (select)", "Private Pay", "Other"] as const;
const MOBILITY = [
  "Ambulatory",
  "Wheelchair",
  "Stretcher",
  "Walker/Cane Assistance",
  "None",
] as const;

function Register() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [program, setProgram] = useState<(typeof PROGRAMS)[number]>("MassHealth/PT-1");
  const [programOpen, setProgramOpen] = useState(false);
  const [mobility, setMobility] = useState<string[]>(["Ambulatory"]);
  const [firstName, setFirstName] = useState("");
  const [legal, setLegal] = useState<null | "terms" | "privacy">(null);
  const navigate = useNavigate();

  const toggleMobility = (item: string) => {
    setMobility((prev) =>
      prev.includes(item) ? prev.filter((m) => m !== item) : [...prev, item],
    );
  };

  return (
    <AppShell>
      <ScreenHeader title="Create Your Account" backTo={step === 1 ? "/login" : undefined} />
      <div className="px-6 pb-10 pt-2">
        <p className="text-sm leading-relaxed text-[#5C6B7A]">
          Set up your profile to start booking rides
        </p>
        <StepIndicator total={2} current={step} />
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#5C6B7A]">
          Step {step} of 2
        </p>

        {step === 1 && (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <ArcInput
                label="First Name"
                placeholder=" "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <ArcInput label="Last Name" placeholder=" " />
            </div>
            <ArcInput label="Date of Birth" type="date" />
            <ArcInput label="Phone Number" type="tel" placeholder=" " />
            <ArcInput label="Email Address" type="text" placeholder=" " />
            <ArcInput label="Home Address" placeholder="Start typing your address" />
            <ArcButton type="submit" block>
              Next
            </ArcButton>
          </form>
        )}

        {step === 2 && (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              markOnboarded();
              if (firstName) localStorage.setItem("cmt_first_name", firstName);
              navigate({ to: "/verify" });
            }}
            className="flex flex-col gap-4"
          >
            <ArcInput label="Password" type="password" placeholder=" " />
            <ArcInput label="Confirm Password" type="password" placeholder=" " />

            <div className="relative">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#5C6B7A]">
                Insurance / Program
              </p>
              <button
                type="button"
                onClick={() => setProgramOpen((o) => !o)}
                className="flex h-14 w-full items-center justify-between bg-[#eef1f6] px-4 text-left text-[15px] text-[#032558]"
              >
                <span>{program}</span>
                <ChevronDown className={`h-4 w-4 text-[#5C6B7A] ${programOpen ? "rotate-180" : ""}`} />
              </button>
              {programOpen && (
                <ul className="absolute left-0 right-0 z-20 mt-1 border border-[#dce3ec] bg-white shadow-[0_8px_24px_rgba(3,37,88,0.12)]">
                  {PROGRAMS.map((p) => (
                    <li key={p}>
                      <button
                        type="button"
                        onClick={() => {
                          setProgram(p);
                          setProgramOpen(false);
                        }}
                        className={`flex min-h-12 w-full items-center px-4 text-left text-sm ${
                          program === p ? "bg-[#0a6bdb] font-semibold text-white" : "text-[#032558]"
                        }`}
                      >
                        {p}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {program === "Transportation Broker (select)" && (
              <ArcInput label="Broker / Health Plan Name" placeholder=" " />
            )}
            <ArcInput label="Member ID / Authorization Number" placeholder="Optional" />
            <ArcInput label="Emergency Contact Name" placeholder=" " />
            <ArcInput label="Emergency Contact Phone" type="tel" placeholder=" " />

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#5C6B7A]">
                Mobility Needs
              </p>
              <div className="flex flex-wrap gap-2">
                {MOBILITY.map((item) => {
                  const on = mobility.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleMobility(item)}
                      className={`min-h-11 rounded-full px-3.5 text-sm font-semibold ${
                        on ? "bg-[#0a6bdb] text-white" : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAgreed((a) => !a)}
              className="mt-1 flex items-start gap-3 text-left"
            >
              <span
                className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md border ${
                  agreed ? "border-[#0a6bdb] bg-[#0a6bdb]" : "border-[#dce3ec] bg-white"
                }`}
              >
                {agreed && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
              </span>
              <span className="text-sm leading-relaxed text-[#5C6B7A]">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLegal("terms");
                  }}
                  className="font-semibold text-[#0a6bdb] underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLegal("privacy");
                  }}
                  className="font-semibold text-[#0a6bdb] underline"
                >
                  Privacy Policy
                </button>
              </span>
            </button>

            <ArcButton type="submit" block>
              Create Account
            </ArcButton>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="min-h-11 text-sm font-semibold text-[#0a6bdb]"
            >
              Back to personal information
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-[#5C6B7A]">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#0a6bdb]">
            Log In
          </Link>
        </p>
      </div>

      {legal && (
        <div className="fixed inset-0 z-50 mx-auto flex max-w-[420px] items-end bg-black/45">
          <div className="flex max-h-[80dvh] w-full flex-col bg-white">
            <div className="flex items-center justify-between border-b border-[#eef1f6] px-4 py-3">
              <h2 className="text-base font-extrabold text-[#032558]">
                {legal === "terms" ? "Terms of Service" : "Privacy Policy"}
              </h2>
              <button
                type="button"
                onClick={() => setLegal(null)}
                className="min-h-11 px-2 text-sm font-semibold text-[#0a6bdb]"
              >
                Close
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto px-4 py-4 text-sm leading-relaxed text-[#5C6B7A]">
              {legal === "terms" ? <TermsCopy /> : <PrivacyCopy />}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function TermsCopy() {
  return (
    <>
      <p>
        These terms govern your use of the Commonwealth Medical Transportation (CMT) mobile
        application and non-emergency medical transportation services requested through it.
      </p>
      <p>
        Ride bookings are requests until confirmed by dispatch. Final pickup windows depend on
        traffic, authorization, and facility readiness.
      </p>
      <p>
        Eligible transportation is typically authorized by your health plan, PT-1, or
        transportation broker. CMT does not guarantee coverage for unauthorized trips.
      </p>
      <p>
        Cancellations close to the scheduled pickup may require a call to (774) 622-3789 so we
        can notify your driver and update your broker if needed.
      </p>
    </>
  );
}

function PrivacyCopy() {
  return (
    <>
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
        You can request updates or deletion of your account by contacting info@ridewithcmt.com
        or calling (774) 622-3789.
      </p>
    </>
  );
}
