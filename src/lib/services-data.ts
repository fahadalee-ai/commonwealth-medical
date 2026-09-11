import type { LucideIcon } from "lucide-react";
import {
  Zap, Plug, ToggleRight, Lightbulb, Power, Cable, PhoneCall,
  Building2, Home, Wind,
} from "lucide-react";

export interface ServiceInfo {
  id: string;
  name: string;
  short: string;
  description: string;
  included: string[];
  category: "Residential" | "Commercial" | "Installation" | "Repair";
  categories: string[];
  image: string;
  gallery: string[];
  icon: LucideIcon;
}

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=90`;

export const SERVICES: ServiceInfo[] = [
  {
    id: "electrical-panel-upgrades",
    name: "Electrical Panel Upgrades",
    short: "Modernize your panel for safety and capacity.",
    description:
      "Upgrade your outdated electrical panel to safely support modern appliances and increased power demand. Our licensed electricians assess your current system and install code-compliant panels for improved safety and capacity.",
    included: [
      "Panel capacity assessment",
      "Circuit breaker replacement/upgrade",
      "Code compliance inspection",
      "Old panel removal & disposal",
    ],
    category: "Residential",
    categories: ["Residential", "Commercial", "Installation"],
    image: img("photo-1621905251189-08b45d6a269e"),
    gallery: [
      img("photo-1621905251189-08b45d6a269e", 1000),
      img("photo-1558618666-fcd25c85cd64", 1000),
      img("photo-1581092160562-40aa08e78837", 1000),
      img("photo-1621905252507-b35492cc74b4", 1000),
    ],
    icon: Zap,
  },
  {
    id: "electrical-outlet-installation",
    name: "Electrical Outlet Installation",
    short: "New outlets, GFCI and USB-integrated options.",
    description:
      "Add new outlets or replace old, worn-out ones anywhere in your home or business — including GFCI and USB-integrated outlets for modern convenience.",
    included: [
      "New outlet installation (standard, GFCI, USB)",
      "Outlet relocation",
      "Faulty outlet replacement",
      "Childproof outlet options",
    ],
    category: "Residential",
    categories: ["Residential", "Installation", "Repair"],
    image: img("photo-1558402529-d2638a7023e9"),
    gallery: [
      img("photo-1558402529-d2638a7023e9", 1000),
      img("photo-1621905252507-b35492cc74b4", 1000),
      img("photo-1503387762-592deb58ef4e", 1000),
      img("photo-1595079676339-1534801ad6cf", 1000),
    ],
    icon: Plug,
  },
  {
    id: "light-switch-installation",
    name: "Light Switch Installation",
    short: "Dimmers, smart switches and multi-way wiring.",
    description:
      "Install or replace light switches, including dimmer switches, smart switches, and multi-way switches for better control of your lighting.",
    included: [
      "Standard & dimmer switch installation",
      "Smart switch setup",
      "Three-way/four-way switch wiring",
      "Switch panel upgrades",
    ],
    category: "Residential",
    categories: ["Residential", "Installation"],
    image: img("photo-1585771724684-38269d6639fd"),
    gallery: [
      img("photo-1585771724684-38269d6639fd", 1000),
      img("photo-1558449028-b53a39d100fc", 1000),
      img("photo-1524634126442-357e0eac3c14", 1000),
      img("photo-1635335874521-7987db781153", 1000),
    ],
    icon: ToggleRight,
  },
  {
    id: "lighting-installation",
    name: "Lighting Installation Services",
    short: "Recessed, chandeliers, outdoor and landscape.",
    description:
      "From recessed lighting to chandeliers and outdoor fixtures, our team installs all types of residential and commercial lighting safely and efficiently.",
    included: [
      "Indoor & outdoor fixture installation",
      "Recessed/can lighting",
      "Chandelier & pendant lighting",
      "Landscape/security lighting",
    ],
    category: "Residential",
    categories: ["Residential", "Commercial", "Installation"],
    image: img("photo-1513506003901-1e6a229e2d15"),
    gallery: [
      img("photo-1513506003901-1e6a229e2d15", 1000),
      img("photo-1519710164239-da123dc03ef4", 1000),
      img("photo-1540932239986-30128078f3c5", 1000),
      img("photo-1524758631624-e2822e304c36", 1000),
    ],
    icon: Lightbulb,
  },
  {
    id: "generator-installation",
    name: "Generator Installation Service",
    short: "Standby & portable generators with transfer switches.",
    description:
      "Never lose power during an outage. We install standby and portable generator systems with proper transfer switches for safe, automatic backup power.",
    included: [
      "Generator sizing consultation",
      "Standby generator installation",
      "Transfer switch wiring",
      "Permit & inspection coordination",
    ],
    category: "Residential",
    categories: ["Residential", "Commercial", "Installation"],
    image: img("photo-1591955506264-3f5a6834570a"),
    gallery: [
      img("photo-1591955506264-3f5a6834570a", 1000),
      img("photo-1497435334941-8c899ee9e8e9", 1000),
      img("photo-1581092160562-40aa08e78837", 1000),
      img("photo-1581092160607-ee22621dd758", 1000),
    ],
    icon: Power,
  },
  {
    id: "data-cable-installation",
    name: "Data Cable Installation",
    short: "Structured Cat5e/Cat6 network cabling.",
    description:
      "Structured data cabling for homes and offices — reliable, fast, and future-proof network infrastructure installed by certified technicians.",
    included: [
      "Ethernet/Cat5e/Cat6 cable runs",
      "Network jack installation",
      "Cable management & labeling",
      "Testing & certification",
    ],
    category: "Commercial",
    categories: ["Commercial", "Installation"],
    image: img("photo-1544197150-b99a580bb7a8"),
    gallery: [
      img("photo-1544197150-b99a580bb7a8", 1000),
      img("photo-1518770660439-4636190af475", 1000),
      img("photo-1558494949-ef010cbdcc31", 1000),
      img("photo-1451187580459-43490279c0fa", 1000),
    ],
    icon: Cable,
  },
  {
    id: "telephone-cable-installation",
    name: "Telephone Cable Installation",
    short: "Business and residential phone line wiring.",
    description:
      "Professional telephone line installation and repair for residential and commercial properties, ensuring clear and reliable connectivity.",
    included: [
      "New phone line installation",
      "Jack installation/repair",
      "Multi-line business setups",
      "Troubleshooting existing lines",
    ],
    category: "Commercial",
    categories: ["Commercial", "Residential", "Installation", "Repair"],
    image: img("photo-1517373116369-9bdb8cdc9f62"),
    gallery: [
      img("photo-1517373116369-9bdb8cdc9f62", 1000),
      img("photo-1635335874521-7987db781153", 1000),
      img("photo-1516387938699-a93567ec168e", 1000),
      img("photo-1520923642038-b4259acecbd7", 1000),
    ],
    icon: PhoneCall,
  },
  {
    id: "commercial-electrical-services",
    name: "Commercial Electrical Services",
    short: "Full-scope wiring & maintenance for businesses.",
    description:
      "Comprehensive electrical solutions for businesses — from office buildings to retail spaces — handled with minimal disruption to your operations.",
    included: [
      "Commercial wiring & rewiring",
      "Electrical maintenance contracts",
      "Code compliance & safety audits",
      "Emergency commercial repairs",
    ],
    category: "Commercial",
    categories: ["Commercial", "Installation", "Repair"],
    image: img("photo-1497366216548-37526070297c"),
    gallery: [
      img("photo-1497366216548-37526070297c", 1000),
      img("photo-1497366811353-6870744d04b2", 1000),
      img("photo-1503387762-592deb58ef4e", 1000),
      img("photo-1554469384-e58fac16e23a", 1000),
    ],
    icon: Building2,
  },
  {
    id: "residential-electrical-services",
    name: "Residential Electrical Services",
    short: "Whole-home repairs, rewiring and inspections.",
    description:
      "Full-service residential electrical work covering everything from small repairs to whole-home rewiring, done safely and up to code.",
    included: [
      "Home rewiring",
      "Electrical troubleshooting & repair",
      "Safety inspections",
      "New construction wiring",
    ],
    category: "Residential",
    categories: ["Residential", "Installation", "Repair"],
    image: img("photo-1600585154340-be6161a56a0c"),
    gallery: [
      img("photo-1600585154340-be6161a56a0c", 1000),
      img("photo-1560448204-e02f11c3d0e2", 1000),
      img("photo-1583847268964-b28dc8f51f92", 1000),
      img("photo-1560448205-4d9b3e6bb6db", 1000),
    ],
    icon: Home,
  },
  {
    id: "mini-split-installation",
    name: "Mini Split Installation",
    short: "Energy-efficient ductless heating & cooling.",
    description:
      "Energy-efficient ductless mini split system installation for targeted heating and cooling, including all required electrical hookups.",
    included: [
      "Mini split unit mounting",
      "Dedicated electrical circuit installation",
      "System testing",
      "Consultation on unit sizing/placement",
    ],
    category: "Residential",
    categories: ["Residential", "Commercial", "Installation"],
    image: img("photo-1630832709477-4fffa6e61feb"),
    gallery: [
      img("photo-1630832709477-4fffa6e61feb", 1000),
      img("photo-1633922273215-a902cbf4f4b9", 1000),
      img("photo-1729183672500-46c52a897de5", 1000),
      img("photo-1709432767122-d3cb5326911a", 1000),
    ],
    icon: Wind,
  },
];

export const CATEGORIES = ["All", "Residential", "Commercial", "Installation", "Repair"] as const;
export type Category = (typeof CATEGORIES)[number];

export const getService = (id: string) => SERVICES.find((s) => s.id === id);