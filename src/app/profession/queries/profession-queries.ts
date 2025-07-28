import { queryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys";

import { ProfessionServices } from "../services/prefession-services";

function getProfessionForFilter() {
  return queryOptions({
    refetchOnWindowFocus: false,
    queryKey: [QueryKeys.prefessions, "to-filter"],
    queryFn: () => ProfessionServices.getProfessionForFilters(),
  });
}

export const ProfessionQueryOptions = {
  forFitlers: getProfessionForFilter,
};
