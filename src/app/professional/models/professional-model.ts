import z from "zod";

import { IdSchema, ResponseWithPaginationSchema, UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ProfessionalRoleOrProfessionSchema = z.object({
  id: IdSchema,
  name: z.string().default("sin especificar"),
});

export const ProfessionalSchema = z.object({
  uid: UidScheme,
  rut: PersonSchema.Rut,
  names: PersonSchema.Names,
  last_names: PersonSchema.FullName,
  phone: PersonSchema.Phone,
  email: PersonSchema.Email,
  role: ProfessionalRoleOrProfessionSchema,
  avatar_image: PersonSchema.AvatarImage,
  address: PersonSchema.Address,
  professions: z.array(ProfessionalRoleOrProfessionSchema),
});

export const ProfessionalResponseSchema = ResponseWithPaginationSchema(ProfessionalSchema);

export type ProfessionalResponseModel = z.infer<typeof ProfessionalResponseSchema>;
export type ProfessionalProfessionModel = z.infer<typeof ProfessionalRoleOrProfessionSchema>;
export type ProfessionalRoleModel = z.infer<typeof ProfessionalRoleOrProfessionSchema>;
export type ProfessionalModel = z.infer<typeof ProfessionalSchema>;
