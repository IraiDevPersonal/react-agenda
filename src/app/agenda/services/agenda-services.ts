import { AgendaApi } from "@/api/agenda-api";

import { AppointmentAdapter } from "../adapters/appointment-adapter";
import { AppointmentDetailAdapter } from "../adapters/appointment-detail-adapter";

async function getAppointments(filters?: Record<string, string>) {
  // agendaService.useAuthInterceptor();
  const { data } = await AgendaApi.get(`/appointments`, { params: filters });
  return AppointmentAdapter.httpResponse(data);
}

async function getAppointmentDetail(uid: string) {
  // agendaService.useAuthInterceptor();
  const { data } = await AgendaApi.get(`/appointments/${uid}`);
  return AppointmentDetailAdapter.httpResponse(data);
}

export const AgendaServices = {
  getAppointments,
  getAppointmentDetail,
};
