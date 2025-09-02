import type { PatientFormValues } from "./patient-form-model";
import type { PatientModel } from "./patient-model";

export type UpsertPatientServiceFn = (
  payload: PatientFormValues,
) => Promise<UpsertPatientResponseModel>;
export type TogglePatientStatusServiceFn = (
  uid: string,
) => Promise<UpsertPatientResponseModel>;
export type UpsertPatientResponseModel = {
  data: PatientModel;
  message: string;
};
