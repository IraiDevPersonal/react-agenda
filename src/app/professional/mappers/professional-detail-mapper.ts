import z from "zod";

import { CustomError } from "@/lib/custom-error";

import type { ProfessionalDetailResponseModel } from "../domain/models/professional-detail-model";

import { ProfessionalDetailResponseSchema } from "../domain/schemas/professional-detail-response-schema";
import { ProfessionalMapper } from "./professional-mapper";

export class ProfessionalDetailMapper {
  static fromApiToDomain(raw: unknown): ProfessionalDetailResponseModel {
    const { success, error, data } = ProfessionalDetailResponseSchema.safeParse(raw);

    if (!success) {
      console.warn("Error en datos de profesional", z.treeifyError(error));
      throw new CustomError("Datos de la API invalidos");
    }

    return {
      data: ProfessionalMapper.map(data.data),
      blocks: data.blocks,
    };
  }
}
