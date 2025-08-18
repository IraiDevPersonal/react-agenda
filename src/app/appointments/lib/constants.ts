import type { AppointmentStatus } from "../models/shared-model";

export const STATUS_NAMES: Record<AppointmentStatus, string> = {
  TO_CONFIRM: "Por confirmar",
  AVAILABLE: "Disponible",
  CANCELLED: "Cancelado",
  CONFIRMED: "Confirmado",
  INDETERMINATE: "Indeterminado",
};

export const APPOINTMENT_DETAIL_FORM_ID = "appointment-detail-form";

export const WEEK_DAYS = [
  { label: "Lunes", value: 1 },
  { label: "Martes", value: 2 },
  { label: "Miércoles", value: 3 },
  { label: "Jueves", value: 4 },
  { label: "Viernes", value: 5 },
  { label: "Sábado", value: 6 },
];
