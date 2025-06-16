import type { UseQueryStatesKeysMap } from "nuqs";

import { parseAsInteger, parseAsIsoDate, parseAsString, useQueryStates } from "nuqs";

import { dateHelper } from "@/lib/date-helper";
import { serializeQueryParams } from "@/lib/utils";

import type { AppointmentFilters } from "../types/appointment";

function defaultValues(): UseQueryStatesKeysMap<AppointmentFilters> {
  const currentDate = dateHelper.createDate();
  const rangeDate = dateHelper.getWeekRange(currentDate);

  return {
    professional_id: parseAsInteger.withDefault(0),
    profession_id: parseAsInteger.withDefault(0),
    patient_rut: parseAsString.withDefault(""),
    date_from: parseAsIsoDate.withDefault(rangeDate.from),
    date_to: parseAsIsoDate.withDefault(rangeDate.to),
    date: parseAsIsoDate.withDefault(currentDate),
  };
}

export function useAppointmentFilters() {
  const [filters, onFilter] = useQueryStates(defaultValues());

  const filtersAsParams = serializeQueryParams<keyof AppointmentFilters>(filters);

  return {
    filtersAsParams,
    filters,
    onFilter,
  };
}
