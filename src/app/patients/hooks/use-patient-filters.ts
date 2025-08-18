import { useQuery, useQueryClient } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useTransition } from "react";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { pagination } from "@/lib/utils";

import type { PatientFilters } from "../models/shared-model";

import { patientQuery } from "../container";

function parser(): PatientFilters {
  return {
    rut: parseAsString,
    name: parseAsString,
    email: parseAsString,
    status: parseAsString,
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  };
}

export function usePatientFilters() {
  const [, startTransition] = useTransition();
  const [filters, onFilter] = useQueryStates(parser(), { history: "replace", startTransition });

  const queryClient = useQueryClient();
  const { data } = useQuery(patientQuery.pagination(filters));

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
