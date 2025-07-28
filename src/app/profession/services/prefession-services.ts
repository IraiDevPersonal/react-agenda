import { AgendaApi } from "@/api/agenda-api";

import { ProfessionFilterAdapter } from "../apdapters/profession-filter-adapter";

async function getProfessionForFilters() {
  const { data } = await AgendaApi.get("/professions/to-filter");
  return ProfessionFilterAdapter.httpResponse(data);
}

export const ProfessionServices = {
  getProfessionForFilters,
};
