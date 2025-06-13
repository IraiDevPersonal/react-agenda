import type { UseQueryStatesKeysMap } from "nuqs";

import { parseAsInteger, parseAsIsoDate, parseAsString, useQueryStates } from "nuqs";

import { dateHelper } from "@/lib/date-helper";
import { serializeQueryParams } from "@/lib/utils";

import type { AppointmentFilters } from "../types/appointment";

export function useAppointmentFilters() {
  const [filters, onFilter] = useQueryStates<UseQueryStatesKeysMap<AppointmentFilters>>((() => {
    const currentDate = dateHelper.normalizeDate(new Date());
    const rangeDate = dateHelper.getWeekRange(currentDate);

    return {
      professional_id: parseAsInteger.withDefault(0),
      profession_id: parseAsInteger.withDefault(0),
      patient_rut: parseAsString.withDefault(""),
      date_from: parseAsIsoDate.withDefault(rangeDate.from),
      date_to: parseAsIsoDate.withDefault(rangeDate.to),
      date: parseAsIsoDate.withDefault(currentDate),
    };
  })());

  const adaptedFilters = {
    professional_id: filters.professional_id || "",
    profession_id: filters.profession_id || "",
    patient_rut: filters.patient_rut || "",
    date_from: filters.date_from || new Date(),
    date_to: filters.date_to || new Date(),
    date: filters.date || new Date(),
  };

  const filtersAsParams = serializeQueryParams<keyof AppointmentFilters>(adaptedFilters);

  return {
    onFilter,
    filtersAsParams,
    filters: adaptedFilters,
  };
}
