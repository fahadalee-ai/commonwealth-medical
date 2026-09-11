import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const ArcInput = forwardRef<HTMLInputElement, Props>(function ArcInput(
  { label, className = "", type = "text", ...rest },
  ref,
) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const actualType = isPassword && show ? "text" : type;
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8A8A8A]">
          {label}
        </span>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={actualType}
          {...rest}
          className={`h-12 w-full border border-[#2A2A2A] bg-[#161616] px-4 text-sm text-white placeholder:text-[#5a5a5a] focus:border-[#FFC107] focus:outline-none ${isPassword ? "pr-12" : ""} ${className}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#8A8A8A]"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </label>
  );
});