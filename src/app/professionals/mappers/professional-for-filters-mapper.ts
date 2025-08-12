import { CustomError } from "@/lib/custom-error";

import type { ProfessionalForFilterModel } from "../domain/models/professional-for-filters-model";

import { ApiProfessionalForFiltersSchema } from "../domain/schemas/professional-for-filters-schema";

export class ProfessionalForFiltersMapper {
  static map(raw: unknown): ProfessionalForFilterModel {
    const { success, error, data } = ApiProfessionalForFiltersSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "ProfessionalForFiltersMapper.map",
      });
    }

    return {
      label: data.label,
      value: data.value,
      professions: data.professions,
    };
  }

  static fromApiToDomain(raw: unknown): ProfessionalForFilterModel[] {
    const { success, error, data } = ApiProfessionalForFiltersSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "ProfessionalForFiltersMapper.fromApiToDomain",
      });
    }

    return data.map(this.map);
  }
}
