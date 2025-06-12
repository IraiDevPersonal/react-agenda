import type { UseQueryOptions } from "@tanstack/react-query";

import type { Option } from "@/types/global.type";

import { QueryKeys } from "@/constants/query-keys.constant";

import { professionalAction } from "../actions/prefessional.action";

export function getProfessionalForFilterQueryOptions(): UseQueryOptions<Option[]> {
  return {
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessionals, "to-filter"],
    queryFn: () => professionalAction.getProfessionalForFilters(),
  };
}
