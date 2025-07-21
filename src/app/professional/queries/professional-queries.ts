import { queryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys";

import { ProfessionalActions } from "../actions/prefessional-actions";

export function getProfessionalForFilter() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessionals, "to-filter"],
    queryFn: () => ProfessionalActions.getProfessionalForFilters(),
  });
}

export const ProfessionalQueryOptions = {
  forFitlers: getProfessionalForFilter,
};
