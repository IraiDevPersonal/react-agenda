import type { ResponseWithPagination } from "@/lib/types/global-types";

import type { UserModel } from "./user-model";

export type UserResponseModel = ResponseWithPagination<UserModel>;
