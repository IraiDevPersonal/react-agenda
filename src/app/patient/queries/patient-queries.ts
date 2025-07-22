import { queryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys";

import { PatientActions } from "../actions/patient-actions";

function getAll() {
  return queryOptions({
    queryKey: [QueryKeys.patients],
    queryFn: () => PatientActions.getAll(),
  });
}

export const PatientQueryOptions = {
  getAll,
};
