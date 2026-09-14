interface Props {
  total: number;
  current: number;
  labels?: string[];
}

export function StepIndicator({ total, current, labels }: Props) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-start gap-1">
        {Array.from({ length: total }).map((_, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <div key={n} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full items-center">
                <div
                  className={`mx-auto flex h-7 w-7 items-center justify-center text-[11px] font-extrabold ${
                    active
                      ? "bg-[#0a6bdb] text-white"
                      : done
                        ? "bg-[#032558] text-white"
                        : "bg-[#e8eef6] text-[#5C6B7A]"
                  }`}
                >
                  {done ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M2 6.2L4.6 8.8L10 3.2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="square"
                      />
                    </svg>
                  ) : (
                    n
                  )}
                </div>
              </div>
              {labels?.[i] && (
                <span
                  className={`w-full truncate text-center text-[10px] font-bold ${
                    active ? "text-[#0a6bdb]" : "text-[#5C6B7A]"
                  }`}
                >
                  {labels[i]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
