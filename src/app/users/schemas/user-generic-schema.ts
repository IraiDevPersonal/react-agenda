import z from "zod";

import { UserGender, UserStatus } from "../models/shared-model";

export const UserGenericSchema = {
  GENDER: z.enum(UserGender, { error: "genero invalido" }),
  STATUS: z.enum(UserStatus, { error: "estado invalido" }),
};
