import { useSyncExternalStore } from "react";

export type RideType =
  | "medical-appointment"
  | "healthcare-facility"
  | "treatment-program"
  | "approved-destination";

export type MobilityNeed =
  | "Ambulatory"
  | "Wheelchair"
  | "Stretcher"
  | "Walker/Cane Assistance"
  | "None";

export type CoveragePlan =
  | "MassHealth/PT-1"
  | "Transportation Broker (select)"
  | "Private Pay"
  | "Other";

export interface BookingState {
  rideType?: RideType;
  pickup?: string;
  pickupLabel?: string;
  dropoff?: string;
  dropoffLabel?: string;
  date?: string;
  time?: string;
  timeSlot?: "Morning" | "Afternoon" | "Exact";
  recurring?: boolean;
  recurringDays?: string[];
  recurringEnd?: string;
  returnRide?: boolean;
  returnTime?: string;
  mobility?: MobilityNeed;
  notes?: string;
  companion?: boolean;
  coverage?: CoveragePlan;
  brokerName?: string;
  authNumber?: string;
  referenceId?: string;
}

let state: BookingState = {
  mobility: "Ambulatory",
  coverage: "MassHealth/PT-1",
  pickup: "116 Wilson Ave, Spencer, MA 01562",
  pickupLabel: "Home",
};

const listeners = new Set<() => void>();

export const bookingStore = {
  get: () => state,
  set: (patch: Partial<BookingState>) => {
    state = { ...state, ...patch };
    listeners.forEach((l) => l());
  },
  reset: () => {
    state = {
      mobility: "Ambulatory",
      coverage: "MassHealth/PT-1",
      pickup: "116 Wilson Ave, Spencer, MA 01562",
      pickupLabel: "Home",
    };
    listeners.forEach((l) => l());
  },
  subscribe: (fn: () => void) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};

export function useBooking() {
  return useSyncExternalStore(bookingStore.subscribe, bookingStore.get, bookingStore.get);
}

export const RIDE_TYPE_LABELS: Record<RideType, string> = {
  "medical-appointment": "Medical Appointment",
  "healthcare-facility": "Healthcare Facility Visit",
  "treatment-program": "Treatment Program",
  "approved-destination": "Approved Destination",
};
