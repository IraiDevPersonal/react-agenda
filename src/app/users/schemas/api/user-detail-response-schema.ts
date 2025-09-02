import z from "zod";

import { ApiUserDetailSchema } from "./user-detail-schema";

export const UserDetailResponseSchema = z.object({
  data: ApiUserDetailSchema,
  blocks: z.array(z.any()).optional(),
});
