import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { pagination } from "@/lib/utils";

import { ProfessionalQueries } from "../queries";
import { useProfessionalFilters } from "./use-professional-filters";
import { useQueryProfessionals } from "./use-query-professionals";

export function useProfessionalFiltersController() {
  const queryClient = useQueryClient();
  const { filters, onFilter } = useProfessionalFilters();
  const { data } = useQueryProfessionals({ queryOptions: ProfessionalQueries.getMetaData });

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
    filters,
    onFilter,
    handleRefresh,
    handlePageChange,
    handleClearAllFilters,
  };
}
