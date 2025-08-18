import { CustomError } from "@/lib/custom-error";

import type { ProfessionForFilterModel } from "../models/profession-for-filters-model";

import { ProfessionForFiltersSchema } from "../schemas/profession-for-filters-schema";

export class ProfessionalForFiltersMapper {
  static map(raw: unknown): ProfessionForFilterModel {
    const { success, error, data } = ProfessionForFiltersSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "ProfessionForFiltersMapper.map",
      });
    }

    return {
      label: data.label,
      value: data.value,
    };
  }

  static fromApiToDomain(raw: unknown): ProfessionForFilterModel[] {
    const { success, error, data } = ProfessionForFiltersSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "ProfessionForFiltersMapper.fromApiToDomain",
      });
    }

    return data.map(this.map);
  }
}
