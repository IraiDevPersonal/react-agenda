import { agendaService } from "@/services/agenda.service";

import { ProfessionalFilterAdapter } from "../apdapters/professional-filter-adapter";

async function getProfessionalForFilters() {
  const { data } = await agendaService.get("/professionals/to-filter");
  return ProfessionalFilterAdapter.httpResponse(data);
}

export const ProfessionalActions = {
  getProfessionalForFilters,
};
