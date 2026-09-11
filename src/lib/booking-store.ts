import { useSyncExternalStore } from "react";

export interface BookingState {
  serviceId?: string;
  date?: string;
  time?: string;
  street?: string;
  unit?: string;
  city?: string;
  state?: string;
  zip?: string;
  useCurrentLocation?: boolean;
  notes?: string;
  photos?: string[];
  phone?: string;
  contactMethod?: "Call" | "Text" | "Email";
  referenceId?: string;
}

let state: BookingState = {
  phone: "(555) 123-4567",
  contactMethod: "Call",
  photos: [],
};
const listeners = new Set<() => void>();

export const bookingStore = {
  get: () => state,
  set: (patch: Partial<BookingState>) => {
    state = { ...state, ...patch };
    listeners.forEach((l) => l());
  },
  reset: () => {
    state = { phone: "(555) 123-4567", contactMethod: "Call", photos: [] };
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
  return useSyncExternalStore(
    bookingStore.subscribe,
    bookingStore.get,
    bookingStore.get,
  );
}