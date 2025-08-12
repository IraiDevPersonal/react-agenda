import type { PatientModel } from "./patient-model";

export type PatientDetailResponseModel = {
  data: PatientModel;
  appointment_history?: any[];
};
