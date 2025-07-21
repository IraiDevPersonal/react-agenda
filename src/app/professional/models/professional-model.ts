import { z } from "zod";

export const ProfessionalForAppointmentDetailSchema = z.object({
  fullname: z.string(),
  professions: z.string().array(),
  pay_methods: z.string().array(),
  confirm_methods: z.string().array(),
});

export type ProfessionalForAppointmentDetail = z.infer<typeof ProfessionalForAppointmentDetailSchema>;
