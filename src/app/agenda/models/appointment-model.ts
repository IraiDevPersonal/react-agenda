import z from "zod";

import { UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchemas } from "@/lib/schemas/person-schemas";

import { AppointmentStatusScheme } from ".";

export const AppointmentSchema = z.object({
  uid: UidScheme,
  date: z.string(),
  time_from: z.string(),
  time_to: z.string(),
  patient_name: PersonSchemas.FullName,
  patient_rut: PersonSchemas.Rut,
  patient_phone: PersonSchemas.Phone,
  professional_name: PersonSchemas.FullName,
  professions: z.string().array(),
  appointment_status: AppointmentStatusScheme,
});

export type AppointmentModel = z.infer<typeof AppointmentSchema>;
