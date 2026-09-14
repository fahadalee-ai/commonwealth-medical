import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface ScreenHeaderProps {
  title: string;
  backTo?: string;
  right?: ReactNode;
  dark?: boolean;
}

export function ScreenHeader({ title, backTo, right, dark }: ScreenHeaderProps) {
  return (
    <div
      className={`sticky top-0 z-30 flex h-14 items-center justify-between px-4 ${
        dark
          ? "bg-[#032558] text-white"
          : "border-b border-[#dce3ec] bg-white/95 text-[#032558] backdrop-blur"
      }`}
    >
      <div className="flex min-w-0 items-center gap-1">
        {backTo ? (
          <Link
            to={backTo}
            aria-label="Back"
            className={`flex h-11 w-11 items-center justify-center ${
              dark ? "bg-white/10 text-white" : "bg-[#f5f7fa] text-[#032558]"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : (
          <div className="w-2" />
        )}
        <h1 className="truncate text-[17px] font-extrabold tracking-tight">{title}</h1>
      </div>
      <div>{right}</div>
    </div>
  );
}
