import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Camera,
  ChevronRight,
  UserCog,
  MapPin,
  Bell,
  KeyRound,
  LifeBuoy,
  FileText,
  Shield,
  LogOut,
  HeartPulse,
} from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { BottomNav } from "@/components/arc/BottomNav";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { signOut } from "@/lib/cmt";

export const Route = createFileRoute("/profile/")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile · CMT" }] }),
});

function Profile() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <ScreenHeader title="Profile" />
      <div className="p-4">
        <div className="cmt-card flex items-center gap-4 p-4">
          <div className="relative">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-[#eef1f6]">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a6bdb] text-white">
              <Camera className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold text-[#032558]">Alex Rivera</p>
            <p className="truncate text-xs text-[#5C6B7A]">alex.rivera@email.com</p>
            <p className="mt-0.5 text-xs text-[#5C6B7A]">MassHealth/PT-1</p>
          </div>
        </div>

        <div className="cmt-card mt-6">
          <MenuRow to="/profile/edit" icon={UserCog} label="Personal information" />
          <MenuRow to="/profile/addresses" icon={MapPin} label="Saved addresses" />
          <MenuRow to="/profile/edit" icon={HeartPulse} label="Insurance & mobility" />
          <MenuRow to="/profile/notifications" icon={Bell} label="Notification settings" />
          <MenuRow to="/profile/change-password" icon={KeyRound} label="Change password" />
          <MenuRow to="/support" icon={LifeBuoy} label="Help & support" />
          <MenuRow to="/profile/terms" icon={FileText} label="Terms of Service" />
          <MenuRow to="/profile/privacy" icon={Shield} label="Privacy Policy" last />
        </div>

        <button
          onClick={() => {
            signOut();
            navigate({ to: "/login" });
          }}
          className="cmt-card mt-6 flex w-full items-center gap-3 p-4 text-left"
        >
          <LogOut className="h-5 w-5 text-red-600" />
          <span className="text-sm font-bold text-red-600">Log Out</span>
        </button>
      </div>
      <BottomNav />
    </AppShell>
  );
}

function MenuRow({
  to,
  icon: Icon,
  label,
  last,
}: {
  to: string;
  icon: typeof UserCog;
  label: string;
  last?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex min-h-14 items-center gap-3 p-4 ${last ? "" : "border-b border-[#eef1f6]"}`}
    >
      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#0a6bdb]/10 text-[#0a6bdb]">
        <Icon className="h-4 w-4" />
      </div>
      <span className="flex-1 text-sm font-bold text-[#032558]">{label}</span>
      <ChevronRight className="h-4 w-4 text-[#5C6B7A]" />
    </Link>
  );
}
