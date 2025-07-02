import { queryOptions } from "@tanstack/react-query";

import type { StringifyObject } from "@/types/global.type";

import { QueryKeys } from "@/constants/query-keys.constant";

import type { Appointment, AppointmentFilters } from "../types/appointment";

import { agendaActions } from "../actions/agenda-actions";

type Filters = Partial<StringifyObject<AppointmentFilters>>;

export function getAppointmentsQueryOptions(filters?: Filters) {
  return queryOptions({
    queryKey: [QueryKeys.appointments, filters],
    queryFn: () => agendaActions.getAppointments(filters),
    enabled: !!filters?.profession_id,
  });
}

export function getOneAppointmentQueryOptions(uid: Appointment["uid"]) {
  return queryOptions({
    queryKey: [QueryKeys.appointments, "one", uid],
    queryFn: () => agendaActions.getOneAppointment(uid),
    enabled: !!uid,
  });
}
