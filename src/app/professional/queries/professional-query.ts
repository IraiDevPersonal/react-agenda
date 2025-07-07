import { queryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys.constant";

import { professionalActions } from "../actions/prefessional-actions";

export function getProfessionalForFilter() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessionals, "to-filter"],
    queryFn: () => professionalActions.getProfessionalForFilters(),
  });
}

export const professionalQueryOptions = {
  forFitlers: getProfessionalForFilter,
};
