import { useQuery } from "@tanstack/react-query";

import type { GenericQueryOptions } from "@/lib/types/global-types";

import { parseQuery } from "@/lib/utils";

import type { ProfessionalFilters } from "../models";

import { useProfessionalFilters } from "./use-professional-filters";

export function useQueryProfesionals<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>({ professionalQueryOptions }: GenericQueryOptions<
  "professionalQueryOptions",
  ProfessionalFilters,
  TQueryFnData,
  TError,
  TData
>) {
  const { filters } = useProfessionalFilters();
  return useQuery(professionalQueryOptions(parseQuery(filters)));
}
