import type { UseQueryStatesKeysMap } from "nuqs";

import { parseAsInteger, parseAsIsoDate, parseAsString, useQueryStates } from "nuqs";

import { dateHelper } from "@/lib/date-helper";

import type { AppointmentFilters } from "../types/appointment";

export function useAppointmentFilters() {
  const [filters, onFilter] = useQueryStates<UseQueryStatesKeysMap<AppointmentFilters>>((() => {
    const defaultDate = dateHelper.getWeekRange(new Date());

    return {
      professional_id: parseAsInteger.withDefault(0),
      profession_id: parseAsInteger.withDefault(0),
      patient_rut: parseAsString.withDefault(""),
      date_to: parseAsIsoDate.withDefault(defaultDate.to),
      date: parseAsIsoDate.withDefault(defaultDate.from),
    };
  })());

  const adaptedFilters = {
    professional_id: filters.professional_id || "",
    profession_id: filters.profession_id || "",
    patient_rut: filters.patient_rut || "",
    date_to: filters.date_to || undefined,
    date: filters.date || undefined,
  };

  return {
    onFilter,
    filters: adaptedFilters,
  };
}
