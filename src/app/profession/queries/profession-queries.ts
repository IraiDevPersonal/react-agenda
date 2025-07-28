import { queryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { ProfessionServices } from "../services/prefession-services";

function getProfessionForFilter() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QUERY_KEYS.prefessions, "to-filter"],
    queryFn: () => ProfessionServices.getProfessionForFilters(),
  });
}

export const ProfessionQueryOptions = {
  forFitlers: getProfessionForFilter,
};
