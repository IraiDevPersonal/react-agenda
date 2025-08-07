import { AgendaApi } from "@/api/agenda-api";

import { ProfessionForFiltersAdapter } from "../apdapters/profession-for-filters-adapter";

async function getProfessionForFilters() {
  const { data } = await AgendaApi.get("/professions/for-filter");
  return ProfessionForFiltersAdapter.httpResponse(data);
}

export const ProfessionServices = {
  getProfessionForFilters,
};
