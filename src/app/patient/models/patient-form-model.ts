import type z from "zod";

import { PatientSchema } from "./patient-model";

export const PatientFormSchema = PatientSchema.omit({
  avatar_image: true,
  is_deleted: true,
  uid: true,
});

export type PatientFormValues = z.infer<typeof PatientFormSchema>;
