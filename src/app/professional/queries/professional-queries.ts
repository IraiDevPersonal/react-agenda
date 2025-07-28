import { queryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys";

import { ProfessionalServices } from "../services/prefessional-services";

export function getProfessionalForFilter() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessionals, "to-filter"],
    queryFn: () => ProfessionalServices.getProfessionalForFilters(),
  });
}

export const ProfessionalQueryOptions = {
  forFitlers: getProfessionalForFilter,
};
