import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import { Home, CarFront, Clock3, MessageCircle, User } from "lucide-react";

type NavItem = {
  to: LinkProps["to"];
  label: string;
  icon: typeof Home;
};

const items: NavItem[] = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/book", label: "Book", icon: CarFront },
  { to: "/appointments", label: "Rides", icon: Clock3 },
  { to: "/support", label: "Support", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <div className="h-24" />
      <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 bg-[#032558] pb-[env(safe-area-inset-bottom)]">
        <ul className="grid h-[72px] grid-cols-5 items-center px-1">
          {items.map(({ to, label, icon: Icon }) => {
            const active =
              to === "/home" ? path === "/home" : path.startsWith(String(to));
            return (
              <li key={String(to)} className="flex items-center justify-center">
                <Link
                  to={to}
                  className={`flex min-h-12 min-w-[68px] flex-col items-center justify-center gap-0.5 px-1 text-[10px] font-semibold ${
                    active ? "bg-[#4da6ff] text-[#032558]" : "bg-transparent text-white"
                  }`}
                >
                  <Icon
                    className={active ? "h-6 w-6" : "h-5 w-5"}
                    strokeWidth={active ? 2.6 : 2}
                    fill={active ? "currentColor" : "none"}
                  />
                  <span className={active ? "font-extrabold" : "font-semibold"}>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
