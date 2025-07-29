import { queryOptions } from "@tanstack/react-query";

import type { StringifyObject } from "@/types/global-types";

import { QUERY_KEYS } from "@/constants/query-keys";

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
    retry: 0,
    refetchOnWindowFocus: false,
    queryKey: [QUERY_KEYS.patients, QUERY_KEYS.generic.detail, uid],
    queryFn: () => PatientServices.getDetail(uid),
    throwOnError: false,
  });
}

export const PatientQueryOptions = {
  getAll,
  getDetail,
  getTotalPatients,
  getPatientMetaData,
};
