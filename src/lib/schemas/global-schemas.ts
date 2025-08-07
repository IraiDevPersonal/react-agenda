import z from "zod";

export const OptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const UidScheme = z.uuid("uid invalido");
export const IdSchema = z.number("ID debe ser numerico")
  .positive("ID debe ser positivo")
  .int("ID debe ser un numero entero");

export function ResponseWithPaginationSchema<T extends z.ZodType>(DataScheme: T) {
  return z.object({
    data: z.array(DataScheme),
    total: z.number(),
    page: z.number(),
    pages: z.number(),
    limit: z.number(),
  });
}
