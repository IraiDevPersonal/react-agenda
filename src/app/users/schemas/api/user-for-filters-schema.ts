import z from "zod";

import { OptionSchema } from "@/lib/schemas/global-schemas";

export const ApiUserForFiltersSchema = OptionSchema.extend({
  professions: z.string().array(),
});
