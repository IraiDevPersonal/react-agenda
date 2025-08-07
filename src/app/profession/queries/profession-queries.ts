import { queryOptions } from "@tanstack/react-query";

import type { TQueryKey } from "@/lib/types/global-types";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import { ProfessionServices } from "../services/prefession-services";

function getProfessionForFilter() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QUERY_KEYS.prefessions, "for-filter"] as TQueryKey,
    queryFn: () => ProfessionServices.getProfessionForFilters(),
  });
}

export const ProfessionQueries = {
  forFitlers: getProfessionForFilter,
};
