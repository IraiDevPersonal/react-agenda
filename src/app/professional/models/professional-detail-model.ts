import z from "zod";

import { ProfessionalSchema } from "./professional-model";

export const ProfessionalDetailResponseSchema = z.object({
  data: ProfessionalSchema,
  blocks: z.array(z.any()).optional(),
});

export type ProfessionalDetailResponseModel = z.infer<typeof ProfessionalDetailResponseSchema>;
