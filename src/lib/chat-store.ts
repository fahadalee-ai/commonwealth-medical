import { ALL_APPOINTMENTS } from "@/lib/appointments-data";

export type ChatFrom = "me" | "cmt";

export interface ChatMessage {
  from: ChatFrom;
  text: string;
  time: string;
}

const seed: Record<string, ChatMessage[]> = {
  ride_1001: [
    {
      from: "cmt",
      text: "Your ride CMT-8842-KL is confirmed for Tuesday 9:30 AM to Wellspring Medical Center.",
      time: "8:12 AM",
    },
    {
      from: "cmt",
      text: "Driver assignment is pending. We will message you here when a driver is assigned.",
      time: "8:13 AM",
    },
  ],
  ride_1002: [
    {
      from: "cmt",
      text: "Your Thursday treatment ride CMT-8901-QT to Harbor Wellness Clinic is confirmed.",
      time: "Yesterday",
    },
  ],
  ride_0902: [
    {
      from: "cmt",
      text: "Thanks for riding with CMT to UMass Memorial. Reply here if you need a receipt or another trip.",
      time: "Aug 24",
    },
  ],
  ride_0871: [
    {
      from: "me",
      text: "Can I book the same pickup for my next visit?",
      time: "Aug 12",
    },
    {
      from: "cmt",
      text: "Yes — open Book again from that ride, or tell us the new appointment time here.",
      time: "Aug 12",
    },
  ],
  ride_0755: [
    {
      from: "cmt",
      text: "Ride CMT-7788-MJ was cancelled because the clinic rescheduled. Message us if you need a new pickup.",
      time: "Jul 16",
    },
  ],
};

const threads: Record<string, ChatMessage[]> = { ...seed };

function nowLabel() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function fallbackThread(bookingId: string): ChatMessage[] {
  const ride = ALL_APPOINTMENTS.find((a) => a.id === bookingId);
  const bookingLabel = ride?.reference ?? bookingId;
  return [
    {
      from: "cmt",
      text: `This is CMT dispatch for booking ${bookingLabel}. How can we help?`,
      time: nowLabel(),
    },
  ];
}

export function getMessages(bookingId: string): ChatMessage[] {
  return threads[bookingId] ?? fallbackThread(bookingId);
}

export function getLastMessage(bookingId: string): ChatMessage | undefined {
  const messages = getMessages(bookingId);
  return messages[messages.length - 1];
}

export function sendMessage(bookingId: string, text: string): ChatMessage[] {
  const current = threads[bookingId] ?? fallbackThread(bookingId);
  const next = [
    ...current,
    { from: "me" as const, text, time: nowLabel() },
    {
      from: "cmt" as const,
      text: "Thanks — a dispatcher will follow up on this booking shortly. For urgent changes, call (774) 622-3789.",
      time: nowLabel(),
    },
  ];
  threads[bookingId] = next;
  return next;
}
