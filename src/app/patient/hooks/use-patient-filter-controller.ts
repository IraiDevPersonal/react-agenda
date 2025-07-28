import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { prettifyRut } from "react-rut-formatter";

import { QUERY_KEYS } from "@/constants/query-keys";

import { usePatientFilters } from "./use-patient-filters";

type FieldNames = "rut" | "name" | "email";

export function usePatientFilterController() {
  const { refetchQueries } = useQueryClient();
  const { filters, onFilter } = usePatientFilters();
  const rutRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handelSearch = (v: string, fieldName: FieldNames) => {
    if (fieldName === "rut") {
      const rut = prettifyRut(v);
      rutRef.current!.value = rut;
      onFilter({ rut });
    }
    if (fieldName === "name") {
      nameRef.current!.value = v;
      onFilter({ name: v });
    }
    if (fieldName === "email") {
      emailRef.current!.value = v;
      onFilter({ email: v });
    }
  };

  const handleClearSearch = (fieldName: FieldNames) => {
    if (fieldName === "rut") {
      rutRef.current!.value = "";
      onFilter({ rut: "" });
    }
    if (fieldName === "name") {
      nameRef.current!.value = "";
      onFilter({ name: "" });
    }
    if (fieldName === "email") {
      emailRef.current!.value = "";
      onFilter({ email: "" });
    }
  };

  const handleClearAllFilters = () => {
    onFilter({
      rut: null,
      email: null,
      name: null,
      status: null,
    });
    rutRef.current!.value = "";
    nameRef.current!.value = "";
    emailRef.current!.value = "";
  };

  const handleRefresh = () => {
    refetchQueries({
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
    // states
    filters,
    rutRef,
    nameRef,
    emailRef,
    // methods
    onFilter,
    handelSearch,
    handleClearSearch,
    handleClearAllFilters,
    handleRefresh,
    handlePageChange,
  };
}
