import type { UserGender, UserStatus } from "@/app/users/models/shared-model";

import { ResponseWithPaginationSchema as ApiResponseWithPaginationSchema } from "@/lib/schemas/global-schemas";

import { ApiPatientSchema } from "../schemas/api/patient-schema";

export const PatientResponseSchema =
  ApiResponseWithPaginationSchema(ApiPatientSchema);

export type PatientModel = {
  uid: string;
  rut: string;
  names: string;
  email: string;
  phone: string;
  address: string;
  birth_date: Date;
  gender: UserGender;
  last_names: string;
  status: UserStatus;
  avatar_image?: string | null;
};
