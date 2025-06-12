import type { UseQueryOptions } from "@tanstack/react-query";

import type { Option } from "@/types/global.type";

import { QueryKeys } from "@/constants/query-keys.constant";

import { professionAction } from "../actions/prefession.action";

export function getProfessionForFilterQueryOptions(): UseQueryOptions<Option[]> {
  return {
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessions, "to-filter"],
    queryFn: () => professionAction.getProfessionForFilters(),
  };
}
