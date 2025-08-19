import type { PatientModel } from "./patient-model";

export type PatientForAppointmentDetailModel = Omit<PatientModel, "is_deleted">;
