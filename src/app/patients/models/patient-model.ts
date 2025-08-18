import type { ResponseWithPagination } from "@/lib/types/global-types";

import { ResponseWithPaginationSchema as ApiResponseWithPaginationSchema } from "@/lib/schemas/global-schemas";

import { ApiPatientSchema } from "../schemas/patient-schema";

export const PatientResponseSchema = ApiResponseWithPaginationSchema(ApiPatientSchema);

export type PatientModel = {
  uid: string;
  rut: string;
  names: string;
  email: string;
  phone: string;
  address: string;
  last_names: string;
  is_deleted?: boolean;
  avatar_image?: string | null;
};
export type PatientResponseModel = ResponseWithPagination<PatientModel>;
