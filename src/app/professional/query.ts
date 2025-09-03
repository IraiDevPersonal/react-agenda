import type { UseQueryOptions } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import type { TQueryKey } from "@/lib/types/global-types";
import type { ProfessionalForFilterModel } from "./models/professional-for-filters-model";
import type { ProfessionalServiceImpl } from "./service";

type ProfessionalQueryImpl = {
  forFilters: () => UseQueryOptions<
    ProfessionalForFilterModel[],
    Error,
    ProfessionalForFilterModel[],
    TQueryKey
  >;
};

export class ProfessionalQuery implements ProfessionalQueryImpl {
  private readonly service: ProfessionalServiceImpl;

  constructor(service: ProfessionalServiceImpl) {
    this.service = service;
  }

  forFilters = () => {
    return queryOptions({
      refetchOnWindowFocus: false,
      queryKey: [QUERY_KEYS.users, QUERY_KEYS.generic.forFilters] as TQueryKey,
      queryFn: () => this.service.getProfessionalForFilters(),
    });
  };
}
