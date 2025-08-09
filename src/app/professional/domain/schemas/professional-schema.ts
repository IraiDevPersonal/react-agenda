import z from "zod";

import { UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

import { ProfessionalRoleOrProfessionSchema } from "./professional-profession-schema";

export const ApiProfessionalSchema = z.object({
  uid: UidScheme,
  rut: PersonSchema.Rut,
  names: PersonSchema.Names,
  phone: PersonSchema.Phone,
  email: PersonSchema.Email,
  address: PersonSchema.Address,
  last_names: PersonSchema.LastNames,
  avatar_image: PersonSchema.AvatarImage,
  role: ProfessionalRoleOrProfessionSchema,
  professions: z.array(ProfessionalRoleOrProfessionSchema),
});
