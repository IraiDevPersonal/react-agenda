import { z } from "zod";

import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ApiProfessionalForAppointmentDetailSchema = z.object({
  names: PersonSchema.Names,
  last_names: PersonSchema.LastNames,
  professions: z.string().array(),
  pay_methods: z.string().array(),
  confirm_methods: z.string().array(),
});
