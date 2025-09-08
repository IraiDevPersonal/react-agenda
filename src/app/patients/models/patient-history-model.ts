import type { AppointmentStatus } from "@/app/appointments/models/shared-model";

export type PatientHistoryModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  date_time: string;
  status: AppointmentStatus;
};
