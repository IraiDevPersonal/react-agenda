import z from "zod";

import { ResponseWithPaginationSchema, UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

export const PatientSchema = z.object({
  uid: UidScheme,
  rut: PersonSchema.Rut,
  names: PersonSchema.Names,
  last_names: PersonSchema.LastNames,
  email: PersonSchema.Email,
  phone: PersonSchema.Phone,
  address: PersonSchema.Address,
  is_deleted: z.boolean().optional().default(false),
  avatar_image: PersonSchema.AvatarImage,
});

export const PatientResponseSchema = ResponseWithPaginationSchema(PatientSchema);

export type PatientModel = z.infer<typeof PatientSchema>;
export type PatientResponseModel = z.infer<typeof PatientResponseSchema>;
