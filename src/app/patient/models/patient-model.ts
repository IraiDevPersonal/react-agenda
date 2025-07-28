import { checkRut } from "react-rut-formatter";
import z from "zod";

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

export type PatientModel = z.infer<typeof PatientSchema>;
export type PatientResponseModel = z.infer<typeof PatientResponseSchema>;
