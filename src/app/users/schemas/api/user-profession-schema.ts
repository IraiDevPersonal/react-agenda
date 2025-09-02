import z from "zod";

import { IdSchema } from "@/lib/schemas/global-schemas";

export const UserRoleOrProfessionSchema = z.object({
  id: IdSchema,
  name: z.string().default("sin especificar"),
});
