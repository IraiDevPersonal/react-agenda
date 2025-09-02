import z from "zod";

import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ApiPatientForAppointmentSchema = z.object({
  full_name: PersonSchema.FullName,
  phone: PersonSchema.Phone,
  rut: PersonSchema.Rut,
});
