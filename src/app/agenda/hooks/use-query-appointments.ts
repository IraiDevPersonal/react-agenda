import { useQuery } from "@tanstack/react-query";

import type { GenericQueryOptions } from "@/lib/types/global-types";

import { parseAsParams } from "@/lib/utils";

import type { AppointmentFilters } from "../models/appointment-model";

import { useAppointmentFilters } from "./use-appointment-filters";

export function useQueryAppointments<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>({
  appointmentQueryOptions,
}: GenericQueryOptions<
  "appointmentQueryOptions",
  Partial<AppointmentFilters>,
  TQueryFnData,
  TError,
  TData
>) {
  const { filters } = useAppointmentFilters();
  return useQuery(appointmentQueryOptions(parseAsParams(filters)));
}
