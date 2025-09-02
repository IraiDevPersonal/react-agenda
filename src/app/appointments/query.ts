import type { UseQueryOptions } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import type { Values } from "nuqs";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import type { TQueryKey } from "@/lib/types/global-types";
import { queryParser } from "@/lib/utils";

import type { AppointmentDetailModel } from "./models/appointment-detail-model";
import type { AppointmentModel } from "./models/appointment-model";
import type {
  AppointmentFilters,
  AppointmentStatus,
} from "./models/shared-model";
import type { AppointmentServiceImpl } from "./service";

type Filters = Partial<Values<AppointmentFilters>>;

export type AppointmentQueryImpl = {
  list: (
    filters: Filters,
  ) => UseQueryOptions<
    AppointmentModel[],
    Error,
    AppointmentModel[],
    TQueryKey
  >;
  detail: (
    uid: string,
  ) => UseQueryOptions<
    AppointmentDetailModel,
    Error,
    AppointmentDetailModel,
    TQueryKey
  >;
  detailStatus: (
    uid: string,
  ) => UseQueryOptions<
    AppointmentDetailModel,
    Error,
    AppointmentStatus,
    TQueryKey
  >;
};

export class AppointmentQuery implements AppointmentQueryImpl {
  private readonly service: AppointmentServiceImpl;

  constructor(service: AppointmentServiceImpl) {
    this.service = service;
  }

  private detailDefaultOptions(uid: string) {
    return queryOptions({
      queryKey: [
        QUERY_KEYS.appointments,
        QUERY_KEYS.generic.detail,
        uid,
      ] as TQueryKey,
      queryFn: () => this.service.getAppointmentByUid(uid),
      enabled: !!uid,
    });
  }

  list = (filters: Filters) => {
    return queryOptions({
      queryKey: [QUERY_KEYS.appointments, filters] as TQueryKey,
      queryFn: () => this.service.getAppointments(queryParser(filters)),
      enabled: !!filters.profession_id,
    });
  };

  detail = (uid: string) => {
    return queryOptions({
      ...this.detailDefaultOptions(uid),
    });
  };

  detailStatus = (uid: string) => {
    return queryOptions({
      ...this.detailDefaultOptions(uid),
      select: (data) => data.status,
    });
  };
}
