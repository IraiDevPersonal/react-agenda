import { CustomError } from "@/lib/custom-error";

import type { UserDetailResponseModel } from "../models/user-detail-model";

import { UserDetailResponseSchema } from "../schemas/api/user-detail-response-schema";
import { UserMapper } from "./user-mapper";

export class UserDetailMapper {
  static fromApiToDomain(raw: unknown): UserDetailResponseModel {
    const { success, error, data } = UserDetailResponseSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, { loggerMessage: "UserDetailMapper.fromApiToDomain" });
    }

    return {
      data: UserMapper.map(data.data),
      blocks: data.blocks,
    };
  }
}
