import type { Nullable } from "nuqs";

import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { pagination } from "@/lib/utils";

import type { ProfessionalFilters } from "../models";

import { ProfessionalQuery } from "../queries/professional-queries";
import { useQueryProfesionals } from "./use-query-professionals";

type Props = {
  onFilter: (values: Partial<Nullable<ProfessionalFilters>>) => void;
};

export function useProfessionalFiltersController({ onFilter }: Props) {
  const queryClient = useQueryClient();
  const { data } = useQueryProfesionals({ professionalQueryOptions: ProfessionalQuery.getMetaData });

  const handleClearAllFilters = () => {
    onFilter({
      profession_id: null,
      last_names: null,
      names: null,
      rut: null,
      limit: 10,
      id: null,
      page: 1,
    });
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.prefessionals],
    });
  };

  const handlePageChange = (action: "next" | "prev") => {
    const page = pagination(action, data?.page || 1, data?.pages || 1);
    onFilter({ page });
  };

  return {
    handleRefresh,
    handlePageChange,
    handleClearAllFilters,
  };
}
