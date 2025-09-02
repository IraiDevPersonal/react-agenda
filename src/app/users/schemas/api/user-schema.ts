import z from "zod";

import { UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

import { UserRoleOrProfessionSchema } from "./user-profession-schema";

export const ApiUserSchema = z.object({
  uid: UidScheme,
  rut: PersonSchema.Rut,
  names: PersonSchema.Names,
  phone: PersonSchema.Phone,
  email: PersonSchema.Email,
  address: PersonSchema.Address,
  last_names: PersonSchema.LastNames,
  avatar_image: PersonSchema.AvatarImage,
  role: UserRoleOrProfessionSchema,
  professions: z.array(UserRoleOrProfessionSchema),
});
