import { agendaService } from "@/services/agenda.service";

import { professionalFilterAdapter } from "../apdapters/professional-filter-adapter";

async function getProfessionalForFilters() {
  const { data } = await agendaService.get("/professionals/to-filter");
  return professionalFilterAdapter(data);
}

export const professionalActions = {
  getProfessionalForFilters,
};
