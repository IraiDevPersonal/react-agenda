import { CustomError } from "@/lib/custom-error";

import type { AppointmentDetailModel } from "../domain/models/appointment-detail-model";

import { ApiAppointmentDetailSchema } from "../domain/schemas/appointment-detail-schema";

export class AppointmentDetailMapper {
  static map(raw: unknown): AppointmentDetailModel {
    const { success, error, data } = ApiAppointmentDetailSchema.safeParse(raw)

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "AppointmentDetailMapper.map"
      })
    }

    return {
      uid: data.uid,
      date: data.date,
      time_to: data.time_to,
      time_from: data.time_from,
      is_enabled: data.is_enabled,
      status: data.status,
      alert: data.alert,
      patient_history: data.patient_history,
      professional: data.professional,
      patient: data.patient
    }
  }

  static fromApiToDomain(raw: unknown): AppointmentDetailModel {
    const data = this.map(raw)
    return data
  }
}
