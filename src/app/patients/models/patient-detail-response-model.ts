import type { PatientDetailModel } from "./patient-detail-model";

export type PatientDetailResponseModel = {
  data: PatientDetailModel;
  appointment_history?: any[];
};
