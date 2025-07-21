import z from "zod";

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

export const AppointmentSchema = z.object({
  uid: z.string(),
  date: z.string(),
  time_from: z.string(),
  time_to: z.string(),
  patient_name: z.string(),
  patient_rut: z.string(),
  patient_phone: z.string(),
  professional_name: z.string(),
  professions: z.string().array(),
  appointment_status: z.enum(AppointmentStatus),
});

export type AppointmentModel = z.infer<typeof AppointmentSchema>;
