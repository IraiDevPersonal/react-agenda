import z from "zod";

import { ApiPatientForAppointmentSchema } from "@/app/patients/schemas/api/patient-for-appointment-schema";
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
  appointment_status: AppointmentStatusSchema,
  patient: ApiPatientForAppointmentSchema.nullable(),
  professional: z.object({
    professions: z.string().array(),
    full_name: PersonSchema.FullName,
  }),
});
