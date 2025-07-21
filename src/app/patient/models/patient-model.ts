import z from "zod";

import { AppointmentStatus } from "@/app/agenda/models/appointment-model";

export const PatientForAppointmentDetailSchema = z.object({
  names: z.string(),
  last_names: z.string(),
  rut: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
});

export const PatientHistorySchema = z.object({
  uid: z.string(),
  date_time: z.string(),
  status: z.enum(AppointmentStatus),
});

export type PatientForAppointmentDetailModel = z.infer<typeof PatientForAppointmentDetailSchema>;
export type PatientHistoryModel = z.infer<typeof PatientHistorySchema>;
