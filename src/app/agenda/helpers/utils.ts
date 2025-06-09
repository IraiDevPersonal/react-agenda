import type { Appointment } from "../types/appointment";

export function generateDatetimeText(data: Pick<Appointment, "date" | "time_from" | "time_to">) {
  return `${data.date} / ${data.time_from} - ${data.time_to}`;
}
