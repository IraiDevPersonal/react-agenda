import { ApiUserSchema } from "@/app/users/schemas/api/user-schema";
import { UidScheme } from "@/lib/schemas/global-schemas";
import { PersonSchema } from "@/lib/schemas/person-schemas";

export const ApiPatientSchema = ApiUserSchema
  .pick({
    status: true,
  })
  .extend({
    uid: UidScheme,
    rut: PersonSchema.Rut,
    names: PersonSchema.Names,
    email: PersonSchema.Email,
    phone: PersonSchema.Phone,
    address: PersonSchema.Address,
    last_names: PersonSchema.LastNames,
    birth_date: PersonSchema.BirthDate,
    avatar_image: PersonSchema.AvatarImage,
  });
