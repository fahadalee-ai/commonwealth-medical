import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import { Home, Wrench, CalendarCheck2, User, Plus } from "lucide-react";

type NavItem = {
  to: LinkProps["to"];
  label: string;
  icon: typeof Home;
  center?: boolean;
};
const items: NavItem[] = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/book", label: "Book", icon: Plus, center: true },
  { to: "/appointments", label: "Appointments", icon: CalendarCheck2 },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <div className="h-24" />
      <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-[#2A2A2A] bg-[#0D0D0D]">
        <ul className="grid h-20 grid-cols-5 items-end pb-3">
          {items.map(({ to, label, icon: Icon, center }) => {
            const active =
              to === "/home" ? path === "/home" : path.startsWith(String(to));
            if (center) {
              return (
                <li key={String(to)} className="flex items-start justify-center">
                  <Link
                    to={to}
                    aria-label={label}
                    className="-mt-6 flex h-14 w-14 items-center justify-center bg-[#E31E24] text-white shadow-[0_0_0_4px_#0D0D0D]"
                  >
                    <Icon className="h-7 w-7" strokeWidth={2.5} />
                  </Link>
                </li>
              );
            }
            return (
              <li key={String(to)} className="flex flex-col items-center gap-1">
                <Link
                  to={to}
                  className={`flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-wide ${active ? "text-[#E31E24]" : "text-[#8A8A8A]"}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}