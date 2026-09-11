import type { LucideIcon } from "lucide-react";
import { Stethoscope, Building2, HeartPulse, MapPinned } from "lucide-react";
import type { RideType } from "@/lib/booking-store";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServicePriceRow {
  label: string;
  price: string;
  note?: string;
}

export interface ServicePricing {
  from: string;
  unit: string;
  coveredLabel: string;
  rows: ServicePriceRow[];
  disclaimer: string;
}

export interface ServiceInfo {
  id: RideType;
  name: string;
  short: string;
  description: string;
  included: string[];
  bestFor: string[];
  howItWorks: string[];
  destinations: string[];
  mobility: string[];
  whatToBring: string[];
  coverage: string;
  leadTime: string;
  hours: string;
  pricing: ServicePricing;
  faqs: ServiceFaq[];
  category: string;
  categories: string[];
  image: string;
  gallery: string[];
  icon: LucideIcon;
}

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=90`;

export const SERVICES: ServiceInfo[] = [
  {
    id: "medical-appointment",
    name: "Medical Appointment",
    short: "On-time rides to doctors, specialists, labs, and imaging.",
    description:
      "Dependable non-emergency transportation to scheduled medical appointments. A trained CMT driver picks you up at home, helps you as needed, and gets you to the right entrance so you are not late for care.",
    included: [
      "Door-through-door assistance as needed",
      "Appointment-aligned pickup windows",
      "MassHealth/PT-1 and broker coordination",
      "Return-trip scheduling",
      "Live driver tracking on the day of the ride",
    ],
    bestFor: [
      "Primary care and specialist visits",
      "Lab work and diagnostic imaging",
      "Follow-up appointments after a procedure",
      "Passengers who need extra time or assistance",
    ],
    howItWorks: [
      "Choose Medical Appointment and enter your pickup address.",
      "Add the clinic name, appointment time, and return preference.",
      "Confirm coverage or PT-1 authorization.",
      "Track your driver and get help from dispatch if plans change.",
    ],
    destinations: [
      "Spencer Family Practice",
      "Wellspring Medical Center",
      "Imaging and lab offices",
      "Specialist clinics in Worcester County",
    ],
    mobility: ["Ambulatory", "Walker/Cane Assistance", "Wheelchair"],
    whatToBring: [
      "Photo ID and insurance or MassHealth card",
      "Appointment confirmation or referral",
      "Authorization or member ID if you have one",
      "Any mobility device you use daily",
    ],
    coverage:
      "Most trips are authorized through MassHealth/PT-1 or an approved transportation broker. Private-pay rides can also be booked when coverage does not apply.",
    leadTime: "Book at least 24–48 hours ahead when possible. Same-day trips depend on vehicle availability.",
    hours: "Weekday appointment windows, typically 6:30 AM – 6:00 PM. Weekend trips by arrangement.",
    pricing: {
      from: "$48",
      unit: "one-way",
      coveredLabel: "$0 with MassHealth / PT-1 when authorized",
      rows: [
        { label: "MassHealth / PT-1", price: "Covered", note: "No passenger fare when authorized" },
        { label: "Ambulatory sedan", price: "$48+", note: "Local one-way trip" },
        { label: "Walker / cane assistance", price: "$58+", note: "Door-through-door help included" },
        { label: "Wheelchair van", price: "$78+", note: "Lift-equipped vehicle" },
        { label: "Return ride", price: "Same rate", note: "Or Call when ready" },
      ],
      disclaimer:
        "Private-pay amounts are starting estimates for Worcester County. Final fare depends on distance, wait time, and vehicle type. Covered trips bill your plan, not you.",
    },
    faqs: [
      {
        q: "What if my appointment runs late?",
        a: "Use Call when ready for the return ride, or contact CMT dispatch at (774) 622-3789 so we can adjust the pickup.",
      },
      {
        q: "Can a family member ride with me?",
        a: "Yes. Toggle the companion option when you book and tell us if they also need assistance.",
      },
    ],
    category: "Appointments",
    categories: ["Appointments"],
    image: img("photo-1576091160399-112ba8d25d1d"),
    gallery: [
      img("photo-1576091160399-112ba8d25d1d", 1000),
      img("photo-1559839734-2b71ea197ec2", 1000),
      img("photo-1576091160550-2173dba999ef", 1000),
    ],
    icon: Stethoscope,
  },
  {
    id: "healthcare-facility",
    name: "Healthcare Facility Visit",
    short: "Hospital, clinic, dialysis, and outpatient center transportation.",
    description:
      "Safe rides to hospitals, outpatient clinics, dialysis, and other healthcare facilities. We drop you at the correct entrance and can wait or return on a scheduled time — whichever your visit requires.",
    included: [
      "Facility drop-off at the correct entrance",
      "Wait or scheduled return options",
      "Wheelchair-accessible vehicles when requested",
      "Dispatch support throughout the trip",
      "Coordination with facility pickup points",
    ],
    bestFor: [
      "Hospital outpatient visits",
      "Dialysis and infusion appointments",
      "Same-day procedures with a planned discharge",
      "Riders who need a wheelchair-accessible vehicle",
    ],
    howItWorks: [
      "Select Healthcare Facility Visit and your home or current pickup.",
      "Search or save the facility name so the driver knows the entrance.",
      "Choose wait-and-return or a later pickup time.",
      "Share mobility needs so we send the right vehicle.",
    ],
    destinations: [
      "UMass Memorial Medical Center",
      "Wellspring Medical Center",
      "Outpatient surgery centers",
      "Dialysis clinics",
    ],
    mobility: ["Ambulatory", "Walker/Cane Assistance", "Wheelchair", "Stretcher"],
    whatToBring: [
      "Facility paperwork and ID band instructions if provided",
      "Insurance or MassHealth card",
      "A list of current medications",
      "A companion if the facility requires one after a procedure",
    ],
    coverage:
      "Facility trips are commonly covered when authorized by your health plan, PT-1, or transportation broker. Confirm the authorization number before travel.",
    leadTime: "Request 48 hours ahead for hospital campuses. Urgent outpatient trips may be possible the same day.",
    hours: "Aligned to facility hours, including early morning dialysis starts.",
    pricing: {
      from: "$58",
      unit: "one-way",
      coveredLabel: "$0 with MassHealth / PT-1 when authorized",
      rows: [
        { label: "MassHealth / PT-1", price: "Covered", note: "Plan or broker pays the trip" },
        { label: "Ambulatory sedan", price: "$58+", note: "Hospital or clinic drop-off" },
        { label: "Wheelchair van", price: "$88+", note: "Correct entrance drop-off" },
        { label: "Stretcher transport", price: "$145+", note: "When authorized" },
        { label: "Wait-and-return", price: "Quote", note: "Billed in 30-minute blocks" },
      ],
      disclaimer:
        "Campus and dialysis trips may include extra mileage or wait time. We confirm the estimate before you book a private-pay ride.",
    },
    faqs: [
      {
        q: "Will the driver help me inside?",
        a: "Drivers provide door-through-door assistance and can escort you to a lobby or reception desk. They do not provide medical care.",
      },
      {
        q: "What vehicle will I get?",
        a: "We match the vehicle to the mobility type you select — sedan, wheelchair-accessible van, or stretcher transport when authorized.",
      },
    ],
    category: "Facilities",
    categories: ["Facilities"],
    image: img("photo-1519494026892-80bbd2d6fd0d"),
    gallery: [
      img("photo-1519494026892-80bbd2d6fd0d", 1000),
      img("photo-1582719471384-894fbb16e074", 1000),
      img("photo-1538108149393-fbbd81895907", 1000),
    ],
    icon: Building2,
  },
  {
    id: "treatment-program",
    name: "Treatment Program",
    short: "Recurring rides for ongoing treatment schedules.",
    description:
      "Set a repeat schedule for treatment programs so you never miss a session. CMT coordinates with your authorization and preferred days of the week, and we aim for a consistent driver when available.",
    included: [
      "Recurring weekday scheduling",
      "Consistent driver preference when available",
      "Authorization tracking",
      "Easy changes through the app",
      "Return rides after each session",
    ],
    bestFor: [
      "Multi-week treatment programs",
      "Recurring therapy or counseling sessions",
      "Standing weekday pickups",
      "Riders who want the same routine each visit",
    ],
    howItWorks: [
      "Choose Treatment Program and turn on Recurring Ride.",
      "Pick the days of the week and an end date.",
      "Add the program location and usual session time.",
      "We keep the series on your calendar until you change or end it.",
    ],
    destinations: [
      "Harbor Wellness Clinic",
      "Outpatient treatment centers",
      "Physical and occupational therapy offices",
      "Community health programs",
    ],
    mobility: ["Ambulatory", "Walker/Cane Assistance", "Wheelchair"],
    whatToBring: [
      "Program schedule or counselor contact",
      "Authorization that covers the series of trips",
      "Emergency contact information",
    ],
    coverage:
      "Recurring trips usually need an active authorization that lists the program dates. Tell us if a session is cancelled so we can pause that day’s ride.",
    leadTime: "Start a series at least 3 business days before the first session.",
    hours: "Matches your program hours, including early and late weekday sessions.",
    pricing: {
      from: "$42",
      unit: "per session",
      coveredLabel: "$0 with an active series authorization",
      rows: [
        { label: "MassHealth / PT-1 series", price: "Covered", note: "Authorization must list program dates" },
        { label: "Ambulatory one-way", price: "$42+", note: "Per session" },
        { label: "Wheelchair van", price: "$72+", note: "Per session" },
        { label: "Recurring private pay", price: "10% off", note: "When you book a weekday series" },
        { label: "Cancelled session", price: "$0", note: "Cancel that day only — series stays" },
      ],
      disclaimer:
        "Series pricing is per one-way trip. Add a return ride at the same starting rate, or use Call when ready after your session.",
    },
    faqs: [
      {
        q: "Can I skip one day without cancelling the series?",
        a: "Yes. Open that day’s ride and cancel only that trip, or call dispatch. The rest of the schedule stays in place.",
      },
      {
        q: "Can I change the pickup time for Fridays only?",
        a: "Contact support or edit the series notes. Dispatch will confirm the new Friday window.",
      },
    ],
    category: "Programs",
    categories: ["Programs"],
    image: img("photo-1576091160550-2173dba999ef"),
    gallery: [
      img("photo-1576091160550-2173dba999ef", 1000),
      img("photo-1559839734-2b71ea197ec2", 1000),
      img("photo-1576091160399-112ba8d25d1d", 1000),
    ],
    icon: HeartPulse,
  },
  {
    id: "approved-destination",
    name: "Approved Destination",
    short: "Broker-approved trips such as pharmacies and follow-ups.",
    description:
      "Transportation to other destinations approved by your health plan, PT-1, or transportation broker — pharmacies, follow-up visits, and similar eligible stops — all booked in the same app.",
    included: [
      "Coverage confirmation support",
      "Saved favorite destinations",
      "Flexible pickup windows",
      "Companion/escort option",
      "Receipt and trip history after completion",
    ],
    bestFor: [
      "Pharmacy pickups when authorized",
      "Approved follow-up or social-service visits",
      "Destinations listed on your PT-1",
      "One-off trips that are not a clinic appointment",
    ],
    howItWorks: [
      "Select Approved Destination and enter the stop name or address.",
      "Add your authorization or broker reference if you have one.",
      "Choose pickup time and whether you need a return ride.",
      "Dispatch confirms the trip is eligible before the driver is assigned.",
    ],
    destinations: [
      "CVS Spencer and local pharmacies",
      "Approved follow-up offices",
      "Broker-listed community destinations",
    ],
    mobility: ["Ambulatory", "Walker/Cane Assistance", "Wheelchair"],
    whatToBring: [
      "The approval or PT-1 that lists this destination",
      "Prescription or pickup information",
      "Payment method if the stop requires it",
    ],
    coverage:
      "These trips are only dispatched when your health plan, PT-1, or broker authorizes the destination. Private pay is available if the stop is not covered.",
    leadTime: "24 hours preferred. Pharmacy runs may be booked same-day when a vehicle is free.",
    hours: "During business hours of the destination, typically 8:00 AM – 5:00 PM.",
    pricing: {
      from: "$38",
      unit: "one-way",
      coveredLabel: "$0 when the stop is listed on your PT-1",
      rows: [
        { label: "Authorized destination", price: "Covered", note: "Must appear on your PT-1 or broker list" },
        { label: "Private-pay one-way", price: "$38+", note: "Pharmacy or approved stop" },
        { label: "Wheelchair van", price: "$68+", note: "When a lift vehicle is needed" },
        { label: "Extra stop", price: "+$15", note: "If dispatch approves before pickup" },
        { label: "Unapproved stop", price: "Private pay", note: "Cannot be billed to a broker" },
      ],
      disclaimer:
        "Broker trips are only dispatched to approved destinations. If your stop is not listed, we can still take you as a private-pay ride.",
    },
    faqs: [
      {
        q: "What if my destination is not on my authorization?",
        a: "Book as Private Pay or call CMT. We cannot complete a broker trip to an unapproved stop.",
      },
      {
        q: "Can I add a second stop?",
        a: "Ask dispatch before the ride starts. Extra stops must be authorized or paid privately.",
      },
    ],
    category: "Other",
    categories: ["Other"],
    image: img("photo-1549317661-bd32c8ce0db2"),
    gallery: [
      img("photo-1549317661-bd32c8ce0db2", 1000),
      img("photo-1449965408869-eaa3f722e40d", 1000),
      img("photo-1576091160399-112ba8d25d1d", 1000),
    ],
    icon: MapPinned,
  },
];

export const CATEGORIES = ["All", "Appointments", "Facilities", "Programs", "Other"] as const;
export type Category = (typeof CATEGORIES)[number];

export const getService = (id: string) => SERVICES.find((s) => s.id === id);
