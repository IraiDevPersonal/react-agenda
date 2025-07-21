import z from "zod";

import { OptionSchema } from "@/schemas/global-schemas";

export const ProfessionalOptionSchema = OptionSchema.extend({
  professions: z.string().array(),
});

export type ProfessionalOption = z.infer<typeof ProfessionalOptionSchema>;
