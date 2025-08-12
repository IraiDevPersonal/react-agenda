import type { UseQueryOptions } from "@tanstack/react-query";
import type { Values } from "nuqs";

import { queryOptions } from "@tanstack/react-query";

import type { TQueryKey } from "@/lib/types/global-types";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { queryParser } from "@/lib/utils";

import type { ProfessionalDetailResponseModel } from "./domain/models/professional-detail-model";
import type { ProfessionalForFilterModel } from "./domain/models/professional-for-filters-model";
import type { ProfessionalResponseModel } from "./domain/models/professional-model";
import type { ProfessionalFilters } from "./domain/models/types";
import type { ProfessionalServiceImpl } from "./service";

type Filters = Values<ProfessionalFilters>;

type ProfessionalQueryImpl = {
  list: (filters: Filters) => UseQueryOptions<
    ProfessionalResponseModel,
    Error,
    ProfessionalResponseModel,
    TQueryKey
  >;
  pagination: (filters: Filters) => UseQueryOptions<
    ProfessionalResponseModel,
    Error,
    Omit<ProfessionalResponseModel, "data">,
    TQueryKey
  >;
  total: (filters: Filters) => UseQueryOptions<
    ProfessionalResponseModel,
    Error,
    number,
    TQueryKey
  >;
  forLoader: (filters: Filters) => UseQueryOptions<
    ProfessionalResponseModel,
    Error,
    null,
    TQueryKey
  >;
  detail: (uid: string) => UseQueryOptions<
    ProfessionalDetailResponseModel,
    Error,
    ProfessionalDetailResponseModel,
    TQueryKey
  >;
  forFilters: () => UseQueryOptions<
    ProfessionalForFilterModel[],
    Error,
    ProfessionalForFilterModel[],
    TQueryKey
  >;
};

export class ProfessionalQuery implements ProfessionalQueryImpl {
  private readonly service: ProfessionalServiceImpl;

  constructor(service: ProfessionalServiceImpl) {
    this.service = service;
  }

  private defaultListOptions = (filters: Filters) => {
    return queryOptions({
      queryKey: [QUERY_KEYS.prefessionals, filters] as TQueryKey,
      queryFn: () => this.service.getProfessionals(queryParser(filters)),
    });
  };

  list = (filters: Filters) => {
    return queryOptions({
      ...this.defaultListOptions(filters),
      staleTime({ state }) {
        const data = state.data as ProfessionalResponseModel | undefined;
        return (data?.total ?? 0) > 0 ? (1 * 60 * 1000) : 0;
      },
    });
  };

  pagination = (filters: Filters) => {
    return queryOptions({
      ...this.defaultListOptions(filters),
      select: (data) => {
        return {
          total: data.total,
          limit: data.limit,
          page: data.page,
          pages: data.pages,
        };
      },
      throwOnError: false,
    });
  };

  total = (filters: Filters) => {
    return queryOptions({
      ...this.defaultListOptions(filters),
      select: data => data.total,
      throwOnError: false,
    });
  };

  forLoader = (filters: Filters) => {
    return queryOptions({
      ...this.defaultListOptions(filters),
      select: () => null,
      throwOnError: false,
    });
  };

  detail = (uid: string) => {
    return queryOptions({
      queryKey: [QUERY_KEYS.prefessionals, QUERY_KEYS.generic.detail, uid] as TQueryKey,
      queryFn: () => this.service.getProfessionalByUid(uid),
      refetchOnWindowFocus: false,
      throwOnError: false,
      retry: 0,
    });
  };

  forFilters = () => {
    return queryOptions({
      refetchOnWindowFocus: false,
      queryKey: [QUERY_KEYS.prefessionals, "for-filter"] as TQueryKey,
      queryFn: () => this.service.getProfessionalsForFilters(),
    });
  };
}
