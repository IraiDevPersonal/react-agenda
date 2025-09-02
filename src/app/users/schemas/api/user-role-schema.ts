import z from "zod";

import { IdSchema } from "@/lib/schemas/global-schemas";

export const UserRoleSchema = z.object({
  id: IdSchema,
  name: z.string().default("sin especificar"),
});
