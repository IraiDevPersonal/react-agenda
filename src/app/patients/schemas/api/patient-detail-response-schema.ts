import z from "zod";

import { ApiPatientDetailSchema } from "./patient-detail-schema";

export const ApiPatientDetailResponseSchema = z.object({
  data: ApiPatientDetailSchema,
  appointment_history: z.array(z.any()).optional(),
});
