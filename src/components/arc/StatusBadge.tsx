export type RideStatus =
  | "Confirmed"
  | "En Route"
  | "Arrived"
  | "In Progress"
  | "Completed"
  | "Cancelled";

const styles: Record<RideStatus, string> = {
  Confirmed: "bg-[#0a6bdb]/12 text-[#0a6bdb]",
  "En Route": "bg-amber-100 text-amber-700",
  Arrived: "bg-amber-100 text-amber-700",
  "In Progress": "bg-[#032558]/10 text-[#032558]",
  Completed: "bg-[#1FA463]/12 text-[#1FA463]",
  Cancelled: "bg-red-50 text-red-600",
};

export function StatusBadge({ status }: { status: RideStatus }) {
  return (
    <span
      className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
}
