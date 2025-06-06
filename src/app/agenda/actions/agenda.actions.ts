import { agendaService } from "@/services/agenda.service";

import { appointmentAdapters } from "../adapters/appointment-adapter";

async function getAgenda() {
  // const search = this.stringifyFilters(filters);
  // agendaService.withAutorization();
  const { data } = await agendaService.get(`/agenda?`);
  return appointmentAdapters.httpResponse(data);
}

export const agendaActions = {
  getAgenda,
};
