import { PatientAdapter } from "@/app/patient/adapters/patient-adapter";
import { ProfessionalForAppointmentDetailMapper } from "@/app/professionals/mappers/professional-for-appointment-detail-mapper";
import { CustomError } from "@/lib/custom-error";

import type { AppointmentDetailModel } from "../models/appointment-detail-model";

import { AppointmentStatus } from "../models";
import { AppointmentDetailSchema } from "../models/appointment-detail-model";

function validate(item: any) {
  try {
    const data: AppointmentDetailModel = {
      uid: item.uid,
      date: item.date,
      time_from: item.time_from,
      time_to: item.time_to,
      is_enabled: item.is_enabled,
      status: item.status ?? AppointmentStatus.INDETERMINATE,
      patient_history: PatientAdapter.patientHistoryToArray(item.patient_history ?? []),
      professional: ProfessionalForAppointmentDetailMapper.map(item.professional),
      patient: PatientAdapter.validate(item.patient),
      alert: item.alert,
    };
    return AppointmentDetailSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}
export const AppointmentDetailAdapter = {
  httpResponse: (response: any) => validate(response),
};
