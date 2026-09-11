import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface ScreenHeaderProps {
  title: string;
  backTo?: string;
  right?: ReactNode;
}

export function ScreenHeader({ title, backTo, right }: ScreenHeaderProps) {
  return (
    <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#2A2A2A] bg-[#0D0D0D] px-4">
      <div className="flex items-center gap-2">
        {backTo ? (
          <Link
            to={backTo}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center bg-[#161616] text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : (
          <div className="w-10" />
        )}
        <h1 className="text-base font-bold tracking-tight text-white">{title}</h1>
      </div>
      <div>{right}</div>
    </div>
  );
}