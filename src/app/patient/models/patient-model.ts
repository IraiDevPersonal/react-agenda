import z from "zod";

import { ResponseWithPaginationSchema, UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchemas } from "@/lib/schemas/person-schemas";

export const PatientSchema = z.object({
  uid: UidScheme,
  rut: PersonSchemas.Rut,
  names: PersonSchemas.Names,
  last_names: PersonSchemas.LastNames,
  email: PersonSchemas.Email,
  phone: PersonSchemas.Phone,
  address: PersonSchemas.Address,
  is_deleted: z.boolean().optional().default(false),
  avatar_image: PersonSchemas.AvatarImage,
});

export const PatientResponseSchema = ResponseWithPaginationSchema(PatientSchema);

export type PatientModel = z.infer<typeof PatientSchema>;
export type PatientResponseModel = z.infer<typeof PatientResponseSchema>;
