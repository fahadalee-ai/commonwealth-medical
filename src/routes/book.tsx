import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, MapPin, Check } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { StepIndicator } from "@/components/arc/StepIndicator";
import { ArcButton } from "@/components/arc/Button";
import { ArcInput } from "@/components/arc/Input";
import { SERVICES, getService } from "@/lib/services-data";
import { bookingStore, useBooking } from "@/lib/booking-store";

export const Route = createFileRoute("/book")({
  component: BookFlow,
  head: () => ({ meta: [{ title: "Book an Appointment · ARC" }] }),
});

const TOTAL = 6;

function BookFlow() {
  const [step, setStep] = useState(1);
  const b = useBooking();
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, TOTAL));
  const prev = () => (step === 1 ? navigate({ to: "/home" }) : setStep(step - 1));

  const submit = () => {
    const ref = "ARC-" + Math.floor(1000 + Math.random() * 9000) + "-" +
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    bookingStore.set({ referenceId: ref });
    setStep(6);
  };

  const canContinue = (() => {
    if (step === 1) return !!b.serviceId;
    if (step === 2) return !!b.date && !!b.time;
    if (step === 3) return !!b.street && !!b.city && !!b.state && !!b.zip;
    if (step === 4) return true;
    if (step === 5) return true;
    return true;
  })();

  if (step === 6) return <StepConfirmation />;

  return (
    <AppShell>
      <ScreenHeader
        title={`Book · Step ${step} of 5`}
        backTo={step === 1 ? "/home" : undefined}
        right={
          step > 1 ? (
            <button
              onClick={prev}
              className="text-xs font-bold uppercase tracking-widest text-[#FFC107]"
            >
              Back
            </button>
          ) : null
        }
      />
      <StepIndicator total={5} current={step} />

      <div className="px-4 pb-32">
        {step === 1 && <StepService />}
        {step === 2 && <StepDateTime />}
        {step === 3 && <StepLocation />}
        {step === 4 && <StepDetails />}
        {step === 5 && <StepReview onEdit={setStep} />}
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-[#2A2A2A] bg-[#0D0D0D] p-4">
        <ArcButton
          block
          disabled={!canContinue}
          onClick={step === 5 ? submit : next}
        >
          {step === 5 ? "Submit Booking Request" : "Continue"}
        </ArcButton>
      </div>
    </AppShell>
  );
}

function StepService() {
  const b = useBooking();
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight">What service do you need?</h2>
      <p className="mt-1 text-xs text-[#8A8A8A]">Choose one to continue.</p>
      <ul className="mt-4 flex flex-col">
        {SERVICES.map((s) => {
          const selected = b.serviceId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => bookingStore.set({ serviceId: s.id })}
                className={`flex w-full items-center gap-3 border p-3 text-left ${selected ? "border-[#E31E24] bg-[#161616]" : "border-[#2A2A2A] bg-[#161616]"} mb-2`}
              >
                <div className="h-14 w-14 flex-none overflow-hidden">
                  <img src={s.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{s.name}</p>
                  <p className="truncate text-xs text-[#8A8A8A]">{s.short}</p>
                </div>
                <span
                  className={`flex h-6 w-6 flex-none items-center justify-center border ${selected ? "border-[#E31E24] bg-[#E31E24]" : "border-[#2A2A2A] bg-[#0D0D0D]"}`}
                >
                  {selected && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StepDateTime() {
  const b = useBooking();
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const day = d.toLocaleDateString(undefined, { weekday: "short" });
    const num = d.getDate();
    const key = d.toISOString().slice(0, 10);
    return { key, day, num };
  });
  const times = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight">Choose a Date & Time.</h2>
      <p className="mt-1 text-xs text-[#8A8A8A]">
        All times are local. Booking is subject to confirmation.
      </p>

      <div className="mt-4 flex gap-2 overflow-x-auto">
        {days.map((d) => {
          const sel = b.date === d.key;
          return (
            <button
              key={d.key}
              onClick={() => bookingStore.set({ date: d.key })}
              className={`flex h-20 w-16 flex-none flex-col items-center justify-center border ${sel ? "border-[#E31E24] bg-[#E31E24] text-white" : "border-[#2A2A2A] bg-[#161616] text-white"}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                {d.day}
              </span>
              <span className="text-2xl font-extrabold leading-none">{d.num}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#8A8A8A]">
        Available Time Slots
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {times.map((t) => {
          const sel = b.time === t;
          return (
            <button
              key={t}
              onClick={() => bookingStore.set({ time: t })}
              className={`h-11 border px-2 text-xs font-bold ${sel ? "border-[#FFC107] bg-[#FFC107] text-black" : "border-[#2A2A2A] bg-[#161616] text-white"}`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepLocation() {
  const b = useBooking();
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight">Where do you need this service?</h2>
      <div className="mt-6 flex flex-col gap-4">
        <ArcInput
          label="Street Address"
          value={b.street ?? ""}
          onChange={(e) => bookingStore.set({ street: e.target.value })}
          placeholder="123 Main St"
        />
        <ArcInput
          label="Apartment / Unit (optional)"
          value={b.unit ?? ""}
          onChange={(e) => bookingStore.set({ unit: e.target.value })}
          placeholder="Apt 4B"
        />
        <ArcInput
          label="City"
          value={b.city ?? ""}
          onChange={(e) => bookingStore.set({ city: e.target.value })}
          placeholder="Springfield"
        />
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8A8A8A]">
            State
          </label>
          <select
            value={b.state ?? ""}
            onChange={(e) => bookingStore.set({ state: e.target.value })}
            className="h-12 w-full border border-[#2A2A2A] bg-[#161616] px-4 text-sm text-white focus:border-[#FFC107] focus:outline-none"
          >
            <option value="">Select State</option>
            {["MA", "CT", "NY", "NJ", "RI", "VT", "NH", "ME"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <ArcInput
          label="ZIP Code"
          value={b.zip ?? ""}
          onChange={(e) => bookingStore.set({ zip: e.target.value })}
          placeholder="01103"
        />

        <div className="mt-2 flex items-center justify-between border border-[#2A2A2A] bg-[#161616] p-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-[#FFC107]" />
            <span className="text-sm font-bold">Use my current location</span>
          </div>
          <button
            type="button"
            onClick={() => bookingStore.set({ useCurrentLocation: !b.useCurrentLocation })}
            className={`flex h-6 w-11 items-center p-0.5 ${b.useCurrentLocation ? "justify-end bg-[#E31E24]" : "justify-start bg-[#2A2A2A]"}`}
            aria-label="Toggle location"
          >
            <span className="h-5 w-5 bg-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StepDetails() {
  const b = useBooking();
  const methods: Array<"Call" | "Text" | "Email"> = ["Call", "Text", "Email"];
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight">Tell us more about the job.</h2>

      <div className="mt-4">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8A8A8A]">
          Job Description
        </label>
        <textarea
          value={b.notes ?? ""}
          onChange={(e) => bookingStore.set({ notes: e.target.value })}
          rows={4}
          placeholder="Describe what you need done, e.g., 'Need 2 new outlets in the kitchen.'"
          className="w-full resize-none border border-[#2A2A2A] bg-[#161616] p-4 text-sm text-white placeholder:text-[#5a5a5a] focus:border-[#FFC107] focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8A8A8A]">
          Photos (optional)
        </label>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className="flex aspect-square items-center justify-center border border-dashed border-[#2A2A2A] bg-[#161616] text-[#8A8A8A]"
            >
              <Camera className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <ArcInput
          label="Contact Phone"
          value={b.phone ?? ""}
          onChange={(e) => bookingStore.set({ phone: e.target.value })}
          type="tel"
        />
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8A8A8A]">
          Preferred contact method
        </p>
        <div className="grid grid-cols-3 gap-2">
          {methods.map((m) => {
            const sel = b.contactMethod === m;
            return (
              <button
                key={m}
                onClick={() => bookingStore.set({ contactMethod: m })}
                className={`h-11 border text-xs font-bold ${sel ? "border-[#E31E24] bg-[#E31E24] text-white" : "border-[#2A2A2A] bg-[#161616] text-white"}`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepReview({ onEdit }: { onEdit: (n: number) => void }) {
  const b = useBooking();
  const service = b.serviceId ? getService(b.serviceId) : undefined;
  const address = [b.street, b.unit, b.city, b.state, b.zip].filter(Boolean).join(", ");

  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight">Review Your Booking.</h2>
      <p className="mt-1 text-xs text-[#8A8A8A]">Double-check before submitting.</p>

      <div className="mt-4 border border-[#2A2A2A] bg-[#161616]">
        <Row label="Service" value={service?.name ?? "—"} onEdit={() => onEdit(1)} />
        <Row
          label="Date & Time"
          value={b.date && b.time ? `${b.date} · ${b.time}` : "—"}
          onEdit={() => onEdit(2)}
        />
        <Row label="Address" value={address || "—"} onEdit={() => onEdit(3)} />
        <Row label="Notes" value={b.notes || "—"} onEdit={() => onEdit(4)} />
        <Row
          label="Contact"
          value={`${b.phone ?? "—"} · ${b.contactMethod ?? "Call"}`}
          onEdit={() => onEdit(4)}
          last
        />
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-[#8A8A8A]">
        Submitting sends your request to our dispatch team. Final confirmation
        arrives once a technician has been assigned to your appointment.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  onEdit,
  last,
}: {
  label: string;
  value: string;
  onEdit: () => void;
  last?: boolean;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 p-4 ${last ? "" : "border-b border-[#2A2A2A]"}`}>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">
          {label}
        </p>
        <p className="mt-1 text-sm text-white">{value}</p>
      </div>
      <button onClick={onEdit} className="text-[11px] font-bold uppercase tracking-widest text-[#FFC107]">
        Edit
      </button>
    </div>
  );
}

function StepConfirmation() {
  const b = useBooking();
  const navigate = useNavigate();
  return (
    <AppShell>
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-10 text-center">
        <div className="flex h-24 w-24 items-center justify-center border-2 border-[#FFC107] text-[#FFC107]">
          <Check className="h-12 w-12" strokeWidth={3} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Request Submitted!</h1>
        <p className="mt-3 max-w-xs text-sm text-[#8A8A8A]">
          Your appointment request has been received. You&apos;ll get a confirmation
          once it&apos;s approved by our team.
        </p>

        <div className="mt-6 w-full border border-[#2A2A2A] bg-[#161616] p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">
            Booking Reference
          </p>
          <p className="mt-1 text-lg font-extrabold text-[#FFC107]">{b.referenceId ?? "—"}</p>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3">
          <ArcButton
            block
            onClick={() => {
              bookingStore.reset();
              navigate({ to: "/appointments" });
            }}
          >
            View My Appointments
          </ArcButton>
          <ArcButton
            block
            variant="secondary"
            onClick={() => {
              bookingStore.reset();
              navigate({ to: "/home" });
            }}
          >
            Back to Home
          </ArcButton>
        </div>
      </div>
    </AppShell>
  );
}