import { agendaService } from "@/services/agenda.service";

import { professionFilterAdapter } from "../apdapters/profession-filter.adapter";

async function getProfessionForFilters() {
  const { data } = await agendaService.get("/profession/to-filter");
  return professionFilterAdapter.httpResponse(data);
}

export const professionAction = {
  getProfessionForFilters,
};
