import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/arc/Logo";
import { CMT } from "@/lib/cmt";

const links = [
  { to: "/website" as const, label: "Home" },
  { to: "/website/about" as const, label: "About Us" },
  { to: "/website/services" as const, label: "Services" },
  { to: "/website/how-it-works" as const, label: "How It Works" },
  { to: "/website/contact" as const, label: "Contact Us" },
];

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8eef6] bg-white">
      <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between gap-4 px-5">
        <Link to="/website" aria-label="CMT home">
          <Logo size={168} />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-[#032558] lg:flex">
          {links.map((l) => {
            const active =
              l.to === "/website" ? path === "/website" || path === "/website/" : path.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={active ? "text-[#0a6bdb]" : "hover:text-[#0a6bdb]"}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${CMT.phoneTel}`} className="hidden text-sm font-semibold text-[#032558] md:inline">
            {CMT.phone}
          </a>
          <Link
            to="/website/contact"
            className="inline-flex h-11 items-center bg-[#032558] px-4 text-sm font-bold text-white"
          >
            Transportation Assistance
          </Link>
        </div>
      </div>
    </header>
  );
}
