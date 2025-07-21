import z from "zod";

import { PatientForAppointmentDetailSchema, PatientHistorySchema } from "@/app/patient/types/patient";
import { ProfessionalForAppointmentDetailSchema } from "@/app/professional/components/types/professional";

import { AppointmentStatus } from "./appointment";

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
  patient: PatientForAppointmentDetailSchema,
  alert: AlertForAppointmentDetailSchema,
});

export type AppointmentDetail = z.infer<typeof AppointmentDetailSchema>;
export type AlertForAppointmentDetail = z.infer<typeof AlertForAppointmentDetailSchema>;
