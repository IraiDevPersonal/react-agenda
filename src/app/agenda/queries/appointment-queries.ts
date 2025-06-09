import type { UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys.constant";

import type { Appointment } from "../types/appointment";

import { agendaActions } from "../actions/agenda.action";

export function getAppointmentsQueryOptions(filters?: Record<string, string>): UseQueryOptions<Appointment[]> {
  return {
    queryKey: [QueryKeys.appointments, filters],
    queryFn: () => agendaActions.getAppointments(filters),
  };
}
