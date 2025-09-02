import z from "zod";

import { UserGenericSchema } from "@/app/users/schemas/api/user-generic-schema";
import { PersonSchema } from "@/lib/schemas/person-schemas";

export const PatientFormSchema = z.object({
  rut: PersonSchema.Rut,
  names: PersonSchema.Names,
  email: PersonSchema.Email,
  phone: PersonSchema.Phone,
  address: PersonSchema.Address,
  gender: UserGenericSchema.GENDER,
  last_names: PersonSchema.LastNames,
  birth_date: PersonSchema.BirthDate,
  // avatar_image: PersonSchema.AvatarImage,
});
