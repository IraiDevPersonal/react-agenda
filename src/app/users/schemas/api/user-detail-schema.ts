import { UserGenericSchema } from "./user-generic-schema";
import { ApiUserSchema } from "./user-schema";

export const ApiUserDetailSchema = ApiUserSchema.extend({
  gender: UserGenericSchema.GENDER,
});
