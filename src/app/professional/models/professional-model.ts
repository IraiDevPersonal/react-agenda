import { z } from "zod";

import { PersonSchemas } from "@/lib/schemas/person-schemas";

export const ProfessionalForAppointmentDetailSchema = z.object({
  fullname: PersonSchemas.FullName,
  professions: z.string().array(),
  pay_methods: z.string().array(),
  confirm_methods: z.string().array(),
});

export type ProfessionalForAppointmentDetail = z.infer<typeof ProfessionalForAppointmentDetailSchema>;
