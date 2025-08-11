import { agendaService } from "@/services/agenda-service";
import { sleep } from "@/lib/utils";

import type { PatientFilters } from "../models";
import type { PatientFormValues } from "../models/patient-form-model";

import { PatientAdapter } from "../adapters/patient-adapter";

async function getAll(filters: PatientFilters) {
  await sleep();
  const { data } = await agendaService.get("/patients", { params: filters });
  return PatientAdapter.httpResponse(data);
}

async function getDetail(uid: string) {
  await sleep();
  const { data } = await agendaService.get(`/patients/${uid}`);
  return PatientAdapter.patientDetailHttpResponse(data);
}

async function update(
  uid: string,
  payload: PatientFormValues,
) {
  await sleep();
  const { data } = await agendaService.put(`/patients/${uid}`, payload);
  return PatientAdapter.upsertPatientHttpResponse(data);
}

async function create(
  payload: PatientFormValues,
) {
  await sleep();
  const { data } = await agendaService.post("/patients", payload);
  return PatientAdapter.upsertPatientHttpResponse(data);
}

async function toggleStatus(uid: string) {
  await sleep();
  const { data } = await agendaService.patch(`/patients/${uid}`);
  return PatientAdapter.upsertPatientHttpResponse(data);
}

export const PatientServices = {
  getAll,
  getDetail,
  update,
  create,
  toggleStatus,
};
