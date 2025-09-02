import z from "zod";

import { UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

import { UserStatus } from "../../models/shared-model";
import { UserProfessionSchema } from "./user-profession-schema";
import { UserRoleSchema } from "./user-role-schema";

export const ApiUserSchema = z.object({
  uid: UidScheme,
  rut: PersonSchema.Rut,
  names: PersonSchema.Names,
  phone: PersonSchema.Phone,
  email: PersonSchema.Email,
  address: PersonSchema.Address,
  roles: z.array(UserRoleSchema),
  last_names: PersonSchema.LastNames,
  avatar_image: PersonSchema.AvatarImage,
  professions: z.array(UserProfessionSchema).optional(),
  status: z.enum(UserStatus, { error: "Estado invalido" }),
});
