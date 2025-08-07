import { queryOptions } from "@tanstack/react-query";

import type { TQueryKey } from "@/lib/types/global-types";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import type { ProfessionalFilters } from "../models";
import type { ProfessionalResponseModel } from "../models/professional-model";

import { ProfessionalServices } from "../services/prefessional-services";

function genericOptions(filters: ProfessionalFilters) {
  return queryOptions({
    queryKey: [QUERY_KEYS.prefessionals, filters] as TQueryKey,
    queryFn: () => ProfessionalServices.getAll(filters),
  });
}

function getAll(filters: ProfessionalFilters) {
  return queryOptions({
    ...genericOptions(filters),
    staleTime({ state }) {
      const data = state.data as ProfessionalResponseModel | undefined;
      return (data?.total ?? 0) > 0 ? (1 * 60 * 1000) : 0;
    },
  });
}

function getProfessionalsMetaData(filters: ProfessionalFilters) {
  return queryOptions({
    ...genericOptions(filters),
    select: (data) => {
      return {
        limit: data.limit,
        page: data.page,
        pages: data.pages,
      };
    },
  });
}

function getTotal(filters: ProfessionalFilters) {
  return queryOptions({
    ...genericOptions(filters),
    select: data => data.total,
  });
}

function getLoaderState(filters: ProfessionalFilters) {
  return queryOptions({
    ...genericOptions(filters),
    select: () => null,
  });
}

function getDetail(uid: string) {
  return queryOptions({
    queryKey: [QUERY_KEYS.prefessionals, QUERY_KEYS.generic.detail, uid] as TQueryKey,
    queryFn: () => ProfessionalServices.getDetail(uid),
    refetchOnWindowFocus: false,
    throwOnError: false,
    retry: 0,
  });
}

function getProfessionalForFilter() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QUERY_KEYS.prefessionals, "for-filter"] as TQueryKey,
    queryFn: () => ProfessionalServices.getProfessionalForFilters(),
  });
}

export const ProfessionalQuery = {
  getAll,
  getTotal,
  getDetail,
  getLoaderState,
  forFitlers: getProfessionalForFilter,
  getMetaData: getProfessionalsMetaData,
};
