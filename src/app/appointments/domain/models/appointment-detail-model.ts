import type { PatientHistoryModel } from "@/app/patient/models/patient-history-model";
import type { PatientModel } from "@/app/patient/models/patient-model";

import type { ProfessionalForAppointmentDetailModel } from "@/app/professionals/domain/models/professional-for-appointment-detail-model";

import type { AppointmentStatus } from "./type";

export type AppointmentDetailModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  is_enabled: boolean;
  status: AppointmentStatus;
  alert: AlertForAppointmentDetailModel;
  patient_history: PatientHistoryModel[];
  patient: Omit<PatientModel, "is_deleted"> | null;
  professional: ProfessionalForAppointmentDetailModel;
};

export type AlertForAppointmentDetailModel = {
  message: string;
  is_required: boolean;
};
