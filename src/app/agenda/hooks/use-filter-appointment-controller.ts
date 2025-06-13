import type { ChangeEvent } from "react";

import { useQuery } from "@tanstack/react-query";

import { getProfessionForFilterQueryOptions } from "@/app/profession/queries/profession.query";
import { getProfessionalForFilterQueryOptions } from "@/app/professional/queries/professional.query";
import { dateHelper } from "@/lib/date-helper";

import type { AppointmentViewMode } from "../types";

import { useAppointmentUiStore } from "../stores/appointment-ui-store";
import { useAppointmentFilters } from "./use-appointment-filters";

export function useFilterAppointmentController() {
  const viewMode = useAppointmentUiStore(s => s.viewMode);
  const onViewModeChange = useAppointmentUiStore(s => s.onViewModeChange);

  const { filters, onFilter } = useAppointmentFilters();

  const { data: professionOptions } = useQuery({
    enabled: true,
    ...getProfessionForFilterQueryOptions(),
  });

  const { data: professionalOptions } = useQuery({
    enabled: true,
    ...getProfessionalForFilterQueryOptions(),
  });

  const handleSelectToday = (viewMode: AppointmentViewMode) => {
    const currentDate = dateHelper.normalizeDate(filters.date);
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

  return {
    // states
    filters,
    viewMode,
    professionOptions,
    professionalOptions,
    // methods
    onFilter,
    handleSelectToday,
    handleViewModeChange,
  };
}
