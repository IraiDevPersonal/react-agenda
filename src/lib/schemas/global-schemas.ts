import z from "zod";

export const OptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const GenericDeleteResponseSchema = z.object({
  messsage: z.string(),
});
