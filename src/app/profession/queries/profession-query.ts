import { queryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys.constant";

import { professionActions } from "../actions/prefession-actions";

function getProfessionForFilter() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessions, "to-filter"],
    queryFn: () => professionActions.getProfessionForFilters(),
  });
}

export const professionQueryOptions = {
  forFitlers: getProfessionForFilter,
};
