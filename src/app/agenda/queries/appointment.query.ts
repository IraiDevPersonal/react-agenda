import type { UseQueryOptions } from "@tanstack/react-query";

import type { StringifyObject } from "@/types/global.type";

import { QueryKeys } from "@/constants/query-keys.constant";

import type { Appointment, AppointmentFilters } from "../types/appointment";

import { agendaActions } from "../actions/agenda.action";

type Filters = Partial<StringifyObject<AppointmentFilters>>;

export function getAppointmentsQueryOptions(filters?: Filters): UseQueryOptions<Appointment[]> {
  return {
    queryKey: [QueryKeys.appointments, filters],
    queryFn: () => agendaActions.getAppointments(filters),
    enabled: !!filters?.profession_id,
  };
}
