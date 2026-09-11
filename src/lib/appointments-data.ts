export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  status: "Pending" | "Approved" | "Rescheduled" | "Completed" | "Cancelled";
  address: string;
  notes?: string;
  reference: string;
  technician?: string;
  cancelReason?: string;
}

export const UPCOMING: Appointment[] = [
  {
    id: "apt_1001",
    serviceId: "generator-installation",
    serviceName: "Generator Installation Service",
    date: "Sat, Nov 15 · 11:00 AM",
    status: "Approved",
    address: "142 Oakridge Ave, Springfield, MA 01103",
    notes: "Standby generator install, side of house near meter.",
    reference: "ARC-8842-KL",
    technician: "Marcus D.",
  },
  {
    id: "apt_1002",
    serviceId: "electrical-outlet-installation",
    serviceName: "Electrical Outlet Installation",
    date: "Tue, Nov 18 · 2:00 PM",
    status: "Pending",
    address: "78 Elm Street, Unit 4B, Springfield, MA 01108",
    notes: "Two GFCI outlets in kitchen backsplash.",
    reference: "ARC-8901-QT",
  },
  {
    id: "apt_1003",
    serviceId: "lighting-installation",
    serviceName: "Lighting Installation Services",
    date: "Fri, Nov 21 · 9:00 AM",
    status: "Rescheduled",
    address: "512 Maple Lane, Chicopee, MA 01013",
    notes: "Recessed lighting in living room ceiling — 6 cans.",
    reference: "ARC-8955-RB",
  },
];

export const PAST: Appointment[] = [
  {
    id: "apt_0902",
    serviceId: "electrical-panel-upgrades",
    serviceName: "Electrical Panel Upgrades",
    date: "Mon, Oct 20 · 10:00 AM",
    status: "Completed",
    address: "142 Oakridge Ave, Springfield, MA 01103",
    reference: "ARC-8410-XF",
  },
  {
    id: "apt_0871",
    serviceId: "light-switch-installation",
    serviceName: "Light Switch Installation",
    date: "Wed, Sep 24 · 4:00 PM",
    status: "Completed",
    address: "142 Oakridge Ave, Springfield, MA 01103",
    reference: "ARC-8199-DA",
  },
];

export const CANCELLED: Appointment[] = [
  {
    id: "apt_0755",
    serviceId: "data-cable-installation",
    serviceName: "Data Cable Installation",
    date: "Thu, Aug 14 · 1:00 PM",
    status: "Cancelled",
    address: "142 Oakridge Ave, Springfield, MA 01103",
    reference: "ARC-7788-MJ",
    cancelReason: "Change of plans — postponing renovation.",
  },
];

export const ALL_APPOINTMENTS = [...UPCOMING, ...PAST, ...CANCELLED];

export const getAppointment = (id: string) =>
  ALL_APPOINTMENTS.find((a) => a.id === id);

export function statusColor(status: Appointment["status"]) {
  switch (status) {
    case "Pending":
      return "bg-[#FFC107] text-black";
    case "Approved":
      return "bg-[#E31E24] text-white";
    case "Rescheduled":
      return "bg-[#8A8A8A] text-black";
    case "Completed":
      return "bg-[#2A2A2A] text-[#8A8A8A]";
    case "Cancelled":
      return "bg-[#2A2A2A] text-[#E31E24]";
  }
}