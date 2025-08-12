import { DateFormat, dateHelper } from "@/lib/date-helper";

import type { AppointmentModel } from "../domain/models/appointment-model";

type Value = Pick<AppointmentModel, "date" | "time_from" | "time_to">;

export function formatAppointmentDateTime(value: Value) {
  const formatedDate = dateHelper.format(dateHelper.parseISO(value.date), DateFormat["dd-MM-yyyy"]);
  return `${formatedDate} / ${value.time_from} - ${value.time_to}`;
}

export function isAppointmentOnDay(stringDate: string, currentDay: number) {
  return dateHelper.getISODay(dateHelper.parseISO(stringDate)) === currentDay;
}

export function getAllDaysInDateRange(dateFrom: Date | null, dateTo: Date | null) {
  const currentDate = dateHelper.createDate();

  return dateHelper.eachDayOfInterval({
    start: dateFrom ?? currentDate,
    end: dateTo ?? currentDate,
  });
}
