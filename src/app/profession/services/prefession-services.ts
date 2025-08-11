import { agendaService } from "@/services/agenda-service";

import { ProfessionForFiltersAdapter } from "../apdapters/profession-for-filters-adapter";

async function getProfessionForFilters() {
  const { data } = await agendaService.get("/professions/for-filter");
  return ProfessionForFiltersAdapter.httpResponse(data);
}

export const ProfessionServices = {
  getProfessionForFilters,
};
