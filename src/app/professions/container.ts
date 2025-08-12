import { agendaClient } from "@/api/agenda-client";

import { ProfessionQuery } from "./query";
import { ProfessionService } from "./service";

const professionService = new ProfessionService({
  client: agendaClient,
  endpoint: "/professions",
});

export const professionQuery = new ProfessionQuery(professionService);
