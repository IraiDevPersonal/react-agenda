import { z } from "zod";

import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ApiUserForAppointmentDetailSchema = z.object({
  fullname: PersonSchema.FullName,
  professions: z.string().array(),
  pay_methods: z.string().array(),
  confirm_methods: z.string().array(),
});
