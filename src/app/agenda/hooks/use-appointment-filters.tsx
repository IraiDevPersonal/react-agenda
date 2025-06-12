import type { UseQueryStatesKeysMap } from "nuqs";

import { parseAsInteger, parseAsIsoDate, parseAsString, useQueryStates } from "nuqs";

import type { AppointmentFilters } from "../types/appointment";
import { dateHelper } from "@/lib/date-helper";

export function useAppointmentFilters() {
  const [filters, onFilter] = useQueryStates<UseQueryStatesKeysMap<AppointmentFilters>>((() => {
    const detaultDate = dateHelper.getWeekRange(new Date())

    return {
    professional_id: parseAsInteger.withDefault(0),
    profession_id: parseAsInteger.withDefault(0),
    patient_rut: parseAsString.withDefault(""),
    year_month: parseAsString.withDefault(""),
    date_from: parseAsIsoDate.withDefault(detaultDate.from),
    date_to: parseAsIsoDate.withDefault(detaultDate.to),
    date: parseAsIsoDate.withDefault(new Date()),
  }
  })());

  return {
    onFilter,
    filters: {
      professional_id: filters.professional_id ?? "",
      profession_id: filters.profession_id ?? "",
      patient_rut: filters.patient_rut ?? "",
      year_month: filters.year_month ?? "",
      date_from: filters.date_from ?? undefined,
      date_to: filters.date_to ?? undefined,
      date: filters.date ?? undefined,
    },
  };
}
