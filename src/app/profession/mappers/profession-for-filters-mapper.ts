import { CustomError } from "@/lib/custom-error";

import type { ProfessionForFiltersOption } from "../domain/models/profession-for-filters-model";

import { ProfessionForFilterSchema } from "../domain/schemas/profession-for-filters-schema";

export class ProfessionalForFiltersMapper {
  static map(raw: unknown): ProfessionForFiltersOption {
    const { success, error, data } = ProfessionForFilterSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "ProfessionalForFiltersMapper.map",
      });
    }

    return {
      label: data.label,
      value: data.value,
    };
  }

  static fromApiToDomain(raw: unknown): ProfessionForFiltersOption[] {
    const { success, error, data } = ProfessionForFilterSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "ProfessionalForFiltersMapper.fromApiToDomain",
      });
    }

    return data.map(this.map);
  }
}
