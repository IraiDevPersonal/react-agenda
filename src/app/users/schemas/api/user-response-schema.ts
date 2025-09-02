import { ResponseWithPaginationSchema } from "@/lib/schemas/global-schemas";

import { ApiUserSchema } from "./user-schema";

export const ApiUserResponseSchema = ResponseWithPaginationSchema(ApiUserSchema);
