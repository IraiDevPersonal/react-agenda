import z from "zod";

import { UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

import { ApiProfessionSchema } from "@/app/professions/schemas/api/profession-schema";
import { UserGenericSchema } from "./user-generic-schema";
import { UserRoleSchema } from "./user-role-schema";

export const ApiUserSchema = z.object({
  uid: UidScheme,
  rut: PersonSchema.Rut,
  names: PersonSchema.Names,
  phone: PersonSchema.Phone,
  email: PersonSchema.Email,
  address: PersonSchema.Address,
  roles: z.array(UserRoleSchema),
  status: UserGenericSchema.STATUS,
  last_names: PersonSchema.LastNames,
  avatar_image: PersonSchema.AvatarImage,
  professions: z.array(ApiProfessionSchema).optional(),
});
