import { CustomError } from "@/lib/custom-error";

import type { PatientDetailModel } from "../models/patient-detail-model";
import type { PatientDetailResponseModel } from "../models/patient-detail-response-model";

import { ApiPatientDetailResponseSchema } from "../schemas/api/patient-detail-response-schema";
import { ApiPatientDetailSchema } from "../schemas/api/patient-detail-schema";

export class PatientDetailMapper {
  private static map(raw: unknown): PatientDetailModel {
    const { success, error, data } = ApiPatientDetailSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "PatientMapper.map",
      });
    }

    return {
      uid: data.uid,
      rut: data.rut,
      names: data.names,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      status: data.status,
      address: data.address,
      last_names: data.last_names,
      birth_date: new Date(data.birth_date),
      avatar_image: data.avatar_image ?? null,
    };
  }

  static fromApiToDomain(raw: unknown): PatientDetailResponseModel {
    const { success, error, data } = ApiPatientDetailResponseSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "PatientDetailMapper.fromApiToDomain",
      });
    }

    return {
      data: this.map(data.data),
      appointment_history: data.appointment_history,
    };
  }
}
