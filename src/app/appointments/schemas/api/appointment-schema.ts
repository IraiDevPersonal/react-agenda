import z from "zod";

import { UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

import { AppointmentStatus } from "../../models/shared-model";

export const AppointmentStatusSchema = z.enum(AppointmentStatus, {
  error: "estado de cita invalido",
});

export const AppointmentSchema = z.object({
  uid: UidScheme,
  date: z.string(),
  time_to: z.string(),
  time_from: z.string(),
  professions: z.string().array(),
  full_name: PersonSchema.FullName,
  patient_rut: PersonSchema.Rut.nullable(),
  appointment_status: AppointmentStatusSchema,
  patient_phone: PersonSchema.Phone.nullable(),
  patient_name: PersonSchema.FullName.nullable(),
});
