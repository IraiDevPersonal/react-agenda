import type { StringifyObject } from "@/types/global-types";

import { AgendaService } from "@/services/agenda-service";

import type { PatientFilters } from "../models";
import type { PatientModel } from "../models/patient-model";

import { PatientAdapter } from "../adapters/patient-adapter";

async function getAll(filters?: StringifyObject<PatientFilters>) {
  const { data } = await AgendaService.get("/patients", { params: filters });
  return PatientAdapter.httpResponse(data);
}

async function getDetail(uid: string) {
  const { data } = await AgendaService.get(`/patients/${uid}`);
  return PatientAdapter.patientDetailHttpResponse(data);
}

async function updatePatient(
  uid: string,
  patientLike: Omit<PatientModel, "is_deleted" | "avatar_image" | "uid">,
) {
  const { data } = await AgendaService.put(`/patients/${uid}`, patientLike);
  return PatientAdapter.upsertPatientResponse(data);
}

async function createPatient(
  patientLike: Omit<PatientModel, "is_deleted" | "avatar_image" | "uid">,
) {
  const { data } = await AgendaService.post("/patients", patientLike);
  return PatientAdapter.upsertPatientResponse(data);
}

export const PatientActions = {
  getAll,
  getDetail,
  updatePatient,
  createPatient,
};
