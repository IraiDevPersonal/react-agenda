import z from "zod";

import { UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

import { AppointmentStatusSchema } from "./schema";

export const AppointmentSchema = z.object({
  uid: UidScheme,
  date: z.string(),
  time_to: z.string(),
  time_from: z.string(),
  patient_rut: PersonSchema.Rut,
  professions: z.string().array(),
  patient_phone: PersonSchema.Phone,
  patient_name: PersonSchema.FullName,
  professional_name: PersonSchema.FullName,
  appointment_status: AppointmentStatusSchema,
});
