import { agendaClient } from "@/api/agenda-client";

import { PatientQuery } from "./query";
import { PatientService } from "./service";

export const patientService = new PatientService({
  client: agendaClient,
  endpoint: "/patients",
});

export const patientQuery = new PatientQuery(patientService);
