import type { AppointmentStatus } from "../types/appointment";

export const StatusColors: Record<AppointmentStatus, string> = {
  "TO-CONFIRM": "before:bg-orange-500",
  "AVAILABLE": "before:bg-neutral-100",
  "CANCELED": "before:bg-red-500",
  "CONFIRMED": "before:bg-green-500",
  "INDETERMINATE": "before:bg-transparent before:border-r before:border-border hover:before:border-primary/30",
};
