import type { PatientHistoryModel } from "./patient-history-model";
import type { PatientModel } from "./patient-model";

export type PatientForAppointmentDetailModel = Omit<
  PatientModel,
  "birth_date" | "status" | "avatar_image"
> & {
  history: PatientHistoryModel[];
};
