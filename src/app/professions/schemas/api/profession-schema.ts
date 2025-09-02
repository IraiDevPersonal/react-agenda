import z from "zod";
import { IdSchema } from "@/lib/schemas/global-schemas";

export const ApiProfessionSchema = z.object({
  id: IdSchema,
  name: z.string().min(1, { error: "el nombre es obligatorio" }),
});
