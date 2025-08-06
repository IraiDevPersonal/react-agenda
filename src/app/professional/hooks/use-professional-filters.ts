import type { UseQueryStatesKeysMap } from "nuqs";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useTransition } from "react";

import type { ProfessionalFilters } from "../models";

function parser(): UseQueryStatesKeysMap<ProfessionalFilters> {
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

  return {
    filters,
    onFilter,
  };
}
