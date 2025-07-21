import { PatientAdapter } from "@/app/patient/adapters/patient-adapter";
import { ProfessionalAdapter } from "@/app/professional/apdapters/professional-adapter";

import type { AppointmentDetailModel } from "../models/appointment-detail-model";

import { AppointmentDetailSchema } from "../models/appointment-detail-model";
import { AppointmentStatus } from "../models/appointment-model";

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
      professional: ProfessionalAdapter.validateProfessionalForAppointmentDetail(item.professional),
      patient: PatientAdapter.validatePatientForAppointmentDetail(item.patient),
      alert: item.alert,
    };
    return AppointmentDetailSchema.parse(data);
  }
  catch (error) {
    console.error("Validation error:", error);
    throw new Error("Invalid appointment data");
  }
}
export const AppointmentDetailAdapter = {
  httpResponse: (response: any) => validate(response),
};
