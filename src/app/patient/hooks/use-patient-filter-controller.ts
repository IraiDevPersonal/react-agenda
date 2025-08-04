import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import { usePatientFilters } from "./use-patient-filters";

export function usePatientFilterController() {
  const queryClient = useQueryClient();
  const { filters, onFilter } = usePatientFilters();

  const handleClearAllFilters = () => {
    onFilter({
      rut: null,
      email: null,
      name: null,
      status: null,
    });
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.patients],
    });
  };

  const handlePageChange = (action: "next" | "prev") => {
    const currentPage = filters.page ?? 1;
    if (currentPage === 1 && action === "prev")
      return;
    if (currentPage === 13 && action === "next")
      return;

    onFilter({
      page: action === "next" ? currentPage + 1 : currentPage - 1,
    });
  };

  return {
    filters,
    onFilter,
    handleRefresh,
    handlePageChange,
    handleClearAllFilters,
  };
}
