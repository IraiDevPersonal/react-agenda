import { queryOptions } from "@tanstack/react-query";

import type { StringifyObject } from "@/types/global-types";

import { QueryKeys } from "@/constants/query-keys";

import type { PatientFilters } from "../models";

import { PatientActions } from "../actions/patient-actions";

function getAll(filters?: StringifyObject<PatientFilters>) {
  return queryOptions({
    queryKey: [QueryKeys.patients, filters],
    queryFn: () => PatientActions.getAll(filters),
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
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.patients, "one", uid],
    queryFn: () => PatientActions.getDetail(uid),
  });
}

export const PatientQueryOptions = {
  getAll,
  getDetail,
  getTotalPatients,
  getPatientMetaData,
};
