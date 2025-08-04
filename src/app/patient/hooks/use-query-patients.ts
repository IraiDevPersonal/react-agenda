import { useQuery } from "@tanstack/react-query";

import type { GenericQueryOptions } from "@/lib/types/global-types";

import { parseQuery } from "@/lib/utils";

import type { PatientFilters } from "../models";

import { usePatientFilters } from "./use-patient-filters";

export function useQueryPatients<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>({ patientQueryOptions }: GenericQueryOptions<
  "patientQueryOptions",
  PatientFilters,
  TQueryFnData,
  TError,
  TData
>) {
  const { filters } = usePatientFilters();
  return useQuery(patientQueryOptions(parseQuery(filters)));
}
