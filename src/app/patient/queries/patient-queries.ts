import type { UseMutationOptions } from "@tanstack/react-query";

import { queryOptions } from "@tanstack/react-query";

import type { StringifyObject } from "@/lib/types/global-types";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import type { PatientFilters } from "../models";

import { PatientServices } from "../services/patient-services";

function getAll(filters?: StringifyObject<PatientFilters>) {
  return queryOptions({
    queryKey: [QUERY_KEYS.patients, filters],
    queryFn: () => PatientServices.getAll(filters),
  });
}

function getTotalPatients(filters?: StringifyObject<PatientFilters>) {
  return queryOptions({
    ...getAll(filters),
    select: data => data.total,
  });
}

function getPatientLoaderState(filters?: StringifyObject<PatientFilters>) {
  return queryOptions({
    ...getAll(filters),
    select: () => null,

  });
}

function getPatientMetaData(filters?: StringifyObject<PatientFilters>) {
  return queryOptions({
    ...getAll(filters),
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

function del(): Pick<UseMutationOptions, "mutationKey"> {
  return {
    mutationKey: [QUERY_KEYS.patients, QUERY_KEYS.generic.delete],
  };
}

export const PatientQueryOptions = {
  del,
  upsert,
  getAll,
  getDetail,
  getTotalPatients,
  getPatientMetaData,
  getPatientLoaderState,
};
