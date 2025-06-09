import type { AppointmentStatus } from "../types/appointment";

export const StatusColors: Record<AppointmentStatus, Record<"bg" | "card", string>> = {
  TO_CONFIRM: {
    bg: "bg-amber-200 hover:bg-amber-400",
    card: "before:bg-amber-200",
  },
  AVAILABLE: {
    bg: "bg-neutral-200 hover:bg-neutral-400",
    card: "before:bg-neutral-200",
  },
  CANCELLED: {
    bg: "bg-red-200 hover:bg-red-400",
    card: "before:bg-red-400",
  },
  CONFIRMED: {
    bg: "bg-green-200 hover:bg-green-400",
    card: "before:bg-green-300",
  },
  INDETERMINATE: { bg: "border border-border hover:border-primary/30", card: "before:bg-transparent before:border-r before:border-border hover:before:border-primary/30" },
};

export const StatusNames: Record<AppointmentStatus, string> = {
  TO_CONFIRM: "Por confirmar",
  AVAILABLE: "Disponible",
  CANCELLED: "Cancelado",
  CONFIRMED: "Confirmado",
  INDETERMINATE: "Indeterminado",
};
