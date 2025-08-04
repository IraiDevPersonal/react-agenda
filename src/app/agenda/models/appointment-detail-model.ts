import z from "zod";

import { PatientHistorySchema } from "@/app/patient/models/patient-history-model";
import { PatientSchema } from "@/app/patient/models/patient-model";
import { ProfessionalForAppointmentDetailSchema } from "@/app/professional/models/professional-for-appointment-detail-model";

import { AppointmentStatusScheme } from ".";

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
  status: AppointmentStatusScheme,
  patient_history: z.array(PatientHistorySchema),
  professional: ProfessionalForAppointmentDetailSchema,
  patient: PatientSchema.omit({ is_deleted: true }).nullable(),
  alert: AlertForAppointmentDetailSchema,
});

export type AppointmentDetailModel = z.infer<typeof AppointmentDetailSchema>;
export type AlertForAppointmentDetailModel = z.infer<typeof AlertForAppointmentDetailSchema>;
