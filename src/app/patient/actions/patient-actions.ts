import { AgendaService } from "@/services/agenda-service";

import { PatientAdapter } from "../adapters/patient-adapter";

async function getAll() {
  const { data } = await AgendaService.get("/patients");
  return PatientAdapter.httpResponse(data);
}

export const PatientActions = {
  getAll,
};
