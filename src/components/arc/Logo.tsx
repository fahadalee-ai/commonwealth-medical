import logo from "@/assets/Logo.png";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 120, className }: LogoProps) {
  return (
    <img
      src={logo}
      alt="ARC Electrical Solutions"
      style={{ width: size, height: "auto" }}
      className={className}
      draggable={false}
    />
  );
}
