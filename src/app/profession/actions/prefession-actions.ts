import { agendaService } from "@/services/agenda.service";

import { professionFilterAdapter } from "../apdapters/profession-filter-adapter";

async function getProfessionForFilters() {
  const { data } = await agendaService.get("/professions/to-filter");
  return professionFilterAdapter(data);
}

export const professionActions = {
  getProfessionForFilters,
};
