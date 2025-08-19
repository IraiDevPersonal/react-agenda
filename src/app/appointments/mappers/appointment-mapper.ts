import { CustomError } from "@/lib/custom-error";

import type { AppointmentModel } from "../models/appointment-model";

import { AppointmentStatus } from "../models/shared-model";
import { AppointmentSchema } from "../schemas/api/appointment-schema";

export class AppointmentMapper {
  static map(raw: unknown): AppointmentModel {
    const { success, error, data } = AppointmentSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "AppointmentMapper.map",
      });
    }

    const isAvailable = data.appointment_status === AppointmentStatus.AVAILABLE;

    return {
      uid: data.uid,
      date: data.date,
      time_to: data.time_to,
      time_from: data.time_from,
      appointment_status: data.appointment_status,
      // FIXME: modificar cuando la api lo entrege de forma adecuada
      patient: isAvailable
        ? null
        : {
            patient_rut: data.patient_rut!,
            patient_name: data.patient_name!,
            patient_phone: data.patient_phone!,
          },
      professional: {
        professions: data.professions,
        professional_name: data.professional_name,
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

    return data.map(this.map);
  }
}
