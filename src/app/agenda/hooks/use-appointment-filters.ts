import type { UseQueryStatesKeysMap } from "nuqs";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import { dateHelper } from "@/lib/date-helper";
import { parseAsLocalDate } from "@/lib/nuqs-parser";
import { serializeQueryParams } from "@/lib/utils";

import type { AppointmentFilters } from "../types/appointment";

function parser(): UseQueryStatesKeysMap<AppointmentFilters> {
  const currentDate = dateHelper.createDate();
  const rangeDate = dateHelper.getWeekRange(currentDate);

  return {
    professional_id: parseAsInteger.withDefault(0),
    profession_id: parseAsInteger.withDefault(0),
    patient_rut: parseAsString.withDefault(""),
    date_from: parseAsLocalDate.withDefault(rangeDate.from),
    date_to: parseAsLocalDate.withDefault(rangeDate.to),
    date: parseAsLocalDate.withDefault(currentDate),
  };
}

export function useAppointmentFilters() {
  const [filters, onFilter] = useQueryStates(parser());

  const filtersAsParams = serializeQueryParams<AppointmentFilters>(filters);

  return {
    filtersAsParams,
    filters,
    onFilter,
  };
}
