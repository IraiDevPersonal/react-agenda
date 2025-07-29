import { queryOptions } from "@tanstack/react-query";

import type { StringifyObject } from "@/types/global-types";

import { QUERY_KEYS } from "@/constants/query-keys";

import type { AppointmentFilters, AppointmentModel } from "../models/appointment-model";

import { AgendaServices } from "../services/agenda-services";

type Filters = Partial<StringifyObject<AppointmentFilters>>;

function getAll(filters?: Filters) {
  return queryOptions({
    queryKey: [QUERY_KEYS.appointments, filters],
    queryFn: () => AgendaServices.getAppointments(filters),
    enabled: !!filters?.profession_id,
  });
}

function getDetail(uid: AppointmentModel["uid"]) {
  return queryOptions({
    queryKey: [QUERY_KEYS.appointments, QUERY_KEYS.generic.detail, uid],
    queryFn: () => AgendaServices.getAppointmentDetail(uid),
    enabled: !!uid,
  });
}

export const AppointmentQueryOptions = {
  getDetail,
  getAll,
};
