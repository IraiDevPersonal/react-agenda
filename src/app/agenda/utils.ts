import { DateFormat, dateHelper } from "@/lib/date-helper";

import type { AppointmentModel } from "./models/appointment-model";

export function generateAppoinmentDatetimeText(data: Pick<AppointmentModel, "date" | "time_from" | "time_to">) {
  const formatedDate = dateHelper.format(dateHelper.parseISO(data.date), DateFormat["dd-MM-yyyy"]);
  return `${formatedDate} / ${data.time_from} - ${data.time_to}`;
}

export function showAppointmentInDay(stringDate: string, currentDay: number) {
  return dateHelper.getISODay(dateHelper.parseISO(stringDate)) === currentDay;
}
