import { AgendaService } from "@/services/agenda.service";

import { ProfessionFilterAdapter } from "../apdapters/profession-filter-adapter";

async function getProfessionForFilters() {
  const { data } = await AgendaService.get("/professions/to-filter");
  return ProfessionFilterAdapter.httpResponse(data);
}

export const ProfessionActions = {
  getProfessionForFilters,
};
