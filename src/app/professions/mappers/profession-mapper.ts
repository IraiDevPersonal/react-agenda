import { CustomError } from "@/lib/custom-error";

import type { ProfessionModel } from "../models/profession-model";
import { ApiProfessionSchema } from "../schemas/api/profession-schema";

export class ProfessionMapper {
  static map(raw: unknown): ProfessionModel {
    const { success, error, data } = ApiProfessionSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "ProfessionMapper.map",
      });
    }

    return {
      id: data.id,
      name: data.name,
    };
  }

  static fromApiToDomain(raw: unknown): ProfessionModel[] {
    const { success, error, data } = ApiProfessionSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "ProfessionMapper.fromApiToDomain",
      });
    }

    return data.map(ProfessionMapper.map);
  }
}
