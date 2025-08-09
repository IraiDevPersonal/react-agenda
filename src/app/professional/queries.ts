import { queryOptions } from "@tanstack/react-query";

import type { TQueryKey } from "@/lib/types/global-types";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import type { ProfessionalResponseModel } from "./domain/models/professional-model";
import type { ProfessionalFilters } from "./domain/models/types";

import { ProfessionalServices } from "./services";

export class ProfessionalQueries {
  private static _defaultOptions(filters: ProfessionalFilters) {
    return queryOptions({
      queryKey: [QUERY_KEYS.prefessionals, filters] as TQueryKey,
      queryFn: () => ProfessionalServices.getAll(filters),
    });
  }

  static getAll(filters: ProfessionalFilters) {
    return queryOptions({
      ...ProfessionalQueries._defaultOptions(filters),
      staleTime({ state }) {
        const data = state.data as ProfessionalResponseModel | undefined;
        return (data?.total ?? 0) > 0 ? (1 * 60 * 1000) : 0;
      },
    });
  }

  static getMetaData(filters: ProfessionalFilters) {
    return queryOptions({
      ...ProfessionalQueries._defaultOptions(filters),
      select: (data) => {
        return {
          limit: data.limit,
          page: data.page,
          pages: data.pages,
        };
      },
      throwOnError: false,
    });
  }

  static getTotal(filters: ProfessionalFilters) {
    return queryOptions({
      ...ProfessionalQueries._defaultOptions(filters),
      select: data => data.total,
      throwOnError: false,
    });
  }

  static getLoaderState(filters: ProfessionalFilters) {
    return queryOptions({
      ...ProfessionalQueries._defaultOptions(filters),
      select: () => null,
      throwOnError: false,
    });
  }

  static getDetail(uid: string) {
    return queryOptions({
      queryKey: [QUERY_KEYS.prefessionals, QUERY_KEYS.generic.detail, uid] as TQueryKey,
      queryFn: () => ProfessionalServices.getDetail(uid),
      refetchOnWindowFocus: false,
      throwOnError: false,
      retry: 0,
    });
  }

  static forFilter() {
    return queryOptions({
      refetchOnWindowFocus: false,
      queryKey: [QUERY_KEYS.prefessionals, "for-filter"] as TQueryKey,
      queryFn: () => ProfessionalServices.getForFilters(),
    });
  }
}
