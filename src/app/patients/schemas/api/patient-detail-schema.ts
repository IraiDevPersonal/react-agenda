import z from "zod";

import { UserGender } from "@/app/users/models/shared-model";

import { ApiPatientSchema } from "./patient-schema";

export const ApiPatientDetailSchema = ApiPatientSchema
  .extend({
    gender: z.enum(UserGender),
  });
