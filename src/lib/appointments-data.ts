import type { RideStatus } from "@/components/arc/StatusBadge";

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  month: string;
  status: RideStatus;
  pickup: string;
  destination: string;
  address: string;
  notes?: string;
  reference: string;
  driver?: string;
  driverPhoto?: string;
  vehicle?: string;
  plate?: string;
  rating?: number;
  cancelReason?: string;
}

export const UPCOMING: Appointment[] = [
  {
    id: "ride_1001",
    serviceId: "medical-appointment",
    serviceName: "Medical Appointment",
    date: "Tue, Sep 15 · 9:30 AM",
    month: "September 2026",
    status: "Confirmed",
    pickup: "116 Wilson Ave, Spencer, MA",
    destination: "Wellspring Medical Center",
    address: "116 Wilson Ave → Wellspring Medical Center",
    notes: "Please allow extra time for walker assistance.",
    reference: "CMT-8842-KL",
    driver: "Marcus D.",
    driverPhoto:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    vehicle: "2023 Toyota Camry · White",
    plate: "CMT 3789",
    rating: 4.9,
  },
  {
    id: "ride_1002",
    serviceId: "treatment-program",
    serviceName: "Treatment Program",
    date: "Thu, Sep 17 · 1:00 PM",
    month: "September 2026",
    status: "Confirmed",
    pickup: "116 Wilson Ave, Spencer, MA",
    destination: "Harbor Wellness Clinic",
    address: "116 Wilson Ave → Harbor Wellness Clinic",
    reference: "CMT-8901-QT",
  },
];

export const PAST: Appointment[] = [
  {
    id: "ride_0902",
    serviceId: "healthcare-facility",
    serviceName: "Healthcare Facility Visit",
    date: "Mon, Aug 24 · 10:00 AM",
    month: "August 2026",
    status: "Completed",
    pickup: "116 Wilson Ave, Spencer, MA",
    destination: "UMass Memorial Medical Center",
    address: "116 Wilson Ave → UMass Memorial Medical Center",
    reference: "CMT-8410-XF",
    driver: "Elena R.",
  },
  {
    id: "ride_0871",
    serviceId: "medical-appointment",
    serviceName: "Medical Appointment",
    date: "Wed, Aug 12 · 8:15 AM",
    month: "August 2026",
    status: "Completed",
    pickup: "116 Wilson Ave, Spencer, MA",
    destination: "Spencer Family Practice",
    address: "116 Wilson Ave → Spencer Family Practice",
    reference: "CMT-8199-DA",
  },
];

export const CANCELLED: Appointment[] = [
  {
    id: "ride_0755",
    serviceId: "approved-destination",
    serviceName: "Approved Destination",
    date: "Thu, Jul 16 · 2:00 PM",
    month: "July 2026",
    status: "Cancelled",
    pickup: "116 Wilson Ave, Spencer, MA",
    destination: "Pharmacy pickup — CVS Spencer",
    address: "116 Wilson Ave → CVS Spencer",
    reference: "CMT-7788-MJ",
    cancelReason: "Appointment was rescheduled by the clinic.",
  },
];

export const ALL_APPOINTMENTS = [...UPCOMING, ...PAST, ...CANCELLED];

export const getAppointment = (id: string) => ALL_APPOINTMENTS.find((a) => a.id === id);

export function statusColor(status: RideStatus) {
  switch (status) {
    case "Confirmed":
      return "bg-[#0a6bdb]/12 text-[#0a6bdb]";
    case "En Route":
    case "Arrived":
    case "In Progress":
      return "bg-amber-100 text-amber-700";
    case "Completed":
      return "bg-[#1FA463]/12 text-[#1FA463]";
    case "Cancelled":
      return "bg-red-50 text-red-600";
  }
}
