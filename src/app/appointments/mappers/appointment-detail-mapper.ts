import { CustomError } from "@/lib/custom-error";

import type { AppointmentDetailModel } from "../models/appointment-detail-model";

import { ApiAppointmentDetailSchema } from "../schemas/api/appointment-detail-schema";

export class AppointmentDetailMapper {
  static map(raw: unknown): AppointmentDetailModel {
    const { success, error, data } = ApiAppointmentDetailSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "AppointmentDetailMapper.map",
      });
    }

    return {
      uid: data.uid,
      date: data.date,
      alert: data.alert,
      status: data.status,
      time_to: data.time_to,
      patient: data.patient,
      time_from: data.time_from,
      is_enabled: data.is_enabled,
      professional: data.professional,
      patient_history: data.patient_history,
    };
  }

  static fromApiToDomain(raw: unknown): AppointmentDetailModel {
    const data = this.map(raw);
    return data;
  }
}
