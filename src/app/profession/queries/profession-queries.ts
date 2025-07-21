import { queryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys";

import { ProfessionActions } from "../actions/prefession-actions";

function getProfessionForFilter() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessions, "to-filter"],
    queryFn: () => ProfessionActions.getProfessionForFilters(),
  });
}

export const ProfessionQueryOptions = {
  forFitlers: getProfessionForFilter,
};
