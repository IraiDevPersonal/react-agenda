import z from "zod";

import { UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

import { AppointmentStatusScheme } from ".";

export const AppointmentSchema = z.object({
  uid: UidScheme,
  date: z.string(),
  time_from: z.string(),
  time_to: z.string(),
  patient_name: PersonSchema.FullName,
  patient_rut: PersonSchema.Rut,
  patient_phone: PersonSchema.Phone,
  professional_name: PersonSchema.FullName,
  professions: z.string().array(),
  appointment_status: AppointmentStatusScheme,
});

export type AppointmentModel = z.infer<typeof AppointmentSchema>;
