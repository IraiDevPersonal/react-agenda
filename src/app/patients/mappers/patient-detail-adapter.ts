import { CustomError } from "@/lib/custom-error";

import type { PatientDetailResponseModel } from "../domain/models/patient-detail-model";

import { ApiPatientDetailResponseSchema } from "../domain/schemas/patient-detail-response-schema";
import { PatientMapper } from "./patient-mapper";

export class PatientDetailMapper {
  static fromApiToDomain(raw: unknown): PatientDetailResponseModel {
    const { success, error, data } = ApiPatientDetailResponseSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "PatientDetailMapper.fromApiToDomain",
      });
    }

    return {
      data: PatientMapper.map(data.data),
      appointment_history: data.appointment_history,
    };
  }
}
