import type { UseQueryOptions } from "@tanstack/react-query";

import { queryOptions } from "@tanstack/react-query";

import type { TQueryKey } from "@/lib/types/global-types";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import type { ProfessionForFilterModel } from "./models/profession-for-filters-model";
import type { ProfessionServiceImpl } from "./service";

export type ProfessionQueryImpl = {
  forFitlers: () => UseQueryOptions<
    ProfessionForFilterModel[],
    Error,
    ProfessionForFilterModel[],
    TQueryKey
  >;
};

export class ProfessionQuery implements ProfessionQueryImpl {
  private readonly service: ProfessionServiceImpl;

  constructor(service: ProfessionServiceImpl) {
    this.service = service;
  }

  forFitlers = () => {
    return queryOptions({
      refetchOnWindowFocus: false,
      queryKey: [QUERY_KEYS.prefessions, "for-filter"] as TQueryKey,
      queryFn: () => this.service.getProfessionsForFilters(),
    });
  };
}
