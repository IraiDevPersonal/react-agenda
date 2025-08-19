import type { PatientForAppointmentDetailModel } from "@/app/patients/models/patient-for-appointment-detail-model";
import type { PatientHistoryModel } from "@/app/patients/models/patient-history-model";
import type { ProfessionalForAppointmentDetailModel } from "@/app/professionals/models/professional-for-appointment-detail-model";

import type { AppointmentStatus } from "./shared-model";

export type AppointmentDetailModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  is_enabled: boolean;
  status: AppointmentStatus;
  alert: AlertForAppointmentDetailModel;
  patient_history: PatientHistoryModel[];
  patient: PatientForAppointmentDetailModel | null;
  professional: ProfessionalForAppointmentDetailModel;
};

export type AlertForAppointmentDetailModel = {
  message: string;
  is_required: boolean;
};
