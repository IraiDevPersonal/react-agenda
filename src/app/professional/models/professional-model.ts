import z from "zod";

import { IdSchema, ResponseWithPaginationSchema, UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchemas } from "@/lib/schemas/person-schemas";

export const ProfessionalRoleOrProfessionSchema = z.object({
  id: IdSchema,
  name: z.string().default("sin especificar"),
});

export const ProfessionalSchema = z.object({
  user_id: IdSchema,
  uid: UidScheme,
  rut: PersonSchemas.Rut,
  names: PersonSchemas.Names,
  last_names: PersonSchemas.FullName,
  phone: PersonSchemas.Phone,
  email: PersonSchemas.Email,
  role: ProfessionalRoleOrProfessionSchema,
  professions: z.array(ProfessionalRoleOrProfessionSchema),
});

export const ProfessionalResponseSchema = ResponseWithPaginationSchema(ProfessionalSchema);

export type ProfessionalResponseModel = z.infer<typeof ProfessionalResponseSchema>;
export type ProfessionalProfessionModel = z.infer<typeof ProfessionalRoleOrProfessionSchema>;
export type ProfessionalRoleModel = z.infer<typeof ProfessionalRoleOrProfessionSchema>;
export type ProfessionalModel = z.infer<typeof ProfessionalSchema>;
