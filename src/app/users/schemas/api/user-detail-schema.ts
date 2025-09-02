import z from "zod";

import { UserGender } from "../../models/types";
import { ApiUserSchema } from "./user-schema";

export const ApiUserDetailSchema = ApiUserSchema.extend({
  gender: z.enum(UserGender, { error: "genero invalido" }),
});
