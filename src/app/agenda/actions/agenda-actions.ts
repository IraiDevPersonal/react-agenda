import { agendaService } from "@/services/agenda.service";

import { appointmentAdapter } from "../adapters/appointment-adapter";
import { AppointmentDetailAdapter } from "../adapters/appointment-detail-adapter";

async function getAppointments(filters?: Record<string, string>) {
  // agendaService.useAuthInterceptor();
  const { data } = await agendaService.get(`/appointments`, { params: filters });
  return appointmentAdapter(data);
}

async function getOneAppointment(uid: string) {
  // agendaService.useAuthInterceptor();
  const { data } = await agendaService.get(`/appointments/${uid}`);
  return AppointmentDetailAdapter.httpResponse(data);
}

export const agendaActions = {
  getAppointments,
  getOneAppointment,
};
