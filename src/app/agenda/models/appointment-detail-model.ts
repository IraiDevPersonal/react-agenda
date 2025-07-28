import z from "zod";

import { PatientHistorySchema } from "@/app/patient/models/patient-history-model";
import { PatientSchema } from "@/app/patient/models/patient-model";
import { ProfessionalForAppointmentDetailSchema } from "@/app/professional/models/professional-model";

import { AppointmentStatus } from "./appointment-model";

export const AlertForAppointmentDetailSchema = z.object({
  message: z.string(),
  is_required: z.boolean(),
});

export const AppointmentDetailSchema = z.object({
  uid: z.string(),
  date: z.string(),
  time_from: z.string(),
  time_to: z.string(),
  is_enabled: z.boolean(),
  status: z.enum(AppointmentStatus),
  patient_history: z.array(PatientHistorySchema),
  professional: ProfessionalForAppointmentDetailSchema,
  patient: PatientSchema.omit({ is_deleted: true }).nullable(),
  alert: AlertForAppointmentDetailSchema,
});

export type AppointmentDetailModel = z.infer<typeof AppointmentDetailSchema>;
export type AlertForAppointmentDetailModel = z.infer<typeof AlertForAppointmentDetailSchema>;
