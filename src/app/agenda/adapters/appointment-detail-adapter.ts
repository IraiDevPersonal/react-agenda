import { PatientAdapter } from "@/app/patient/adapters/patient-adapter";
import { ProfessionalAdapter } from "@/app/professional/apdapters/professional-adapter";

import type { AppointmentDetail } from "../types/appointment-detail";

import { AppointmentStatus } from "../types/appointment";
import { AppointmentDetailSchema } from "../types/appointment-detail";

export class AppointmentDetailAdapter {
  static httpResponse(response: any) {
    return this.validate(response);
  }

  private static mapper(item: any) {
    return {
      uid: item.uid,
      date: item.date,
      time_from: item.time_from,
      time_to: item.time_to,
      is_enabled: item.is_enabled,
      status: item.status ?? AppointmentStatus.INDETERMINATE,
      patient_history: PatientAdapter.patientHistoryToArray(item.patient_history ?? []),
      professional: ProfessionalAdapter.validate(item.professional),
      patient: PatientAdapter.validatePatientForAppointmentDetail(item.patient),
      alert: item.alert,
    } satisfies AppointmentDetail;
  }

  private static validate(item: any) {
    try {
      const data = this.mapper(item);
      return AppointmentDetailSchema.parse(data);
    }
    catch (error) {
      console.error("Validation error:", error);
      throw new Error("Invalid appointment data");
    }
  }
};
