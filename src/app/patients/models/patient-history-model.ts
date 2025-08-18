import type { AppointmentStatus } from "@/app/appointments/models/shared-model";

export type PatientHistoryModel = {
  uid: string;
  date_time: string;
  status: AppointmentStatus;
};
