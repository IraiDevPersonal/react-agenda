import z from "zod";

import { ApiPatientSchema } from "./patient-schema";

export const ApiPatientDetailResponseSchema = z.object({
  data: ApiPatientSchema,
  appointment_history: z.array(z.any()).optional(),
});
