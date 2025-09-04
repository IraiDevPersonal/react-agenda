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

    const patient = data.patient;
    const professional = data.professional;

    return {
      uid: data.uid,
      date: data.date,
      alert: data.alert,
      status: data.status,
      time_to: data.time_to,
      time_from: data.time_from,
      is_enabled: data.is_enabled,
      professional: {
        full_name: professional.full_name,
        pay_methods: professional.pay_methods,
        professions: professional.professions,
        confirm_methods: professional.confirm_methods,
      },
      patient: patient
        ? {
            uid: patient.uid,
            rut: patient.rut,
            email: patient.email,
            phone: patient.phone,
            names: patient.names,
            address: patient.address,
            history: patient.history,
            avatar_image: patient.address,
            last_names: patient.last_names,
            full_name: `${patient.names} ${patient.last_names}`,
          }
        : null,
    };
  }

  static fromApiToDomain(raw: unknown): AppointmentDetailModel {
    return AppointmentDetailMapper.map(raw);
  }
}
