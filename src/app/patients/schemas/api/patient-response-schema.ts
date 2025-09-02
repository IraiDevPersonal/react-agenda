import { ResponseWithPaginationSchema as ApiResponseWithPaginationSchema } from "@/lib/schemas/global-schemas";

import { ApiPatientSchema } from "./patient-schema";

export const PatientResponseSchema = ApiResponseWithPaginationSchema(ApiPatientSchema);
