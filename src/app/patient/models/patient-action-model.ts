import z from "zod";

import type { PatientFormValues } from "./patient-form-model";

import { PatientSchema } from "./patient-model";

export const UpsertPatientResponseSchema = z.object({
  data: PatientSchema,
  message: z.string(),
});

export type UpsertPatientResponseModel = z.infer<typeof UpsertPatientResponseSchema>;
export type UpsertPatientServiceFn = (payload: PatientFormValues) => Promise<UpsertPatientResponseModel>;
export type TogglePatientStatusServiceFn = (uid: string) => Promise<UpsertPatientResponseModel>;
