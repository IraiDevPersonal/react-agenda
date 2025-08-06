import { useQuery } from "@tanstack/react-query";

import type { GenericUseQueryOptions } from "@/lib/types/global-types";

import { parseQuery } from "@/lib/utils";

import type { ProfessionalFilters } from "../models";

import { useProfessionalFilters } from "./use-professional-filters";

export function useQueryProfessionals<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>({ queryOptions }: GenericUseQueryOptions<
  ProfessionalFilters,
  TQueryFnData,
  TError,
  TData
>) {
  const { filters } = useProfessionalFilters();
  return useQuery(queryOptions(parseQuery(filters)));
}
