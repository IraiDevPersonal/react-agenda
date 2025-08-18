import z from "zod";

import { ResponseWithPaginationSchema as ApiResponseWithPaginationSchema, UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ApiPatientSchema = z.object({
  uid: UidScheme,
  rut: PersonSchema.Rut,
  names: PersonSchema.Names,
  email: PersonSchema.Email,
  phone: PersonSchema.Phone,
  address: PersonSchema.Address,
  last_names: PersonSchema.LastNames,
  avatar_image: PersonSchema.AvatarImage,
  is_deleted: z.boolean().optional().default(false),
});

export const PatientResponseSchema = ApiResponseWithPaginationSchema(ApiPatientSchema);
