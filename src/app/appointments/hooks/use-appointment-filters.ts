import type { ChangeEvent } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useTransition } from "react";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { dateHelper } from "@/lib/date-helper";
import { parseAsLocalDate } from "@/lib/nuqs-parser";

import type { AppointmentFilters, AppointmentViewMode } from "../domain/models/type";

import { useViewModeStore } from "../stores/view-mode-store";

function parser(): AppointmentFilters {
  const currentDate = dateHelper.createDate();
  const rangeDate = dateHelper.getWeekRange(currentDate);

  return {
    date_from: parseAsLocalDate.withDefault(rangeDate.from),
    date_to: parseAsLocalDate.withDefault(rangeDate.to),
    date: parseAsLocalDate.withDefault(currentDate),
    professional_id: parseAsInteger,
    profession_id: parseAsInteger,
    patient_rut: parseAsString,
  };
}

export function useAppointmentFilters() {
  const [, startTransition] = useTransition();
  const [filters, onFilter] = useQueryStates(parser(), { history: "replace", startTransition });

  const setViewMode = useViewModeStore(s => s.setViewMode);

  const { invalidateQueries } = useQueryClient();

  const handleSelectToday = () => {
    const currentDate = dateHelper.createDate(filters.date);
    const viewMode = useViewModeStore.getState().viewMode;

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
    const value = e.target.value as AppointmentViewMode;

    handleSelectToday();
    setViewMode(value);
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
  };

  const handleRefresh = () => {
    Promise.all([
      invalidateQueries({ queryKey: [QUERY_KEYS.appointments] }),
      invalidateQueries({ queryKey: [QUERY_KEYS.prefessionals] }),
      invalidateQueries({ queryKey: [QUERY_KEYS.prefessions] }),
    ]);
  };

  return {
    filters,
    onFilter,
    handleRefresh,
    handleSelectToday,
    handleViewModeChange,
    handleClearAllFilters,
  };
}
