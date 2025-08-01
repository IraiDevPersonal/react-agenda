import { checkRut } from "react-rut-formatter";
import z from "zod";

import { isValidPhoneNumber } from "../utils";

const RutScheme = z.string()
  .min(1, "rut obligatorio")
  .refine(checkRut, "rut invalido");

const NamesScheme = z.string()
  .min(1, "nombres obligatorios");

const FullNameScheme = z.string()
  .min(1, "nombre obligatorio");

const LastNamesScheme = z.string()
  .min(1, "apellidos obligatorios");

const EmailScheme = z.email("correo invalido")
  .min(1, "correo obligatorio");

const PhoneScheme = z.string()
  .min(1, "teléfono obligatorio")
  .refine(isValidPhoneNumber, "teléfono invalido");

const AddressScheme = z.string()
  .min(1, "dirección obligatoria")
  .min(10, "dirección muy corta, minimo 10 caracteres");

const AvatarImageScheme = z.url("url de avatar invalida")
  .optional()
  .nullable();

export const PersonSchemas = {
  AvatarImage: AvatarImageScheme,
  LastNames: LastNamesScheme,
  FullName: FullNameScheme,
  Address: AddressScheme,
  Email: EmailScheme,
  Phone: PhoneScheme,
  Names: NamesScheme,
  Rut: RutScheme,
};
