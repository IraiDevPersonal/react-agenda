import type { AppointmentStatus } from "./shared-model";

export type AppointmentModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  appointment_status: AppointmentStatus;
  user: UserForAppointment;
  patient: PatientForAppointmentModel | null;
};

export type PatientForAppointmentModel = {
  patient_rut: string;
  patient_name: string;
  patient_phone: string;
};

export type UserForAppointment = {
  professions: string[];
  full_name: string;
};
