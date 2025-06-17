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
  const { filters, onFilter } = useAppointmentFilters();
  const queryClient = useQueryClient();
  // const [search, setSearch] = useState(filters.patient_rut);
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

  // const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSearch(value.length > 2 ? prettifyRut(value) : value);
  // };

  const handelSearch = (v: string) => {
    const rut = prettifyRut(v);
    searchRef.current!.value = rut;
    onFilter({ patient_rut: rut });
  };

  const handleClearSearch = () => {
    // setSearch("");
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
    queryClient.refetchQueries({
      queryKey: [QueryKeys.appointments],
    });

    queryClient.refetchQueries({
      queryKey: [QueryKeys.prefessionals],
    });

    queryClient.refetchQueries({
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
