import type { PatientHistoryModel } from "./patient-history-model";
import type { PatientModel } from "./patient-model";

export type PatientForAppointmentDetailModel = Pick<
  PatientModel,
  | "address"
  | "avatar_image"
  | "email"
  | "phone"
  | "rut"
  | "uid"
  | "names"
  | "last_names"
> & {
  full_name: string;
  history: PatientHistoryModel[];
};
