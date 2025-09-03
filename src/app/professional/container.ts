import { agendaClient } from "@/api/agenda-client";
import { ProfessionalQuery } from "./query";
import { ProfessionalService } from "./service";

const professionalService = new ProfessionalService({
  client: agendaClient,
  endpoint: "/professionals",
});

export const professionalQuery = new ProfessionalQuery(professionalService);
