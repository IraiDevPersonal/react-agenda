import { checkRut } from "react-rut-formatter";
import z from "zod";

import { AppointmentStatus } from "@/app/agenda/models/appointment-model";

export const PatientSchema = z.object({
  uid: z.uuid("UID invalido"),
  rut: z.string().refine(checkRut, "rut invalido"),
  names: z.string().min(1, "nombres obligatorios"),
  last_names: z.string().min(1, "apellidos obligatorios"),
  email: z.email("correo invalido"),
  phone: z.string().min(1, "teléfono obligatorio"),
  address: z.string().min(1, "dirección obligatoria"),
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

export const UpsertPatientResponseSchema = z.object({
  data: PatientSchema,
  message: z.string(),
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

export const PatientFormSchema = PatientSchema.omit({
  avatar_image: true,
  is_deleted: true,
  // uid: true,
});

export type PatientForAppointmentDetailModel = z.infer<typeof PatientForAppointmentDetailSchema>;
export type PatientHistoryModel = z.infer<typeof PatientHistorySchema>;
export type PatientModel = z.infer<typeof PatientSchema>;
export type PatientResponseModel = z.infer<typeof PatientResponseSchema>;
export type PatientDetailResponseModel = z.infer<typeof PatientDetailResponseSchema>;
export type UpsertActionState = {
  data: PatientModel | undefined;
  success: boolean;
};
export type UpsertPatientResponseModel = z.infer<typeof UpsertPatientResponseSchema>;
