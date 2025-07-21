import type { AppointmentStatus } from "./models/appointment-model";

export const STATUS_NAMES: Record<AppointmentStatus, string> = {
  TO_CONFIRM: "Por confirmar",
  AVAILABLE: "Disponible",
  CANCELLED: "Cancelado",
  CONFIRMED: "Confirmado",
  INDETERMINATE: "Indeterminado",
};

export const APPOINTMENT_DETAIL_FORM_ID = "appointment-detail-form";
