import z from "zod";

import { PatientSchema } from "./patient-model";

export const PatientDetailResponseSchema = z.object({
  data: PatientSchema,
  appointment_history: z.array(z.any()).optional(),
});

export type PatientDetailResponseModel = z.infer<typeof PatientDetailResponseSchema>;
