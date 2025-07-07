import { agendaService } from "@/services/agenda.service";

import { appointmentAdapter } from "../adapters/appointment-adapter";
import { oneAppointmentAdapter } from "../adapters/one-appointment-adapter";

async function getAppointments(filters?: Record<string, string>) {
  // agendaService.useAuthInterceptor();
  const { data } = await agendaService.get(`/agenda`, { params: filters });
  return appointmentAdapter(data);
}

async function getOneAppointment(uid: string) {
  // agendaService.useAuthInterceptor();
  const { data } = await agendaService.get(`/agenda/${uid}`);
  return oneAppointmentAdapter(data);
}

export const agendaActions = {
  getAppointments,
  getOneAppointment,
};
