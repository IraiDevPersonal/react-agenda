import type { StringifyObject } from "@/types/global-types";

import { AgendaApi } from "@/api/agenda-api";

import type { PatientFilters } from "../models";
import type { PatientFormValues } from "../models/patient-model";

import { PatientAdapter } from "../adapters/patient-adapter";

async function getAll(filters?: StringifyObject<PatientFilters>) {
  const { data } = await AgendaApi.get("/patients", { params: filters });
  return PatientAdapter.httpResponse(data);
}

async function getDetail(uid: string) {
  const { data } = await AgendaApi.get(`/patients/${uid}`);
  return PatientAdapter.patientDetailHttpResponse(data);
}

async function updatePatient(
  uid: string,
  patientLike: PatientFormValues,
) {
  const { data } = await AgendaApi.put(`/patients/${uid}`, patientLike);
  return PatientAdapter.upsertPatientResponse(data);
}

async function createPatient(
  patientLike: PatientFormValues,
) {
  const { data } = await AgendaApi.post("/patients", patientLike);
  return PatientAdapter.upsertPatientResponse(data);
}

export const PatientActions = {
  getAll,
  getDetail,
  updatePatient,
  createPatient,
};
