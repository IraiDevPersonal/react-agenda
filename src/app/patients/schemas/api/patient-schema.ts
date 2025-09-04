import z from "zod";
import { UserGender, UserStatus } from "@/app/users/models/shared-model";
import { UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ApiPatientSchema = z.object({
  uid: UidScheme,
  rut: PersonSchema.Rut,
  names: PersonSchema.Names,
  email: PersonSchema.Email,
  phone: PersonSchema.Phone,
  gender: z.enum(UserGender),
  status: z.enum(UserStatus),
  address: PersonSchema.Address,
  last_names: PersonSchema.LastNames,
  birth_date: PersonSchema.BirthDate,
  avatar_image: PersonSchema.AvatarImage,
});
