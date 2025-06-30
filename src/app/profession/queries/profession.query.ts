import { queryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys.constant";

import { professionAction } from "../actions/prefession.action";

export function getProfessionForFilterQueryOptions() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessions, "to-filter"],
    queryFn: () => professionAction.getProfessionForFilters(),
  });
}
