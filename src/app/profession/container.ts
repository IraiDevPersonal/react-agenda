import { agendaService } from "@/services/agenda-service";

import { ProfessionQuery } from "./query";
import { ProfessionService } from "./service";

const professionService = new ProfessionService({
  client: agendaService,
  endpoint: "/professions",
});

export const professionQuery = new ProfessionQuery(professionService);
