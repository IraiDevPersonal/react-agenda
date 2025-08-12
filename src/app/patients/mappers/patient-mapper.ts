import { CustomError } from "@/lib/custom-error";

import type { UpsertPatientResponseModel } from "../domain/models/patient-action-model";
import type { PatientHistoryModel } from "../domain/models/patient-history-model";
import type {
  PatientModel,
  PatientResponseModel,
} from "../domain/models/patient-model";

import {
  PatientResponseSchema,
} from "../domain/models/patient-model";
import { ApiPatientHistorySchema } from "../domain/schemas/patient-history-schema";
import { ApiPatientSchema } from "../domain/schemas/patient-schema";
import { ApiUpsertPatientResponseSchema } from "../domain/schemas/upsert-patient-response-schema";

export class PatientMapper {
  private static mapHistory(raw: unknown): PatientHistoryModel {
    const { success, error, data } = ApiPatientHistorySchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "PatientMapper.mapHistory",
      });
    }

    return {
      uid: data.uid,
      status: data.status,
      date_time: data.date_time,
    };
  }

  static map(raw: unknown): PatientModel {
    const { success, error, data } = ApiPatientSchema.safeParse(raw);

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
      address: data.address,
      last_names: data.last_names,
      is_deleted: data.is_deleted ?? false,
      avatar_image: data.avatar_image ?? null,
    };
  }

  static fromApiToDomain(raw: unknown): PatientResponseModel {
    const { success, error, data } = PatientResponseSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "PatientMapper.fromApiToDomain",
      });
    }

    return {
      data: data.data.map(this.map),
      pages: data.pages,
      limit: data.limit,
      total: data.total,
      page: data.page,
    };
  }

  static upsertFromApiToDomain(raw: unknown): UpsertPatientResponseModel {
    const { success, error, data } = ApiUpsertPatientResponseSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "PatientMapper.upsertFromApiToDomain",
      });
    }

    return {
      data: this.map(data.data),
      message: data.message,
    };
  }

  static patientHistoryToArray(raw: unknown): PatientHistoryModel[] {
    const { success, error, data } = ApiPatientHistorySchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "PatientMapper.patientHistoryToArray",
      });
    }

    return data.map(this.mapHistory);
  }
}
