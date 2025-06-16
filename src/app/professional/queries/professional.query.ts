import type { UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys.constant";

import type { ProfessionalOption } from "../apdapters/professional-filter.adapter";

import { professionalAction } from "../actions/prefessional.action";

export function getProfessionalForFilterQueryOptions(): UseQueryOptions<ProfessionalOption[]> {
  return {
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessionals, "to-filter"],
    queryFn: () => professionalAction.getProfessionalForFilters(),
  };
}
