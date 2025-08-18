import { ResponseWithPaginationSchema } from "@/lib/schemas/global-schemas";

import { ApiProfessionalSchema } from "./professional-schema";

export const ApiProfessionalResponseSchema = ResponseWithPaginationSchema(ApiProfessionalSchema);
