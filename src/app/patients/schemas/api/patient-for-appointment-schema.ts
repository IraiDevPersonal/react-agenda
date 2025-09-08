import z from "zod";

import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ApiPatientForAppointmentSchema = z.object({
  last_names: PersonSchema.LastNames,
  names: PersonSchema.Names,
  phone: PersonSchema.Phone,
  rut: PersonSchema.Rut,
});
