import z from "zod";

import { ApiPatientSchema } from "./patient-schema";

export const ApiUpsertPatientResponseSchema = z.object({
  data: ApiPatientSchema,
});
