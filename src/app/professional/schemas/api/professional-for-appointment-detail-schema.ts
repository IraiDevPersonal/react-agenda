import { z } from "zod";

import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ApiProfessionalForAppointmentDetailSchema = z.object({
  full_name: PersonSchema.FullName,
  professions: z.string().array(),
  pay_methods: z.string().array(),
  confirm_methods: z.string().array(),
});
