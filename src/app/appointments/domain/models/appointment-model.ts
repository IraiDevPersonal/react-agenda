import type { AppointmentStatus } from "./type";

export type AppointmentModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  patient_rut: string;
  patient_name: string;
  patient_phone: string;
  professions: string[];
  professional_name: string;
  appointment_status: AppointmentStatus;
};
