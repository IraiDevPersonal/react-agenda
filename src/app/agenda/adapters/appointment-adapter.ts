import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

import type { AppointmentModel } from "../models/appointment-model";

import { AppointmentSchema, AppointmentStatus } from "../models/appointment-model";

function validate(item: any): AppointmentModel {
  try {
    const data: AppointmentModel = {
      uid: item.uid,
      date: item.date,
      time_from: item.time_from,
      time_to: item.time_to,
      patient_name: item.patient_name,
      patient_rut: item.patient_rut,
      patient_phone: item.patient_phone,
      professional_name: item.professional_name,
      professions: safeArray(item.professions ?? []).map(String),
      appointment_status: item.appointment_status ?? AppointmentStatus.INDETERMINATE,
    };

    return AppointmentSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

export const AppointmentAdapter = {
  httpResponse: (data: any[]) => safeArray<AppointmentModel>(data).map(validate),
};
