import { agendaService } from "@/services/agenda.service";

import { appointmentAdapter } from "../adapters/appointment-adapter";

async function getAppointments(filters?: Record<string, string>) {
  // agendaService.useAuthInterceptor();
  const { data } = await agendaService.get(`/agenda`, { params: filters });
  return appointmentAdapter.getAppointmentsHttpResponse(data);
}

async function getOneAppointment(uid: string) {
  // agendaService.useAuthInterceptor();
  const { data } = await agendaService.get(`/agenda/detail/${uid}`);
  return appointmentAdapter.getOneAppointmentHttpResponse(data);
}

export const agendaActions = {
  getAppointments,
  getOneAppointment,
};
