import { useQuery, useQueryClient } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useTransition } from "react";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { pagination } from "@/lib/utils";

import type { ProfessionalFilters } from "../models/types";

import { professionalQuery } from "../container";

function parser(): ProfessionalFilters {
  return {
    limit: parseAsInteger.withDefault(10),
    page: parseAsInteger.withDefault(1),
    profession_id: parseAsInteger,
    last_names: parseAsString,
    names: parseAsString,
    email: parseAsString,
    rut: parseAsString,
    id: parseAsInteger,
  };
}

export function useProfessionalFilters() {
  const [, startTransition] = useTransition();
  const [filters, onFilter] = useQueryStates(parser(), { history: "replace", startTransition });

  const queryClient = useQueryClient();
  const { data } = useQuery(professionalQuery.pagination(filters));

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
