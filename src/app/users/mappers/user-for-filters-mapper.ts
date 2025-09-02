import { CustomError } from "@/lib/custom-error";

import type { UserForFilterModel } from "../models/user-for-filters-model";

import { ApiUserForFiltersSchema } from "../schemas/api/user-for-filters-schema";

export class UserForFiltersMapper {
  static map(raw: unknown): UserForFilterModel {
    const { success, error, data } = ApiUserForFiltersSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "UserForFiltersMapper.map",
      });
    }

    return {
      label: data.label,
      value: data.value,
      professions: data.professions,
    };
  }

  static fromApiToDomain(raw: unknown): UserForFilterModel[] {
    const { success, error, data } = ApiUserForFiltersSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "UserForFiltersMapper.fromApiToDomain",
      });
    }

    return data.map(this.map);
  }
}
