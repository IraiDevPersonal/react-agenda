import { CustomError } from "@/lib/custom-error";

import type { ProfessionalForFilterModel } from "../models/professional-for-filters-model";

import { ApiProfessionalForFiltersSchema } from "../schemas/api/professional-for-filters-schema";

export class ProfessinoalForFiltersMapper {
  static map(raw: unknown): ProfessionalForFilterModel {
    const { success, error, data } =
      ApiProfessionalForFiltersSchema.safeParse(raw);

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

  static fromApiToDomain(raw: unknown): ProfessionalForFilterModel[] {
    const { success, error, data } =
      ApiProfessionalForFiltersSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "UserForFiltersMapper.fromApiToDomain",
      });
    }

    return data.map(ProfessinoalForFiltersMapper.map);
  }
}
