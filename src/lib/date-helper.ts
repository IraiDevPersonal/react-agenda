import { endOfWeek, format, getDay, getISODay, parseISO, setDefaultOptions, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";

import type { DateWeekRange } from "@/types/global.type";

setDefaultOptions({ locale: es, weekStartsOn: 1 });

export const dateHelper = {
  getWeekRange,
  startOfWeek,
  endOfWeek,
  getISODay,
  parseISO,
  format,
  getDay,
};

function getWeekRange(inputDate: Date): DateWeekRange {
  const from = new Date(dateHelper.startOfWeek(inputDate, { weekStartsOn: 1 }));
  const to = new Date(from);
  to.setDate(from.getDate() + 6);
  return { from, to };
}

export enum dateFormat {
  "dd LLL y" = "dd LLL y",
  "dd-MM-yyyy" = "dd-MM-yyyy",
  "EEEE dd 'de' MMMM 'de' yyyy" = "EEEE dd 'de' MMMM 'de' yyyy",
}
