import { CustomError } from "@/lib/custom-error";

import type { ProfessionalDetailResponseModel } from "../models/professional-detail-model";

import { ProfessionalDetailResponseSchema } from "../schemas/professional-detail-response-schema";
import { ProfessionalMapper } from "./professional-mapper";

export class ProfessionalDetailMapper {
  static fromApiToDomain(raw: unknown): ProfessionalDetailResponseModel {
    const { success, error, data } = ProfessionalDetailResponseSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, { loggerMessage: "ProfessionalDetailMapper.fromApiToDomain" });
    }

    return {
      data: ProfessionalMapper.map(data.data),
      blocks: data.blocks,
    };
  }
}
