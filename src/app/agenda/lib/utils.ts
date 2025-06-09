import { date } from "@/lib/date";

import type { Appointment } from "../types/appointment";

export function generateDatetimeText(data: Pick<Appointment, "date" | "time_from" | "time_to">) {
  return `${date.format(date.parseISO(data.date), "dd-MM-yyyy")} / ${data.time_from} - ${data.time_to}`;
}
