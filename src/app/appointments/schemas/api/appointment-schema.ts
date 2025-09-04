import z from "zod";
import { AppointmentStatus } from "@/app/appointments/models/shared-model";
import { ApiPatientForAppointmentSchema } from "@/app/patients/schemas/api/patient-for-appointment-schema";
import { ApiProfessionalForAppointmentSchema } from "@/app/professional/schemas/api/professional-for-appointment-schema";
import { UidScheme } from "@/lib/schemas/global-schemas";

export const AppointmentStatusSchema = z.enum(AppointmentStatus, {
  error: "estado de cita invalido",
});

export const AppointmentSchema = z.object({
  uid: UidScheme,
  date: z.string(),
  time_to: z.string(),
  time_from: z.string(),
  status: AppointmentStatusSchema,
  professional: ApiProfessionalForAppointmentSchema,
  patient: ApiPatientForAppointmentSchema.nullable(),
});
