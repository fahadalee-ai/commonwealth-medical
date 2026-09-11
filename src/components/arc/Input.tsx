import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefixIcon?: ReactNode;
}

export const ArcInput = forwardRef<HTMLInputElement, Props>(function ArcInput(
  { label, className = "", type = "text", prefixIcon, id, ...rest },
  ref,
) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const uid = useId();
  const inputId = id ?? uid;
  const isPassword = type === "password";
  const isDateLike =
    type === "date" || type === "time" || type === "datetime-local" || type === "month";
  const actualType = isPassword && show ? "text" : type;
  const hasValue = Boolean(rest.value ?? rest.defaultValue);
  // Native date/time fields always draw mm/dd/yyyy, so the label must stay raised.
  const float = focused || hasValue || Boolean(rest.placeholder) || isDateLike;

  return (
    <label className="block" htmlFor={inputId}>
      <div
        className={`relative border bg-[#eef1f6] transition-colors ${
          focused ? "border-[#032558] ring-2 ring-[#032558]/10" : "border-transparent"
        }`}
      >
        {prefixIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#5C6B7A]">
            {prefixIcon}
          </span>
        )}
        {label && (
          <span
            className={`pointer-events-none absolute z-10 origin-left text-[#5C6B7A] transition-all ${
              prefixIcon ? "left-10" : "left-4"
            } ${
              float
                ? "top-1.5 text-[10px] font-semibold uppercase tracking-wide"
                : "top-1/2 -translate-y-1/2 text-sm"
            }`}
          >
            {label}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={actualType}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          className={`w-full bg-transparent text-[15px] text-[#032558] placeholder:text-[#5C6B7A]/50 focus:outline-none ${
            isDateLike ? "cmt-date-input h-16" : "h-14"
          } ${label ? "pt-5" : ""} ${prefixIcon ? "pl-10" : "px-4"} ${
            isPassword ? "pr-12" : isDateLike ? "pr-3" : "pr-4"
          } ${className}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#5C6B7A]"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </label>
  );
});
