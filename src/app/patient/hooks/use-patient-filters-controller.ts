import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { pagination } from "@/lib/utils";

import { PatientQueries } from "../queries/patient-queries";
import { usePatientFilters } from "./use-patient-filters";
import { useQueryPatients } from "./use-query-patients";

export function usePatientFiltersController() {
  const queryClient = useQueryClient();
  const { filters, onFilter } = usePatientFilters();
  const { data } = useQueryPatients({ queryOptions: PatientQueries.getPatientMetaData });

  const handleClearAllFilters = () => {
    onFilter({
      status: null,
      email: null,
      name: null,
      rut: null,
      limit: 10,
      page: 1,
    });
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.patients],
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
