import { CustomError } from "@/lib/custom-error";

import type { AppointmentModel } from "../models/appointment-model";

import { AppointmentSchema } from "../schemas/api/appointment-schema";

export class AppointmentMapper {
  static map(raw: unknown): AppointmentModel {
    const { success, error, data } = AppointmentSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "AppointmentMapper.map",
      });
    }

    const patient = data.patient;
    const professional = data.professional;

    return {
      uid: data.uid,
      date: data.date,
      time_to: data.time_to,
      time_from: data.time_from,
      status: data.status,
      patient: patient
        ? {
            rut: patient.rut,
            phone: patient.phone,
            full_name: patient.full_name,
          }
        : null,
      professional: {
        professions: professional.professions,
        full_name: professional.full_name,
      },
    };
  }

  static fromApiToDomain(raw: unknown): AppointmentModel[] {
    const { success, error, data } = AppointmentSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "AppointmentMapper.fromApiToDomain",
      });
    }

    return data.map(AppointmentMapper.map);
  }
}
