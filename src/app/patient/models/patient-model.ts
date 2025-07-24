import z from "zod";

import { AppointmentStatus } from "@/app/agenda/models/appointment-model";

export const PatientSchema = z.object({
  uid: z.string(),
  rut: z.string(),
  names: z.string(),
  last_names: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  is_deleted: z.boolean().optional().default(false),
  avatar_image: z.string().optional().nullable(),
});

export const PatientResponseSchema = z.object({
  data: z.array(PatientSchema),
  total: z.number(),
  page: z.number(),
  pages: z.number(),
  limit: z.number(),
});

export const PatientDetailResponseSchema = z.object({
  data: PatientSchema,
  appointment_history: z.array(z.any()).optional(),
});

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
export type PatientModel = z.infer<typeof PatientSchema>;
export type PatientResponseModel = z.infer<typeof PatientResponseSchema>;
export type PatientDetailResponseModel = z.infer<typeof PatientDetailResponseSchema>;
