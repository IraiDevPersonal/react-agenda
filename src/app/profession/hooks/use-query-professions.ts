import { useQuery } from "@tanstack/react-query";

import type { GenericUseQueryOptions } from "@/lib/types/global-types";

import { parseQuery } from "@/lib/utils";

export function useQueryProfessions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>({ queryOptions }: GenericUseQueryOptions<
  object,
  TQueryFnData,
  TError,
  TData
>) {
  // const { filters } = useProfessionalFilters();
  return useQuery(queryOptions(parseQuery({})));
}
