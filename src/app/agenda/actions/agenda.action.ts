import { agendaService } from "@/services/agenda.service";

import { appointmentAdapter } from "../adapters/appointment.adapter";

async function getAppointments(filters?: Record<string, string>) {
  // agendaService.useAuthInterceptor();
  const { data } = await agendaService.get(`/agenda`, { params: filters });
  return appointmentAdapter.httpResponse(data);
}

export const agendaActions = {
  getAppointments,
};
