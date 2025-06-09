import type { AppointmentStatus } from "../types/appointment";

export const StatusColors: Record<AppointmentStatus, string> = {
  TO_CONFIRM: "before:bg-amber-200",
  AVAILABLE: "before:bg-neutral-200",
  CANCELLED: "before:bg-red-400",
  CONFIRMED: "before:bg-green-300",
  INDETERMINATE: "before:bg-transparent before:border-r before:border-border hover:before:border-primary/30",
};
