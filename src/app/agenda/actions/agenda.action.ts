import { agendaService } from "@/services/agenda.service";

import { appointmentAdapter } from "../adapters/appointment.adapter";

async function getAppointments(filters?: any) {
  // const search = this.stringifyFilters(filters);
  // agendaService.withAutorization();
  const { data } = await agendaService.get(`/agenda?`);
  return appointmentAdapter.httpResponse(data);
}

export const agendaActions = {
  getAppointments,
};
