import { dateFormat, dateHelper } from "@/lib/date-helper";

import type { Appointment } from "../types/appointment";

export function generateAppoinmentDatetimeText(data: Pick<Appointment, "date" | "time_from" | "time_to">) {
  const formatedDate = dateHelper.format(dateHelper.parseISO(data.date), dateFormat["dd-MM-yyyy"]);
  return `${formatedDate} / ${data.time_from} - ${data.time_to}`;
}

export function showAppointmentInDay(stringDate: string, currentDay: number) {
  return dateHelper.getISODay(dateHelper.parseISO(stringDate)) === currentDay;
}
