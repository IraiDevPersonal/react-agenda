import { queryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { ProfessionalServices } from "../services/prefessional-services";

export function getProfessionalForFilter() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QUERY_KEYS.prefessionals, "to-filter"],
    queryFn: () => ProfessionalServices.getProfessionalForFilters(),
  });
}

export const ProfessionalQueryOptions = {
  forFitlers: getProfessionalForFilter,
};
