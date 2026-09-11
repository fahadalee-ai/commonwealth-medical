import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Camera, ChevronRight, UserCog, CalendarCheck2, MapPin, Bell,
  KeyRound, LifeBuoy, FileText, Shield, LogOut,
} from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { ScreenHeader } from "@/components/arc/ScreenHeader";

export const Route = createFileRoute("/profile/")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile · ARC" }] }),
});

function Profile() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <ScreenHeader title="My Profile" />
      <div className="p-4">
        <div className="flex items-center gap-4 border border-[#2A2A2A] bg-[#161616] p-4">
          <div className="relative">
            <div className="h-16 w-16 overflow-hidden bg-[#0D0D0D]">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center bg-[#FFC107] text-black">
              <Camera className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold">Alex Rivera</p>
            <p className="truncate text-xs text-[#8A8A8A]">alex.rivera@email.com</p>
            <p className="mt-0.5 text-xs text-[#8A8A8A]">(555) 123-4567</p>
          </div>
        </div>

        <div className="mt-6 border border-[#2A2A2A] bg-[#161616]">
          <MenuRow to="/profile/edit" icon={UserCog} label="Edit Profile" />
          <MenuRow to="/appointments" icon={CalendarCheck2} label="My Appointments" />
          <MenuRow to="/profile/addresses" icon={MapPin} label="Saved Addresses" />
          <MenuRow to="/profile/notifications" icon={Bell} label="Notification Preferences" />
          <MenuRow to="/profile/change-password" icon={KeyRound} label="Change Password" />
          <MenuRow to="/profile/help" icon={LifeBuoy} label="Help & Support" />
          <MenuRow to="/profile/terms" icon={FileText} label="Terms of Service" />
          <MenuRow to="/profile/privacy" icon={Shield} label="Privacy Policy" last />
        </div>

        <button
          onClick={() => navigate({ to: "/login" })}
          className="mt-6 flex w-full items-center gap-3 border border-[#2A2A2A] bg-[#161616] p-4 text-left"
        >
          <LogOut className="h-5 w-5 text-[#E31E24]" />
          <span className="text-sm font-bold uppercase tracking-wide text-[#E31E24]">
            Log Out
          </span>
        </button>
      </div>
      <BottomNav />
    </AppShell>
  );
}

function MenuRow({
  to, icon: Icon, label, last,
}: {
  to: string;
  icon: typeof UserCog;
  label: string;
  last?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-4 ${last ? "" : "border-b border-[#2A2A2A]"}`}
    >
      <div className="flex h-9 w-9 flex-none items-center justify-center border border-[#2A2A2A] text-[#FFC107]">
        <Icon className="h-4 w-4" />
      </div>
      <span className="flex-1 text-sm font-bold">{label}</span>
      <ChevronRight className="h-4 w-4 text-[#8A8A8A]" />
    </Link>
  );
}