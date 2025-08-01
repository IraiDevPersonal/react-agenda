import type { ChangeEvent } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { prettifyRut } from "react-rut-formatter";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { dateHelper } from "@/lib/date-helper";

import type { AppointmentViewMode } from "../models";

import { useAppointmentUiStore } from "../stores/appointment-ui-store";
import { useAppointmentFilters } from "./use-appointment-filters";

export function useAppointmentFilterController() {
  const viewMode = useAppointmentUiStore(s => s.viewMode);
  const onViewModeChange = useAppointmentUiStore(s => s.onViewModeChange);

  const { invalidateQueries } = useQueryClient();
  const { filters, onFilter } = useAppointmentFilters();
  const searchRef = useRef<HTMLInputElement>(null);

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

  const handleRefresh = () => {
    invalidateQueries({
      queryKey: [QUERY_KEYS.appointments],
    });

    invalidateQueries({
      queryKey: [QUERY_KEYS.prefessionals],
    });

    invalidateQueries({
      queryKey: [QUERY_KEYS.prefessions],
    });
  };

  return {
    viewMode,
    searchRef,
    onFilter,
    handelSearch,
    handleRefresh,
    handleSelectToday,
    handleViewModeChange,
    handleClearAllFilters,
  };
}
