import { date, DateFormats } from "@/lib/date";

import type { Appointment } from "../types/appointment";

export function generateDatetimeText(data: Pick<Appointment, "date" | "time_from" | "time_to">) {
  const formatedDate = date.format(date.parseISO(data.date), DateFormats["dd-MM-yyyy"]);
  return `${formatedDate} / ${data.time_from} - ${data.time_to}`;
}
