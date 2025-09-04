import z from "zod";
import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ApiProfessionalForAppointmentSchema = z.object({
  professions: z.string().array(),
  full_name: PersonSchema.FullName,
});
