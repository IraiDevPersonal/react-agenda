import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { prettifyRut } from "react-rut-formatter";
import { useDebouncedCallback } from "use-debounce";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import { usePatientFilters } from "./use-patient-filters";

type FieldName = "rut" | "name" | "email";

export function usePatientFilterController() {
  const queryClient = useQueryClient();
  const { filters, onFilter } = usePatientFilters();
  const rutRef = useRef<HTMLInputElement>(null);

  const handelSearch = useDebouncedCallback((v: string, fieldName: FieldName) => {
    if (fieldName === "rut") {
      if (!rutRef.current)
        return;

      const rut = prettifyRut(v);
      rutRef.current.value = rut;
      onFilter({ rut });

      return;
    }
    onFilter({ [fieldName]: v });
  }, 1000, { leading: true });

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
    rutRef,
    onFilter,
    handelSearch,
    handleRefresh,
    handlePageChange,
    handleClearAllFilters,
  };
}
