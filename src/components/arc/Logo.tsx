import logoColor from "@/assets/Logo.png";
import logoWhite from "@/assets/Logo-w.png";

interface LogoProps {
  size?: number;
  variant?: "color" | "white";
  className?: string;
}

export function Logo({ size = 120, variant = "color", className }: LogoProps) {
  return (
    <img
      src={variant === "white" ? logoWhite : logoColor}
      alt="Commonwealth Medical Transportation"
      style={{ width: size, height: "auto" }}
      className={className}
      draggable={false}
    />
  );
}
