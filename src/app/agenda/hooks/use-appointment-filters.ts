import type { ChangeEvent } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useTransition } from "react";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { dateHelper } from "@/lib/date-helper";
import { parseAsLocalDate } from "@/lib/nuqs-parser";

import type { AppointmentFilters, AppointmentViewMode } from "../domain/models/type";

import { useAppointmentUiStore } from "../stores/appointment-ui-store";

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

  const viewMode = useAppointmentUiStore(s => s.viewMode);
  const onViewModeChange = useAppointmentUiStore(s => s.onViewModeChange);

  const { invalidateQueries } = useQueryClient();

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
    viewMode,
    filters,
    onFilter,
    handleRefresh,
    handleSelectToday,
    handleViewModeChange,
    handleClearAllFilters,
  };
}
