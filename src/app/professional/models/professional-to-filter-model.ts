import z from "zod";

import { OptionSchema } from "@/lib/schemas/global-schemas";

export const ProfessionalOptionSchema = OptionSchema.extend({
  professions: z.string().array(),
});

export type ProfessionalOption = z.infer<typeof ProfessionalOptionSchema>;
