import type { AppointmentStatus } from "./shared-model";

export type AppointmentModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  appointment_status: AppointmentStatus;
  professional: ProfessionalForAppointment;
  patient: PatientForAppointmentModel | null;
};

export type PatientForAppointmentModel = {
  patient_rut: string;
  patient_name: string;
  patient_phone: string;
};

export type ProfessionalForAppointment = {
  professions: string[];
  professional_name: string;
};
