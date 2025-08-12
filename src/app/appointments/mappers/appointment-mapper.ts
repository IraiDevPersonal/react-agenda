import { CustomError } from "@/lib/custom-error";

import type { AppointmentModel } from "../domain/models/appointment-model";

import { AppointmentSchema } from "../domain/schemas/appointment-schema";

export class AppointmentMapper {
  static map(raw: unknown): AppointmentModel {
    const { success, error, data } = AppointmentSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "AppointmentMapper.map",
      });
    }

    return {
      uid: data.uid,
      date: data.date,
      time_to: data.time_to,
      time_from: data.time_from,
      patient_rut: data.patient_rut,
      professions: data.professions,
      patient_name: data.patient_name,
      patient_phone: data.patient_phone,
      professional_name: data.professional_name,
      appointment_status: data.appointment_status,
    };
  }

  static fromApiToDomain(raw: unknown): AppointmentModel[] {
    const { success, error, data } = AppointmentSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "AppointmentMapper.map",
      });
    }

    return data.map(this.map);
  }
}
