import type { UseQueryStatesKeysMap } from "nuqs";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useTransition } from "react";

import { dateHelper } from "@/lib/date-helper";
import { parseAsLocalDate } from "@/lib/nuqs-parser";

import type { AppointmentFilters } from "../models/appointment-model";

function parser(): UseQueryStatesKeysMap<AppointmentFilters> {
  const currentDate = dateHelper.createDate();
  const rangeDate = dateHelper.getWeekRange(currentDate);

  return {
    professional_id: parseAsInteger,
    profession_id: parseAsInteger,
    patient_rut: parseAsString,
    date_from: parseAsLocalDate.withDefault(rangeDate.from),
    date_to: parseAsLocalDate.withDefault(rangeDate.to),
    date: parseAsLocalDate.withDefault(currentDate),
  };
}

export function useAppointmentFilters() {
  const [, startTransition] = useTransition();
  const [filters, onFilter] = useQueryStates(parser(), { history: "replace", startTransition });

  return {
    filters,
    onFilter,
  };
}
