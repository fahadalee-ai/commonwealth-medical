import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  block?: boolean;
  children: ReactNode;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-[#0a6bdb] text-white hover:bg-[#0858b8] active:bg-[#074a9a] shadow-[0_8px_18px_rgba(10,107,219,0.28)]",
  secondary:
    "bg-white border border-[#dce3ec] text-[#032558] hover:bg-[#f5f7fa]",
  outline:
    "bg-transparent border border-[#0a6bdb] text-[#0a6bdb] hover:bg-[#0a6bdb]/8",
  ghost: "bg-transparent text-[#0a6bdb] hover:bg-[#0a6bdb]/8",
  danger:
    "bg-transparent border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626]/8",
};

export function ArcButton({
  variant = "primary",
  block,
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`${styles[variant]} ${block ? "w-full" : ""} inline-flex min-h-12 items-center justify-center gap-2 px-6 text-[15px] font-semibold tracking-tight transition-transform duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 ${className}`}
    >
      {children}
    </button>
  );
}
