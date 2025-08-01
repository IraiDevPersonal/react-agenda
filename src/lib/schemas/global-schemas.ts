import z from "zod";

export const OptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const UidScheme = z.uuid("uid invalido");
