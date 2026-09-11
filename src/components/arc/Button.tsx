import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outlineRed" | "outlineYellow" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  block?: boolean;
  children: ReactNode;
}

const styles: Record<Variant, string> = {
  primary: "bg-[#E31E24] text-white hover:bg-[#c81920] active:bg-[#a81419]",
  secondary: "bg-transparent border border-white text-white hover:bg-white/5",
  outlineRed: "bg-transparent border border-[#E31E24] text-[#E31E24] hover:bg-[#E31E24]/10",
  outlineYellow: "bg-transparent border border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107]/10",
  ghost: "bg-transparent text-white hover:bg-white/5",
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
      className={`${styles[variant]} ${block ? "w-full" : ""} inline-flex h-12 items-center justify-center gap-2 px-6 text-sm font-bold uppercase tracking-wide transition-colors disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}