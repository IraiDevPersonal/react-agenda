import { agendaService } from "@/services/agenda-service";

import { ProfessionalQuery } from "./query";
import { ProfessionalService } from "./service";

const professionalService = new ProfessionalService({
  client: agendaService,
  endpoint: "/professionals",
});

export const professionalQuery = new ProfessionalQuery(professionalService);
