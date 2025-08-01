import z from "zod";

export type AppointmentViewMode = "week" | "day";

export enum AppointmentStatus {
  AVAILABLE = "AVAILABLE",
  TO_CONFIRM = "TO_CONFIRM",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  INDETERMINATE = "INDETERMINATE",
}

export type AppointmentFilters = {
  professional_id: number;
  profession_id: number;
  patient_rut: string;
  date_from: Date;
  date_to: Date;
  date: Date;
};

export const AppointmentStatusScheme = z.enum(AppointmentStatus, { error: "estado de cita invalido" });
