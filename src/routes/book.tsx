import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  Stethoscope,
  Building2,
  HeartPulse,
  MapPinned,
  MapPin,
  Home,
  Star,
} from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { StepIndicator } from "@/components/arc/StepIndicator";
import { ArcButton } from "@/components/arc/Button";
import { ArcInput } from "@/components/arc/Input";
import { BottomNav } from "@/components/arc/BottomNav";
import {
  bookingStore,
  useBooking,
  RIDE_TYPE_LABELS,
  type RideType,
  type MobilityNeed,
  type CoveragePlan,
} from "@/lib/booking-store";

export const Route = createFileRoute("/book")({
  component: BookFlow,
  head: () => ({ meta: [{ title: "Book a Ride · CMT" }] }),
});

const TOTAL = 7;

const rideTypes: { id: RideType; title: string; desc: string; icon: typeof Stethoscope }[] = [
  {
    id: "medical-appointment",
    title: "Medical Appointment",
    desc: "Doctor visits, specialists, labs, and imaging.",
    icon: Stethoscope,
  },
  {
    id: "healthcare-facility",
    title: "Healthcare Facility Visit",
    desc: "Hospitals, clinics, dialysis, and outpatient centers.",
    icon: Building2,
  },
  {
    id: "treatment-program",
    title: "Treatment Program (recurring)",
    desc: "Repeat rides for ongoing treatment schedules.",
    icon: HeartPulse,
  },
  {
    id: "approved-destination",
    title: "Approved Destination (other)",
    desc: "Pharmacies and other broker-approved trips.",
    icon: MapPinned,
  },
];

function BookFlow() {
  const [step, setStep] = useState(1);
  const b = useBooking();
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, TOTAL));
  const prev = () => (step === 1 ? navigate({ to: "/home" }) : setStep(step - 1));

  const submit = () => {
    const ref =
      "CMT-" +
      Math.floor(1000 + Math.random() * 9000) +
      "-" +
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    bookingStore.set({ referenceId: ref });
    setStep(7);
  };

  const canContinue = (() => {
    if (step === 1) return !!b.rideType;
    if (step === 2) return !!b.pickup && !!b.dropoff;
    if (step === 3) return !!b.date && !!b.time;
    if (step === 4) return !!b.mobility;
    if (step === 5) return !!b.coverage;
    return true;
  })();

  if (step === 7) return <StepConfirmation />;

  return (
    <AppShell>
      <ScreenHeader
        title={`Book a Ride · ${step} of 6`}
        backTo={step === 1 ? "/home" : undefined}
        right={
          step > 1 ? (
            <button onClick={prev} className="min-h-11 px-2 text-sm font-semibold text-[#0a6bdb]">
              Back
            </button>
          ) : null
        }
      />
      <StepIndicator total={6} current={step} />

      <div className="px-4 pb-32">
        {step === 1 && <StepRideType />}
        {step === 2 && <StepLocations />}
        {step === 3 && <StepDateTime />}
        {step === 4 && <StepMobility />}
        {step === 5 && <StepCoverage />}
        {step === 6 && <StepReview onEdit={setStep} />}
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-[#dce3ec] bg-white p-4">
        <ArcButton block disabled={!canContinue} onClick={step === 6 ? submit : next}>
          {step === 6 ? "Confirm Booking" : "Continue"}
        </ArcButton>
      </div>
    </AppShell>
  );
}

function StepRideType() {
  const b = useBooking();
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-[#032558]">
        What type of transportation do you need?
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {rideTypes.map((r) => {
          const selected = b.rideType === r.id;
          return (
            <li key={r.id}>
              <button
                onClick={() => bookingStore.set({ rideType: r.id })}
                className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left ${
                  selected ? "border-[#0a6bdb] bg-[#0a6bdb]/6" : "border-[#dce3ec] bg-white"
                }`}
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#0a6bdb]/10 text-[#0a6bdb]">
                  <r.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#032558]">{r.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#5C6B7A]">{r.desc}</p>
                </div>
                <span
                  className={`mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full border ${
                    selected ? "border-[#0a6bdb] bg-[#0a6bdb]" : "border-[#dce3ec] bg-white"
                  }`}
                >
                  {selected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const SAVED = [
  { label: "Home", value: "116 Wilson Ave, Spencer, MA 01562" },
  { label: "Wellspring Medical Center", value: "100 Front St, Worcester, MA 01608" },
  { label: "UMass Memorial", value: "55 Lake Ave N, Worcester, MA 01655" },
];

function StepLocations() {
  const b = useBooking();
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-[#032558]">
        Pickup & Destination
      </h2>
      <div className="mt-5 flex flex-col gap-4">
        <ArcInput
          label="Pickup Location"
          value={b.pickup ?? ""}
          onChange={(e) => bookingStore.set({ pickup: e.target.value, pickupLabel: e.target.value })}
          placeholder="Search address"
          prefixIcon={<MapPin className="h-4 w-4" />}
        />
        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() =>
              bookingStore.set({
                pickup: "Current location · Spencer, MA",
                pickupLabel: "Current location",
              })
            }
            className="flex min-h-10 flex-none items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-[#032558] ring-1 ring-[#dce3ec]"
          >
            <MapPin className="h-3.5 w-3.5 text-[#0a6bdb]" /> Current location
          </button>
          {SAVED.slice(0, 1).map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => bookingStore.set({ pickup: s.value, pickupLabel: s.label })}
              className="flex min-h-10 flex-none items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-[#032558] ring-1 ring-[#dce3ec]"
            >
              <Home className="h-3.5 w-3.5 text-[#0a6bdb]" /> {s.label}
            </button>
          ))}
        </div>

        <ArcInput
          label="Drop-off Location / Destination"
          value={b.dropoff ?? ""}
          onChange={(e) =>
            bookingStore.set({ dropoff: e.target.value, dropoffLabel: e.target.value })
          }
          placeholder="Facility name or address"
          prefixIcon={<MapPinned className="h-4 w-4" />}
        />
        <div className="flex gap-2 overflow-x-auto">
          {SAVED.slice(1).map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => bookingStore.set({ dropoff: s.value, dropoffLabel: s.label })}
              className="flex min-h-10 flex-none items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-[#032558] ring-1 ring-[#dce3ec]"
            >
              <Star className="h-3.5 w-3.5 text-[#0a6bdb]" /> {s.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(3,37,88,0.06)]">
          <img
            alt="Route preview"
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=70"
            className="h-36 w-full object-cover"
          />
          <p className="px-4 py-3 text-xs leading-relaxed text-[#5C6B7A]">
            Mini map preview · {b.pickupLabel || "Pickup"} → {b.dropoffLabel || "Destination"}
          </p>
        </div>
      </div>
    </div>
  );
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function StepDateTime() {
  const b = useBooking();
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString(undefined, { weekday: "short" }),
      num: d.getDate(),
    };
  });
  const times = ["8:00 AM", "9:00 AM", "9:30 AM", "10:30 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

  const toggleDay = (day: string) => {
    const current = b.recurringDays ?? [];
    bookingStore.set({
      recurringDays: current.includes(day) ? current.filter((d) => d !== day) : [...current, day],
    });
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-[#032558]">Date & Time</h2>
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {days.map((d) => {
          const sel = b.date === d.key;
          return (
            <button
              key={d.key}
              onClick={() => bookingStore.set({ date: d.key })}
              className={`flex h-20 w-16 flex-none flex-col items-center justify-center rounded-2xl ${
                sel ? "bg-[#0a6bdb] text-white" : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                {d.day}
              </span>
              <span className="text-2xl font-extrabold leading-none">{d.num}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-xs font-bold uppercase tracking-wide text-[#5C6B7A]">Time</p>
      <div className="mt-2 flex gap-2">
        {(["Morning", "Afternoon", "Exact"] as const).map((slot) => {
          const sel = b.timeSlot === slot || b.time === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => {
                if (sel) {
                  bookingStore.set({ timeSlot: undefined, time: undefined });
                  return;
                }
                bookingStore.set({
                  timeSlot: slot,
                  time: slot === "Exact" ? undefined : slot,
                });
              }}
              className={`min-h-11 flex-1 text-xs font-bold ${
                sel
                  ? "bg-[#0a6bdb] text-white"
                  : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
      {(b.timeSlot === "Exact" || !b.timeSlot) && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {times.map((t) => {
            const sel = b.time === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  if (sel) {
                    bookingStore.set({ time: undefined, timeSlot: undefined });
                    return;
                  }
                  bookingStore.set({ time: t, timeSlot: "Exact" });
                }}
                className={`h-11 text-xs font-bold ${
                  sel ? "bg-[#032558] text-white" : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      )}

      <div className="cmt-card mt-6 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#032558]">Ride schedule</p>
            <p className="text-xs text-[#5C6B7A]">
              {b.recurring ? "Recurring Ride" : "One-Time Ride"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => bookingStore.set({ recurring: !b.recurring })}
            className={`flex h-7 w-12 items-center rounded-full p-0.5 ${
              b.recurring ? "justify-end bg-[#0a6bdb]" : "justify-start bg-[#dce3ec]"
            }`}
            aria-label="Toggle recurring"
          >
            <span className="h-6 w-6 rounded-full bg-white shadow" />
          </button>
        </div>
        {b.recurring && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map((d) => {
                const on = b.recurringDays?.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    className={`min-h-10 rounded-full px-3 text-xs font-bold ${
                      on ? "bg-[#0a6bdb] text-white" : "bg-[#F5F7FA] text-[#032558]"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
            <div className="mt-3">
              <ArcInput
                label="End date"
                type="date"
                value={b.recurringEnd ?? ""}
                onChange={(e) => bookingStore.set({ recurringEnd: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      <div className="cmt-card mt-3 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[#032558]">Do you need a return ride?</p>
          <button
            type="button"
            onClick={() => bookingStore.set({ returnRide: !b.returnRide })}
            className={`flex h-7 w-12 items-center rounded-full p-0.5 ${
              b.returnRide ? "justify-end bg-[#0a6bdb]" : "justify-start bg-[#dce3ec]"
            }`}
            aria-label="Toggle return ride"
          >
            <span className="h-6 w-6 rounded-full bg-white shadow" />
          </button>
        </div>
        {b.returnRide && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["2:00 PM", "3:00 PM", "4:00 PM", "Call when ready"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  bookingStore.set({ returnTime: b.returnTime === t ? undefined : t })
                }
                className={`min-h-11 rounded-xl text-xs font-bold ${
                  b.returnTime === t
                    ? "bg-[#0a6bdb] text-white"
                    : "bg-[#F5F7FA] text-[#032558]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const MOBILITY: MobilityNeed[] = [
  "Ambulatory",
  "Wheelchair",
  "Stretcher",
  "Walker/Cane Assistance",
];

function StepMobility() {
  const b = useBooking();
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-[#032558]">
        Mobility & Special Requirements
      </h2>
      <div className="mt-4 flex flex-col gap-2">
        {MOBILITY.map((m) => {
          const sel = b.mobility === m;
          return (
            <button
              key={m}
              onClick={() => bookingStore.set({ mobility: m })}
              className={`flex min-h-14 items-center justify-between rounded-2xl px-4 text-left text-sm font-bold ${
                sel ? "bg-[#0a6bdb] text-white" : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
              }`}
            >
              {m}
              {sel && <Check className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
      <div className="mt-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#5C6B7A]">
          Additional notes
        </label>
        <textarea
          value={b.notes ?? ""}
          onChange={(e) => bookingStore.set({ notes: e.target.value })}
          rows={4}
          placeholder="e.g., needs assistance carrying oxygen tank"
          className="w-full resize-none rounded-xl border border-transparent bg-[#eef1f6] p-4 text-sm text-[#032558] placeholder:text-[#5C6B7A]/60 focus:border-[#032558] focus:outline-none focus:ring-2 focus:ring-[#032558]/10"
        />
      </div>
      <div className="cmt-card mt-4 flex items-center justify-between p-4">
        <p className="text-sm font-bold text-[#032558]">Will someone be riding with you?</p>
        <button
          type="button"
          onClick={() => bookingStore.set({ companion: !b.companion })}
          className={`flex h-7 w-12 items-center rounded-full p-0.5 ${
            b.companion ? "justify-end bg-[#0a6bdb]" : "justify-start bg-[#dce3ec]"
          }`}
          aria-label="Toggle companion"
        >
          <span className="h-6 w-6 rounded-full bg-white shadow" />
        </button>
      </div>
    </div>
  );
}

const COVERAGE: CoveragePlan[] = [
  "MassHealth/PT-1",
  "Transportation Broker (select)",
  "Private Pay",
  "Other",
];

function StepCoverage() {
  const b = useBooking();
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-[#032558]">
        Confirm Your Transportation Authorization
      </h2>
      <div className="mt-4 flex flex-col gap-2">
        {COVERAGE.map((c) => {
          const sel = b.coverage === c;
          return (
            <button
              key={c}
              onClick={() => bookingStore.set({ coverage: c })}
              className={`flex min-h-14 items-center justify-between rounded-2xl px-4 text-left text-sm font-bold ${
                sel ? "bg-[#0a6bdb] text-white" : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
              }`}
            >
              {c}
              {sel && <Check className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        <ArcInput
          label="Authorization / Reference Number"
          value={b.authNumber ?? ""}
          onChange={(e) => bookingStore.set({ authNumber: e.target.value })}
          placeholder="Optional"
        />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#5C6B7A]">
        Your health plan, PT-1, or transportation broker authorizes your eligible transportation.
      </p>
    </div>
  );
}

function StepReview({ onEdit }: { onEdit: (n: number) => void }) {
  const b = useBooking();
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-[#032558]">Review & Confirm</h2>
      <p className="mt-1 text-sm text-[#5C6B7A]">Estimated arrival window: 15–20 minutes before pickup.</p>
      <div className="cmt-card mt-4">
        <Row
          label="Ride type"
          value={b.rideType ? RIDE_TYPE_LABELS[b.rideType] : "—"}
          onEdit={() => onEdit(1)}
        />
        <Row
          label="Pickup"
          value={b.pickupLabel || b.pickup || "—"}
          onEdit={() => onEdit(2)}
        />
        <Row
          label="Drop-off"
          value={b.dropoffLabel || b.dropoff || "—"}
          onEdit={() => onEdit(2)}
        />
        <Row
          label="Date & time"
          value={b.date && b.time ? `${b.date} · ${b.time}` : "—"}
          onEdit={() => onEdit(3)}
        />
        <Row label="Mobility" value={b.mobility ?? "—"} onEdit={() => onEdit(4)} />
        <Row label="Coverage" value={b.coverage ?? "—"} onEdit={() => onEdit(5)} last />
      </div>
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
    <div className={`flex items-start justify-between gap-4 p-4 ${last ? "" : "border-b border-[#eef1f6]"}`}>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5C6B7A]">{label}</p>
        <p className="mt-1 text-sm text-[#032558]">{value}</p>
      </div>
      <button onClick={onEdit} className="text-sm font-semibold text-[#0a6bdb]">
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
        <div className="cmt-check-in flex h-24 w-24 items-center justify-center rounded-full bg-[#1FA463] text-white">
          <Check className="h-12 w-12" strokeWidth={3} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#032558]">
          Your Ride is Confirmed!
        </h1>
        <div className="cmt-card mt-6 w-full p-4 text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#5C6B7A]">Ride ID</p>
          <p className="text-lg font-extrabold text-[#0a6bdb]">{b.referenceId ?? "—"}</p>
          <p className="mt-3 text-sm text-[#032558]">
            {b.date} · {b.time}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#5C6B7A]">
            {b.pickupLabel || b.pickup} → {b.dropoffLabel || b.dropoff}
          </p>
          <p className="mt-3 text-xs font-semibold text-[#0a6bdb]">Driver assignment: Pending</p>
        </div>
        <div className="mt-8 flex w-full flex-col gap-3">
          <Link to="/track/$id" params={{ id: "ride_1001" }} className="w-full">
            <ArcButton
              block
              onClick={() => {
                bookingStore.reset();
              }}
            >
              Track This Ride
            </ArcButton>
          </Link>
          <ArcButton
            block
            variant="secondary"
            onClick={() => {
              const title = encodeURIComponent("CMT Medical Ride");
              const details = encodeURIComponent(
                `${b.pickupLabel || "Pickup"} to ${b.dropoffLabel || "Destination"}`,
              );
              window.open(
                `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`,
                "_blank",
              );
            }}
          >
            Add to Calendar
          </ArcButton>
          <ArcButton
            block
            variant="ghost"
            onClick={() => {
              bookingStore.reset();
              navigate({ to: "/home" });
            }}
          >
            Back to Home
          </ArcButton>
        </div>
      </div>
      <BottomNav />
    </AppShell>
  );
}
