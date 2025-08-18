import z from "zod";

import { PersonSchema } from "@/lib/schemas/person-schemas";

export const PatientFormSchema = z.object({
  rut: PersonSchema.Rut,
  names: PersonSchema.Names,
  email: PersonSchema.Email,
  phone: PersonSchema.Phone,
  address: PersonSchema.Address,
  last_names: PersonSchema.LastNames,
  // avatar_image: PersonSchema.AvatarImage,
});
