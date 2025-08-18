import z from "zod";

import { ApiProfessionalSchema } from "./professional-schema";

export const ProfessionalDetailResponseSchema = z.object({
  data: ApiProfessionalSchema,
  blocks: z.array(z.any()).optional(),
});
