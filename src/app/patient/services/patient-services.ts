import type { StringifyObject } from "@/lib/types/global-types";

import { AgendaApi } from "@/api/agenda-api";
import { sleep } from "@/lib/utils";

import type { PatientFilters } from "../models";
import type { PatientFormValues } from "../models/patient-form-model";

import { PatientAdapter } from "../adapters/patient-adapter";

async function getAll(filters?: StringifyObject<PatientFilters>) {
  await sleep();
  const { data } = await AgendaApi.get("/patients", { params: filters });
  return PatientAdapter.httpResponse(data);
}

async function getDetail(uid: string) {
  await sleep();
  const { data } = await AgendaApi.get(`/patients/${uid}`);
  return PatientAdapter.patientDetailHttpResponse(data);
}

async function updatePatient(
  uid: string,
  payload: PatientFormValues,
) {
  await sleep();
  const { data } = await AgendaApi.put(`/patients/${uid}`, payload);
  return PatientAdapter.upsertPatientHttpResponse(data);
}

async function createPatient(
  payload: PatientFormValues,
) {
  await sleep();
  const { data } = await AgendaApi.post("/patients", payload);
  return PatientAdapter.upsertPatientHttpResponse(data);
}

async function togglePatientStatus(uid: string) {
  await sleep();
  const { data } = await AgendaApi.patch(`/patients/${uid}`);
  return PatientAdapter.upsertPatientHttpResponse(data);
}

export const PatientServices = {
  getAll,
  getDetail,
  updatePatient,
  createPatient,
  togglePatientStatus,
};
