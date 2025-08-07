import { AgendaApi } from "@/api/agenda-api";
import { sleep } from "@/lib/utils";

import type { ProfessionalFilters } from "../models";

import { ProfessionalAdapter } from "../apdapters/professional-adapter";

async function getAll(filters: ProfessionalFilters) {
  await sleep();
  const { data } = await AgendaApi.get("/professionals", { params: filters });
  return ProfessionalAdapter.httpResponse(data);
}

async function getDetail(uid: string) {
  await sleep();
  const { data } = await AgendaApi.get(`/professionals/${uid}`);
  return ProfessionalAdapter.detailHttpResponse(data);
}

async function getProfessionalForFilters() {
  const { data } = await AgendaApi.get("/professionals/for-filter");
  return ProfessionalAdapter.professionalForFiltersHttpResponse(data);
}

export const ProfessionalServices = {
  getAll,
  getDetail,
  getProfessionalForFilters,
};
