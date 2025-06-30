import { queryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys.constant";

import { professionalAction } from "../actions/prefessional.action";

export function getProfessionalForFilterQueryOptions() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessionals, "to-filter"],
    queryFn: () => professionalAction.getProfessionalForFilters(),
  });
}
