import { useQueryClient } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import type { ChangeEvent } from "react";
import { useTransition } from "react";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { dateHelper } from "@/lib/date-helper";
import { parseAsLocalDate } from "@/lib/nuqs-parser";

import type {
  AppointmentFilters,
  AppointmentViewMode,
} from "../models/shared-model";

import { useViewModeStore } from "../stores/view-mode-store";

function parser(): AppointmentFilters {
  const currentDate = dateHelper.createDate();
  const rangeDate = dateHelper.getWeekRange(currentDate);

  return {
    date_from: parseAsLocalDate.withDefault(rangeDate.from),
    date_to: parseAsLocalDate.withDefault(rangeDate.to),
    date: parseAsLocalDate.withDefault(currentDate),
    user_id: parseAsInteger,
    profession_id: parseAsInteger,
    patient_rut: parseAsString,
  };
}

export function useAppointmentFilters() {
  const [, startTransition] = useTransition();
  const [filters, onFilter] = useQueryStates(parser(), {
    history: "replace",
    startTransition,
  });

  const setViewMode = useViewModeStore((s) => s.setViewMode);

  const { invalidateQueries } = useQueryClient();

  const handleSelectToday = (currentViewMode?: AppointmentViewMode) => {
    const viewMode = currentViewMode ?? useViewModeStore.getState().viewMode;

    if (viewMode === "day") {
      const currentDate = filters.date_from ?? dateHelper.createDate();
      onFilter({ date: currentDate, date_to: null, date_from: null });
    }

    if (viewMode === "week") {
      const currentDate = filters.date ?? dateHelper.createDate();
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

    handleSelectToday(value);
    setViewMode(value);
  };

  const handleClearAllFilters = () => {
    onFilter({
      user_id: null,
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
      invalidateQueries({ queryKey: [QUERY_KEYS.users] }),
      invalidateQueries({ queryKey: [QUERY_KEYS.professions] }),
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
