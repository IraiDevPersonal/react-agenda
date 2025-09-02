import type { UseQueryOptions } from "@tanstack/react-query";

import { queryOptions } from "@tanstack/react-query";
import type { Values } from "nuqs";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import type { TQueryKey } from "@/lib/types/global-types";
import { queryParser } from "@/lib/utils";
import type { ProfessionaFiltersModel } from "./models/profession-filters-model";
import type { ProfessionForFilterModel } from "./models/profession-for-filters-model";
import type { ProfessionModel } from "./models/profession-model";
import type { ProfessionServiceImpl } from "./service";

type Filters = Values<ProfessionaFiltersModel>;

export type ProfessionQueryImpl = {
  list: (
    filters: Filters,
  ) => UseQueryOptions<ProfessionModel[], Error, ProfessionModel[], TQueryKey>;
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

  list = (filters: Filters) => {
    return queryOptions({
      queryKey: [QUERY_KEYS.professions, QUERY_KEYS.generic.list] as TQueryKey,
      queryFn: () => this.service.getProfessions(queryParser(filters)),
    });
  };

  forFitlers = () => {
    return queryOptions({
      refetchOnWindowFocus: false,
      queryKey: [
        QUERY_KEYS.professions,
        QUERY_KEYS.generic.forFilters,
      ] as TQueryKey,
      queryFn: () => this.service.getProfessionsForFilters(),
    });
  };
}
