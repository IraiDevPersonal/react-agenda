import { checkRut } from "react-rut-formatter";
import z from "zod";

import { isValidPhoneNumber } from "../utils";

export const PersonSchema = {
  AvatarImage: z.url("url de avatar invalida")
    .optional()
    .nullable()
    .default(null),
  LastNames: z.string()
    .min(1, "apellidos obligatorios"),
  FullName: z.string()
    .min(1, "nombre obligatorio"),
  Address: z.string()
    .min(1, "dirección obligatoria")
    .min(10, "dirección muy corta, minimo 10 caracteres"),
  Email: z.email("correo invalido")
    .min(1, "correo obligatorio"),
  Phone: z.string()
    .min(1, "teléfono obligatorio")
    .refine(isValidPhoneNumber, "teléfono invalido"),
  Names: z.string()
    .min(1, "nombres obligatorios"),
  Rut: z.string()
    .min(1, "rut obligatorio")
    .refine(checkRut, "rut invalido"),
  BirthDate: z.string(),
};
