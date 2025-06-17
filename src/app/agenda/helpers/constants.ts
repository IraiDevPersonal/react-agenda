import type { AppointmentStatus } from "../types/appointment";

export const STATUS_NAMES: Record<AppointmentStatus, string> = {
  TO_CONFIRM: "Por confirmar",
  AVAILABLE: "Disponible",
  CANCELLED: "Cancelado",
  CONFIRMED: "Confirmado",
  INDETERMINATE: "Indeterminado",
};
