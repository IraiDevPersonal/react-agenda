import z from "zod";

import { ApiUserSchema } from "./user-schema";

export const UserDetailResponseSchema = z.object({
  data: ApiUserSchema,
  blocks: z.array(z.any()).optional(),
});
