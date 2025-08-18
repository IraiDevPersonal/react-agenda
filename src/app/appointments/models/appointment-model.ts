import type { AppointmentStatus } from "./shared-model";

export type AppointmentModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  professions: string[];
  professional_name: string;
  patient_rut: string | null;
  patient_name: string | null;
  patient_phone: string | null;
  appointment_status: AppointmentStatus;
};
