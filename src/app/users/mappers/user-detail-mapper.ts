import { CustomError } from "@/lib/custom-error";

import type { UserDetailModel } from "../models/user-detail-model";
import type { UserDetailResponseModel } from "../models/user-detail-response-model";

import { UserDetailResponseSchema } from "../schemas/api/user-detail-response-schema";
import { ApiUserDetailSchema } from "../schemas/api/user-detail-schema";

export class UserDetailMapper {
  private static map(raw: unknown): UserDetailModel {
    const { success, error, data } = ApiUserDetailSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, { loggerMessage: "UserMapper.map" });
    }

    return {
      uid: data.uid,
      rut: data.rut,
      roles: data.roles,
      names: data.names,
      phone: data.phone,
      email: data.email,
      gender: data.gender,
      status: data.status,
      address: data.address,
      last_names: data.last_names,
      professions: data.professions,
      avatar_image: data.avatar_image,
    };
  }

  static fromApiToDomain(raw: unknown): UserDetailResponseModel {
    const { success, error, data } = UserDetailResponseSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "UserDetailMapper.fromApiToDomain",
      });
    }

    return {
      data: UserDetailMapper.map(data.data),
      blocks: data.blocks,
    };
  }
}
