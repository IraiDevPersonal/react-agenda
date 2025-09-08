import z from "zod";
import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ApiProfessionalForAppointmentSchema = z.object({
  professions: z.string().array(),
  names: PersonSchema.Names,
  last_names: PersonSchema.LastNames,
});
