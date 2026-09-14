import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Check,
  ChevronDown,
  Stethoscope,
  Building2,
  HeartPulse,
  MapPinned,
  MapPin,
  Home,
  Star,
  CalendarDays,
  ShieldCheck,
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
  type CoveragePlan,
} from "@/lib/booking-store";
import confirmBg from "@/assets/onboarding/welcome.jpg";

export const Route = createFileRoute("/book")({
  component: BookFlow,
  head: () => ({ meta: [{ title: "Book a Ride · CMT" }] }),
});

const WIZARD_STEPS = 4;
const CONFIRM_STEP = 5;
const STEP_LABELS = ["Service", "Trip", "When", "Review"];
const STEP_HINTS = [
  "Choose the ride that matches your appointment.",
  "Tell us where to pick you up and where you are going.",
  "Pick a day and a time that works for you.",
  "Look everything over, then confirm your ride.",
];
const NEXT_LABELS = ["Continue to trip details", "Continue to date & time", "Review booking", "Confirm booking"];

const rideTypes: { id: RideType; title: string; desc: string; icon: typeof Stethoscope }[] = [
  {
    id: "medical-appointment",
    title: "Medical Appointment",
    desc: "Doctors, specialists, labs, and imaging.",
    icon: Stethoscope,
  },
  {
    id: "healthcare-facility",
    title: "Healthcare Facility",
    desc: "Hospitals, clinics, dialysis, and outpatient care.",
    icon: Building2,
  },
  {
    id: "treatment-program",
    title: "Treatment Program",
    desc: "Recurring rides for ongoing treatment.",
    icon: HeartPulse,
  },
  {
    id: "approved-destination",
    title: "Approved Destination",
    desc: "Pharmacies and other broker-approved stops.",
    icon: MapPinned,
  },
];

function BookFlow() {
  const [step, setStep] = useState(1);
  const b = useBooking();
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, CONFIRM_STEP));
  const prev = () => (step === 1 ? navigate({ to: "/home" }) : setStep(step - 1));

  const submit = () => {
    const ref =
      "CMT-" +
      Math.floor(1000 + Math.random() * 9000) +
      "-" +
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    bookingStore.set({ referenceId: ref });
    setStep(CONFIRM_STEP);
  };

  const canContinue = (() => {
    if (step === 1) return !!b.rideType;
    if (step === 2) return !!b.pickup && !!b.dropoff && !!b.coverage;
    if (step === 3) return !!b.date && !!b.time;
    return true;
  })();

  if (step === CONFIRM_STEP) return <StepConfirmation />;

  return (
    <AppShell>
      <ScreenHeader
        title="Book a Ride"
        backTo={step === 1 ? "/home" : undefined}
        right={
          step > 1 ? (
            <button onClick={prev} className="min-h-11 px-2 text-sm font-bold text-[#0a6bdb]">
              Back
            </button>
          ) : null
        }
      />
      <StepIndicator total={WIZARD_STEPS} current={step} labels={STEP_LABELS} />

      <div className="cmt-rise px-4 pb-8">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0a6bdb]">
          Step {step} of {WIZARD_STEPS}
        </p>
        {step === 1 && <StepRideType />}
        {step === 2 && <StepLocations />}
        {step === 3 && <StepDateTime />}
        {step === 4 && <StepReview onEdit={setStep} />}
      </div>

      <div className="sticky bottom-[calc(72px+env(safe-area-inset-bottom))] z-30 border-t border-[#e8eef6] bg-white/95 p-4 backdrop-blur">
        <ArcButton block disabled={!canContinue} onClick={step === WIZARD_STEPS ? submit : next}>
          {NEXT_LABELS[step - 1]}
        </ArcButton>
        <p className="mt-2 text-center text-[11px] text-[#5C6B7A]">{STEP_HINTS[step - 1]}</p>
      </div>
      <BottomNav />
    </AppShell>
  );
}

function StepRideType() {
  const b = useBooking();
  return (
    <div>
      <h2 className="mt-1 text-[22px] font-extrabold leading-tight tracking-tight text-[#032558]">
        What kind of ride do you need?
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-[#5C6B7A]">
        Select one. You can change this later on the review screen.
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {rideTypes.map((r) => {
          const selected = b.rideType === r.id;
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => bookingStore.set({ rideType: r.id })}
                className={`flex w-full items-center gap-3 border p-3.5 text-left transition-colors ${
                  selected
                    ? "border-[#0a6bdb] bg-[#0a6bdb] text-white"
                    : "border-transparent bg-white text-[#032558] shadow-[0_8px_24px_rgba(3,37,88,0.06)]"
                }`}
              >
                <span
                  className={`flex h-12 w-12 flex-none items-center justify-center ${
                    selected ? "bg-white/15 text-white" : "bg-[#0a6bdb]/10 text-[#0a6bdb]"
                  }`}
                >
                  <r.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-extrabold">{r.title}</p>
                  <p className={`mt-0.5 text-xs leading-relaxed ${selected ? "text-white/80" : "text-[#5C6B7A]"}`}>
                    {r.desc}
                  </p>
                </div>
                <span
                  className={`flex h-6 w-6 flex-none items-center justify-center border ${
                    selected ? "border-white bg-white text-[#0a6bdb]" : "border-[#dce3ec] bg-white"
                  }`}
                >
                  {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
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
      <h2 className="mt-1 text-[22px] font-extrabold leading-tight tracking-tight text-[#032558]">
        Pickup & destination
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-[#5C6B7A]">
        Use a saved place or type an address. Then confirm how the ride is covered.
      </p>
      <div className="mt-5 flex flex-col gap-5">
        <div>
          <ArcInput
            label="Pickup Location"
            value={b.pickup ?? ""}
            onChange={(e) => bookingStore.set({ pickup: e.target.value, pickupLabel: e.target.value })}
            placeholder="Search address"
            prefixIcon={<MapPin className="h-4 w-4" />}
          />
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            <Chip
              icon={<MapPin className="h-3.5 w-3.5" />}
              active={b.pickupLabel === "Current location"}
              onClick={() =>
                bookingStore.set({
                  pickup: "Current location · Spencer, MA",
                  pickupLabel: "Current location",
                })
              }
            >
              Current location
            </Chip>
            <Chip
              icon={<Home className="h-3.5 w-3.5" />}
              active={b.pickupLabel === "Home"}
              onClick={() => bookingStore.set({ pickup: SAVED[0].value, pickupLabel: SAVED[0].label })}
            >
              Home
            </Chip>
          </div>
        </div>

        <div>
          <ArcInput
            label="Drop-off Location / Destination"
            value={b.dropoff ?? ""}
            onChange={(e) =>
              bookingStore.set({ dropoff: e.target.value, dropoffLabel: e.target.value })
            }
            placeholder="Facility name or address"
            prefixIcon={<MapPinned className="h-4 w-4" />}
          />
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {SAVED.slice(1).map((s) => (
              <Chip
                key={s.label}
                icon={<Star className="h-3.5 w-3.5" />}
                active={b.dropoffLabel === s.label}
                onClick={() => bookingStore.set({ dropoff: s.value, dropoffLabel: s.label })}
              >
                {s.label}
              </Chip>
            ))}
          </div>
        </div>

        <CoverageDropdown />

        <div className="overflow-hidden bg-white shadow-[0_8px_24px_rgba(3,37,88,0.06)]">
          <div className="relative">
            <img
              alt="Route from pickup to destination"
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=70"
              className="h-36 w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[#032558]/80 px-4 py-2.5">
              <p className="text-[11px] font-semibold leading-relaxed text-white">
                {b.pickupLabel || "Pickup"} → {b.dropoffLabel || "Destination"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({
  children,
  icon,
  active,
  onClick,
}: {
  children: string;
  icon: ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-10 flex-none items-center gap-1.5 px-3 text-xs font-bold ${
        active ? "bg-[#032558] text-white" : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
      }`}
    >
      <span className={active ? "text-[#4da6ff]" : "text-[#0a6bdb]"}>{icon}</span>
      {children}
    </button>
  );
}

const COVERAGE: CoveragePlan[] = [
  "MassHealth/PT-1",
  "Transportation Broker (select)",
  "Private Pay",
  "Other",
];

function CoverageDropdown() {
  const b = useBooking();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative bg-white p-4 shadow-[0_8px_24px_rgba(3,37,88,0.06)]">
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-[#0a6bdb]" />
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#032558]">
          Transportation authorization
        </p>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-full items-center justify-between bg-[#eef1f6] px-4 text-left text-[15px] font-semibold text-[#032558]"
      >
        <span>{b.coverage ?? "Select authorization"}</span>
        <ChevronDown className={`h-4 w-4 text-[#5C6B7A] ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="absolute left-4 right-4 z-20 mt-1 border border-[#dce3ec] bg-white shadow-[0_8px_24px_rgba(3,37,88,0.12)]">
          {COVERAGE.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => {
                  bookingStore.set({ coverage: c });
                  setOpen(false);
                }}
                className={`flex min-h-12 w-full items-center px-4 text-left text-sm ${
                  b.coverage === c ? "bg-[#0a6bdb] font-semibold text-white" : "text-[#032558]"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
      {b.coverage === "Transportation Broker (select)" && (
        <div className="mt-3">
          <ArcInput
            label="Broker / Health Plan Name"
            value={b.brokerName ?? ""}
            onChange={(e) => bookingStore.set({ brokerName: e.target.value })}
            placeholder=" "
          />
        </div>
      )}
      <div className="mt-3">
        <ArcInput
          label="Authorization / Reference Number"
          value={b.authNumber ?? ""}
          onChange={(e) => bookingStore.set({ authNumber: e.target.value })}
          placeholder="Optional"
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#5C6B7A]">
        Eligible trips are typically $0 with MassHealth / PT-1 when authorized.
      </p>
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
      <h2 className="mt-1 text-[22px] font-extrabold leading-tight tracking-tight text-[#032558]">
        When should we pick you up?
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-[#5C6B7A]">
        Tap a day, then choose a window. Tap again to clear a time.
      </p>

      <p className="cmt-section mt-5">Date</p>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {days.map((d) => {
          const sel = b.date === d.key;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => bookingStore.set({ date: sel ? undefined : d.key })}
              className={`flex h-[84px] w-[58px] flex-none flex-col items-center justify-center ${
                sel ? "bg-[#0a6bdb] text-white" : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                {d.day}
              </span>
              <span className="mt-1 text-[22px] font-extrabold leading-none">{d.num}</span>
            </button>
          );
        })}
      </div>

      <p className="cmt-section mt-6">Time</p>
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
              className={`min-h-11 flex-1 text-xs font-extrabold ${
                sel ? "bg-[#0a6bdb] text-white" : "bg-white text-[#032558] ring-1 ring-[#dce3ec]"
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
                className={`h-11 text-xs font-extrabold ${
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
            <p className="text-sm font-extrabold text-[#032558]">Ride schedule</p>
            <p className="text-xs text-[#5C6B7A]">
              {b.recurring ? "Recurring ride" : "One-time ride"}
            </p>
          </div>
          <Switch on={!!b.recurring} onClick={() => bookingStore.set({ recurring: !b.recurring })} label="Toggle recurring" />
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
                    className={`min-h-10 px-3 text-xs font-extrabold ${
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
          <p className="text-sm font-extrabold text-[#032558]">Need a return ride?</p>
          <Switch
            on={!!b.returnRide}
            onClick={() => bookingStore.set({ returnRide: !b.returnRide })}
            label="Toggle return ride"
          />
        </div>
        {b.returnRide && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["2:00 PM", "3:00 PM", "4:00 PM", "Call when ready"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => bookingStore.set({ returnTime: b.returnTime === t ? undefined : t })}
                className={`min-h-11 text-xs font-extrabold ${
                  b.returnTime === t ? "bg-[#0a6bdb] text-white" : "bg-[#F5F7FA] text-[#032558]"
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

function Switch({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={`flex h-7 w-12 items-center p-0.5 ${on ? "justify-end bg-[#0a6bdb]" : "justify-start bg-[#dce3ec]"}`}
    >
      <span className="h-6 w-6 bg-white shadow" />
    </button>
  );
}

function StepReview({ onEdit }: { onEdit: (n: number) => void }) {
  const b = useBooking();
  return (
    <div>
      <h2 className="mt-1 text-[22px] font-extrabold leading-tight tracking-tight text-[#032558]">
        Review & confirm
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-[#5C6B7A]">
        Driver arrives 15–20 minutes before pickup. Edit any line if something looks off.
      </p>
      <div className="cmt-card mt-5 overflow-hidden">
        <div className="bg-[#032558] px-4 py-3 text-white">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70">
            Trip summary
          </p>
          <p className="mt-1 text-base font-extrabold">
            {b.rideType ? RIDE_TYPE_LABELS[b.rideType] : "Ride"}
          </p>
        </div>
        <Row label="Pickup" value={b.pickupLabel || b.pickup || "—"} onEdit={() => onEdit(2)} />
        <Row label="Drop-off" value={b.dropoffLabel || b.dropoff || "—"} onEdit={() => onEdit(2)} />
        <Row
          label="Date & time"
          value={b.date && b.time ? `${b.date} · ${b.time}` : "—"}
          onEdit={() => onEdit(3)}
        />
        <Row label="Authorization" value={b.coverage ?? "—"} onEdit={() => onEdit(2)} last />
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
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#5C6B7A]">{label}</p>
        <p className="mt-1 text-sm font-semibold text-[#032558]">{value}</p>
      </div>
      <button type="button" onClick={onEdit} className="text-sm font-bold text-[#0a6bdb]">
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
      <div className="relative flex min-h-dvh flex-col overflow-hidden px-6 pb-28 pt-16 text-center">
        <img
          src={confirmBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/78" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7FA]/90 via-[#F5F7FA]/70 to-[#F5F7FA]/92" />

        <div className="relative z-10 flex flex-1 flex-col">
          <div className="cmt-check-in mx-auto flex h-20 w-20 items-center justify-center bg-[#1FA463] text-white">
            <Check className="h-10 w-10" strokeWidth={3} />
          </div>
          <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0a6bdb]">
            Booking confirmed
          </p>
          <h1 className="mt-2 text-[28px] font-extrabold leading-tight tracking-tight text-[#032558]">
            Your ride is set
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#5C6B7A]">
            Dispatch will assign a driver. Keep this ride ID for your records.
          </p>
          <div className="mt-8 bg-white p-5 text-left text-[#032558] shadow-[0_16px_40px_rgba(3,37,88,0.10)]">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#5C6B7A]">Ride ID</p>
              <CalendarDays className="h-4 w-4 text-[#0a6bdb]" />
            </div>
            <p className="mt-1 text-xl font-extrabold text-[#0a6bdb]">{b.referenceId ?? "—"}</p>
            <p className="mt-4 text-sm font-bold">
              {b.date} · {b.time}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#5C6B7A]">
              {b.pickupLabel || b.pickup} → {b.dropoffLabel || b.dropoff}
            </p>
            <p className="mt-4 bg-[#eef6ff] px-3 py-2 text-xs font-bold text-[#0a6bdb]">
              Driver assignment: Pending
            </p>
          </div>
          <div className="mt-8 flex w-full flex-col gap-3">
            <ArcButton
              block
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
            <button
              type="button"
              onClick={() => {
                bookingStore.reset();
                navigate({ to: "/home" });
              }}
              className="min-h-12 text-sm font-bold text-[#032558]"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </AppShell>
  );
}
