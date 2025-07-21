import z from "zod";

import { AppointmentStatus } from "@/app/agenda/types/appointment";

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

export type PatientForAppointmentDetail = z.infer<typeof PatientForAppointmentDetailSchema>;
export type PatientHistory = z.infer<typeof PatientHistorySchema>;
