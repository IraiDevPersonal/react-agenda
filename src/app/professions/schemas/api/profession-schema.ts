import { IdSchema } from "@/lib/schemas/global-schemas";
import z from "zod";

export const ApiProfessionSchema = z.object({
  id: IdSchema,
  name: z.string().min(1, { error: "el nombre es obligatorio" })
})