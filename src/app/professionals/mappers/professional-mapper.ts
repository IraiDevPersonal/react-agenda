import { CustomError } from "@/lib/custom-error";

import type { ProfessionalModel, ProfessionalResponseModel } from "../models/professional-model";

import { ApiProfessionalResponseSchema } from "../schemas/professional-response-schema";
import { ApiProfessionalSchema } from "../schemas/professional-schema";

export class ProfessionalMapper {
  static map(raw: unknown): ProfessionalModel {
    const { success, error, data } = ApiProfessionalSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, { loggerMessage: "ProfessionalMapper.map" });
    }

    return {
      uid: data.uid,
      rut: data.rut,
      role: data.role,
      names: data.names,
      phone: data.phone,
      email: data.email,
      address: data.address,
      last_names: data.last_names,
      professions: data.professions,
      avatar_image: data.avatar_image,
    };
  }

  static fromApiToDomain(raw: unknown): ProfessionalResponseModel {
    const { success, error, data } = ApiProfessionalResponseSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, { loggerMessage: "ProfessionalMapper.fromApiToDomain" });
    }

    return {
      page: data.page,
      total: data.total,
      limit: data.limit,
      pages: data.pages,
      data: data.data.map(this.map),
    };
  }
}
