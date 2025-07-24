import type { StringifyObject } from "@/types/global-types";

import { AgendaService } from "@/services/agenda-service";

import type { PatientFilters } from "../models";

import { PatientAdapter } from "../adapters/patient-adapter";

async function getAll(filters?: StringifyObject<PatientFilters>) {
  const { data } = await AgendaService.get("/patients", { params: filters });
  return PatientAdapter.httpResponse(data);
}

async function getDetail(uid: string) {
  const { data } = await AgendaService.get(`/patients/${uid}`);
  return PatientAdapter.patientDetailHttpResponse(data);
}

export const PatientActions = {
  getAll,
  getDetail,
};
