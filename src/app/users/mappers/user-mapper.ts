import { CustomError } from "@/lib/custom-error";

import type { UserModel } from "../models/user-model";
import type { UserResponseModel } from "../models/user-response-model";

import { ApiUserResponseSchema } from "../schemas/api/user-response-schema";
import { ApiUserSchema } from "../schemas/api/user-schema";

export class UserMapper {
  static map(raw: unknown): UserModel {
    const { success, error, data } = ApiUserSchema.safeParse(raw);

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
      status: data.status,
      address: data.address,
      last_names: data.last_names,
      professions: data.professions,
      avatar_image: data.avatar_image,
    };
  }

  static fromApiToDomain(raw: unknown): UserResponseModel {
    const { success, error, data } = ApiUserResponseSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "UserMapper.fromApiToDomain",
      });
    }

    return {
      page: data.page,
      total: data.total,
      limit: data.limit,
      pages: data.pages,
      data: data.data.map(UserMapper.map),
    };
  }
}
