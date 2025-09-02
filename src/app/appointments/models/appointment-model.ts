import type { PatientForAppointmentModel } from "../../patients/models/patient-for-appointment-model";
import type { AppointmentStatus } from "./shared-model";

export type AppointmentModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  status: AppointmentStatus;
  professional: UserForAppointment;
  patient: PatientForAppointmentModel | null;
};

export type UserForAppointment = {
  professions: string[];
  name: string;
};
