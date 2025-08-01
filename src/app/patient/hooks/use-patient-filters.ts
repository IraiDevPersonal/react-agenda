import type { UseQueryStatesKeysMap } from "nuqs";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useTransition } from "react";

import type { PatientFilters } from "../models";

function parser(): UseQueryStatesKeysMap<PatientFilters> {
  return {
    rut: parseAsString.withDefault(""),
    email: parseAsString.withDefault(""),
    name: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  };
}

export function usePatientFilters() {
  const [, startTransition] = useTransition();
  const [filters, onFilter] = useQueryStates(parser(), { history: "replace", startTransition });

  return {
    filters,
    onFilter,
  };
}
