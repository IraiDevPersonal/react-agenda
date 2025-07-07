import type { AppointmentStatus } from "./appointment";

export type OneAppointment = {
  professional: Professional;
  patient: Patient;
  alert: Alert;
  patient_history: PatientHistory[];
  date: string;
  time_from: string;
  time_to: string;
  is_enabled: boolean;
  status: AppointmentStatus;
};

type Alert = {
  message: string;
  is_required: boolean;
};

type Patient = {
  names: string;
  lastnames: string;
  rut: string;
  phone: string;
  email: string;
  address: string;
};

type PatientHistory = {
  date_time: string;
  status: string;
};

type Professional = {
  fullname: string;
  professions: string[];
  pay_methods: string[];
  confirm_methods: string[];
};
