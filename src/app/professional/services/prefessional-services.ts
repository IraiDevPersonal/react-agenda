import { AgendaApi } from "@/api/agenda-api";

import { ProfessionalAdapter } from "../apdapters/professional-adapter";

async function getProfessionalForFilters() {
  const { data } = await AgendaApi.get("/professionals/to-filter");
  return ProfessionalAdapter.validateProfessionalForAppointmentDetail(data);
}

export const ProfessionalServices = {
  getProfessionalForFilters,
};
