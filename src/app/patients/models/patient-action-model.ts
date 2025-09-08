import type { PatientDetailModel } from "./patient-detail-model";
import type { PatientFormValues } from "./patient-form-model";

export type UpsertPatientServiceFn = (
  payload: PatientFormValues,
) => Promise<UpsertPatientResponseModel>;

export type TogglePatientStatusServiceFn = (
  uid: string,
) => Promise<UpsertPatientResponseModel>;

export type UpsertPatientResponseModel = {
  data: PatientDetailModel;
};
