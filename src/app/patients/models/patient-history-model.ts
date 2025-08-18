import type { AppointmentStatus } from "@/app/appointments/models/type";

export type PatientHistoryModel = {
  uid: string;
  date_time: string;
  status: AppointmentStatus;
};
