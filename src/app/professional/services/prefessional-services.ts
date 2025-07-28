import { AgendaApi } from "@/api/agenda-api";

import { ProfessionalFilterAdapter } from "../apdapters/professional-filter-adapter";

async function getProfessionalForFilters() {
  const { data } = await AgendaApi.get("/professionals/to-filter");
  return ProfessionalFilterAdapter.httpResponse(data);
}

export const ProfessionalServices = {
  getProfessionalForFilters,
};
