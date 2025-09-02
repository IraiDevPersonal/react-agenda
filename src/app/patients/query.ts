import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import type { Values } from "nuqs";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import type { TQueryKey } from "@/lib/types/global-types";
import { queryParser } from "@/lib/utils";

import type { PatientDetailResponseModel } from "./models/patient-detail-response-model";
import type { PatientResponseModel } from "./models/patient-response-model";
import type { PatientFilters } from "./models/shared-model";
import type { PatientServiceImpl } from "./service";

type Filters = Values<PatientFilters>;

export type PatientQueryImpl = {
  list: (
    filters: Filters,
  ) => UseQueryOptions<
    PatientResponseModel,
    Error,
    PatientResponseModel,
    TQueryKey
  >;
  total: (
    filters: Filters,
  ) => UseQueryOptions<PatientResponseModel, Error, number, TQueryKey>;
  pagination: (
    filters: Filters,
  ) => UseQueryOptions<
    PatientResponseModel,
    Error,
    Omit<PatientResponseModel, "data">,
    TQueryKey
  >;
  detail: (
    uid: string,
  ) => UseQueryOptions<
    PatientDetailResponseModel,
    Error,
    PatientDetailResponseModel,
    TQueryKey
  >;
  forLoader: (
    filters: Filters,
  ) => UseQueryOptions<PatientResponseModel, Error, null, TQueryKey>;
  upsertMutation: () => Pick<UseMutationOptions, "mutationKey">;
  toggleStatusMutation: () => Pick<UseMutationOptions, "mutationKey">;
};

export class PatientQuery implements PatientQueryImpl {
  private readonly service: PatientServiceImpl;

  constructor(service: PatientServiceImpl) {
    this.service = service;
  }

  private defaultQueryOptions = (filters: Filters) => {
    return queryOptions({
      queryKey: [QUERY_KEYS.patients, filters] as TQueryKey,
      queryFn: () => this.service.getPatients(queryParser(filters)),
    });
  };

  list = (filters: Filters) => {
    return queryOptions({
      ...this.defaultQueryOptions(filters),
      staleTime({ state }) {
        const data = state.data as PatientResponseModel | undefined;
        return (data?.total ?? 0) > 0 ? 1 * 60 * 1000 : 0;
      },
    });
  };

  total = (filters: Filters) => {
    return queryOptions({
      ...this.defaultQueryOptions(filters),
      select: (data) => data.total,
    });
  };

  forLoader = (filters: Filters) => {
    return queryOptions({
      ...this.defaultQueryOptions(filters),
      select: () => null,
    });
  };

  pagination = (filters: Filters) => {
    return queryOptions({
      ...this.defaultQueryOptions(filters),
      select: (data) => {
        return {
          total: data.total,
          limit: data.limit,
          page: data.page,
          pages: data.pages,
        };
      },
    });
  };

  detail = (uid: string) => {
    return queryOptions({
      queryKey: [
        QUERY_KEYS.patients,
        QUERY_KEYS.generic.detail,
        uid,
      ] as TQueryKey,
      queryFn: () => this.service.getPatientByUid(uid),
      refetchOnWindowFocus: false,
      throwOnError: false,
      retry: 0,
    });
  };

  upsertMutation = (): Pick<UseMutationOptions, "mutationKey"> => {
    return {
      mutationKey: [
        QUERY_KEYS.patients,
        QUERY_KEYS.generic.upsert,
      ] as TQueryKey,
    };
  };

  toggleStatusMutation = (): Pick<UseMutationOptions, "mutationKey"> => {
    return {
      mutationKey: [
        QUERY_KEYS.patients,
        QUERY_KEYS.generic.delete,
      ] as TQueryKey,
    };
  };
}
