import { agendaService } from "@/services/agenda-service";

import { PatientQuery } from "./query";
import { PatientService } from "./service";

export const patientService = new PatientService({
  client: agendaService,
  endpoint: "/patients",
});

export const patientQuery = new PatientQuery(patientService);
