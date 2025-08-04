import type { UseMutationOptions } from "@tanstack/react-query";

import { queryOptions } from "@tanstack/react-query";

import type { TQueryKey } from "@/lib/types/global-types";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import type { PatientFilters } from "../models";
import type { PatientResponseModel } from "../models/patient-model";

import { PatientServices } from "../services/patient-services";

function genericOptions(filters: PatientFilters) {
  return queryOptions({
    queryKey: [QUERY_KEYS.patients, filters] as TQueryKey,
    queryFn: () => PatientServices.getAll(filters),
  });
}

function getAll(filters: PatientFilters) {
  return queryOptions({
    ...genericOptions(filters),
    staleTime({ state }) {
      const data = state.data as PatientResponseModel | undefined;
      return (data?.total ?? 0) > 0 ? (1 * 60 * 1000) : 0;
    },
  });
}

function getTotalPatients(filters: PatientFilters) {
  return queryOptions({
    ...genericOptions(filters),
    select: data => data.total,
  });
}

function getPatientLoaderState(filters: PatientFilters) {
  return queryOptions({
    ...genericOptions(filters),
    select: () => null,
  });
}

function getPatientMetaData(filters: PatientFilters) {
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

function getDetail(uid: string) {
  return queryOptions({
    queryKey: [QUERY_KEYS.patients, QUERY_KEYS.generic.detail, uid],
    queryFn: () => PatientServices.getDetail(uid),
    refetchOnWindowFocus: false,
    throwOnError: false,
    retry: 0,
  });
}

function upsert(): Pick<UseMutationOptions, "mutationKey"> {
  return {
    mutationKey: [QUERY_KEYS.patients, QUERY_KEYS.generic.upsert],
  };
}

function toggleStatus(): Pick<UseMutationOptions, "mutationKey"> {
  return {
    mutationKey: [QUERY_KEYS.patients, QUERY_KEYS.generic.delete],
  };
}

export const PatientQuery = {
  upsert,
  getAll,
  getDetail,
  toggleStatus,
  getTotalPatients,
  getPatientMetaData,
  getPatientLoaderState,
};
