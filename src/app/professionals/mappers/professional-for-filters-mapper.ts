import { CustomError } from "@/lib/custom-error";

import type { ProfessionalOption } from "../domain/models/professional-for-filters-model";

import { ApiProfessionalOptionSchema } from "../domain/schemas/professional-option-schema";

export class ProfessionalForFiltersMapper {
  static map(raw: unknown): ProfessionalOption {
    const { success, error, data } = ApiProfessionalOptionSchema.safeParse(raw);

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

  static fromApiToDomain(raw: unknown): ProfessionalOption[] {
    const { success, error, data } = ApiProfessionalOptionSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "ProfessionalForFiltersMapper.fromApiToDomain",
      });
    }

    return data.map(this.map);
  }
}
