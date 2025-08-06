import { useQuery } from "@tanstack/react-query";

import type { GenericUseQueryOptions } from "@/lib/types/global-types";

import { parseQuery } from "@/lib/utils";

import type { AppointmentFilters } from "../models";

import { useAppointmentFilters } from "./use-appointment-filters";

export function useQueryAppointments<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>({
  queryOptions,
}: GenericUseQueryOptions<
  Partial<AppointmentFilters>,
  TQueryFnData,
  TError,
  TData
>) {
  const { filters } = useAppointmentFilters();
  return useQuery(queryOptions(parseQuery(filters)));
}
