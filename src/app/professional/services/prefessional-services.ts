import { AgendaApi } from "@/api/agenda-api";

import type { ProfessionalFilters } from "../models";

import { ProfessionalAdapter } from "../apdapters/professional-adapter";

async function getAll(filters: ProfessionalFilters) {
  const { data } = await AgendaApi.get("/professionals", { params: filters });
  return ProfessionalAdapter.httpResponse(data);
}

async function getProfessionalForFilters() {
  const { data } = await AgendaApi.get("/professionals/to-filter");
  return ProfessionalAdapter.professionalForFiltersHttpResponse(data);
}

export const ProfessionalServices = {
  getAll,
  getProfessionalForFilters,
};
