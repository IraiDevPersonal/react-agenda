export enum AppointmentStatus {
  "AVAILABLE" = "AVAILABLE",
  "TO-CONFIRM" = "TO_CONFIRM",
  "CONFIRMED" = "CONFIRMED",
  "CANCELLED" = "CANCELLED",
  "INDETERMINATE" = "INDETERMINATE",
}

export type Appointment = {
  uid: string;
  date: string;
  time_from: string;
  time_to: string;
  patient_name: string;
  patient_rut: string;
  patient_phone: string;
  professional_name: string;
  professions: string[];
  appointment_status: AppointmentStatus;
};
