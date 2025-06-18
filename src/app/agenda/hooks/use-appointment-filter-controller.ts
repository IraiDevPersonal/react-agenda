import type { ChangeEvent } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { prettifyRut } from "react-rut-formatter";

import { getProfessionForFilterQueryOptions } from "@/app/profession/queries/profession.query";
import { getProfessionalForFilterQueryOptions } from "@/app/professional/queries/professional.query";
import { QueryKeys } from "@/constants/query-keys.constant";
import { dateHelper } from "@/lib/date-helper";

import type { AppointmentViewMode } from "../types";

import { useAppointmentUiStore } from "../stores/appointment-ui-store";
import { useAppointmentFilters } from "./use-appointment-filters";

export function useAppointmentFilterController() {
  const viewMode = useAppointmentUiStore(s => s.viewMode);
  const onViewModeChange = useAppointmentUiStore(s => s.onViewModeChange);

  const { refetchQueries } = useQueryClient();
  const { filters, onFilter } = useAppointmentFilters();
  const searchRef = useRef<HTMLInputElement>(null);

  const { data: professionOptions = [] } = useQuery({
    enabled: true,
    ...getProfessionForFilterQueryOptions(),
  });

  const { data: professionalOptions = [] } = useQuery({
    enabled: true,
    ...getProfessionalForFilterQueryOptions(),
  });

  const filteredProfessional = professionalOptions.filter(opt =>
    filters.profession_id ? opt.professions.includes(+filters.profession_id) : true,
  );

  const handleSelectToday = (viewMode: AppointmentViewMode) => {
    const currentDate = dateHelper.createDate(filters.date);
    if (viewMode === "day") {
      onFilter({ date: currentDate, date_to: null, date_from: null });
    }

    if (viewMode === "week") {
      const newDate = dateHelper.getWeekRange(currentDate);
      onFilter({
        date: null,
        date_from: newDate.from,
        date_to: newDate.to,
      });
    }
  };

  const handleViewModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const viewMode = e.target.value as AppointmentViewMode;

    handleSelectToday(viewMode);
    onViewModeChange(viewMode);
  };

  const handelSearch = (v: string) => {
    const rut = prettifyRut(v);
    searchRef.current!.value = rut;
    onFilter({ patient_rut: rut });
  };

  const handleClearSearch = () => {
    searchRef.current!.value = "";
    onFilter({ patient_rut: "" });
  };

  const handleClearAllFilters = () => {
    onFilter({
      professional_id: null,
      profession_id: null,
      patient_rut: null,
      date_from: null,
      date_to: null,
      date: null,
    });
    searchRef.current!.value = "";
  };

  const handleRefreshAppointments = () => {
    refetchQueries({
      queryKey: [QueryKeys.appointments],
    });

    refetchQueries({
      queryKey: [QueryKeys.prefessionals],
    });

    refetchQueries({
      queryKey: [QueryKeys.prefessions],
    });
  };

  return {
    // states
    filters,
    viewMode,
    searchRef,
    professionOptions,
    professionalOptions,
    filteredProfessional,
    // searchValue: search,
    // methods
    onFilter,
    handelSearch,
    handleSelectToday,
    handleClearSearch,
    handleViewModeChange,
    handleClearAllFilters,
    handleRefreshAppointments,
    // handleSearchChange,
  };
}
