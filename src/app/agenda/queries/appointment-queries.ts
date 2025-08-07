import { queryOptions } from "@tanstack/react-query";

import type { TQueryKey } from "@/lib/types/global-types";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import type { AppointmentFilters } from "../models";
import type { AppointmentModel } from "../models/appointment-model";

import { AgendaServices } from "../services/agenda-services";

function getAll(filters: AppointmentFilters) {
  return queryOptions({
    queryKey: [QUERY_KEYS.appointments, filters] as TQueryKey,
    queryFn: () => AgendaServices.getAppointments(filters),
    enabled: !!filters.profession_id,
  });
}

function getDetail(uid: AppointmentModel["uid"]) {
  return queryOptions({
    queryKey: [QUERY_KEYS.appointments, QUERY_KEYS.generic.detail, uid],
    queryFn: () => AgendaServices.getAppointmentDetail(uid),
    enabled: !!uid,
  });
}

export const AppointmentQueries = {
  getDetail,
  getAll,
};
