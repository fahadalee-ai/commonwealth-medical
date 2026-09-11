interface Props {
  total: number;
  current: number;
}

export function StepIndicator({ total, current }: Props) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 ${i < current ? "bg-[#E31E24]" : "bg-[#2A2A2A]"}`}
        />
      ))}
    </div>
  );
}