import { endOfWeek, format, getDay, getISODay, parseISO, setDefaultOptions, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";

import type { DateWeekRange } from "@/types/global.type";

setDefaultOptions({ locale: es, weekStartsOn: 1 });

export const dateHelper = {
  normalizeDate,
  getWeekRange,
  startOfWeek,
  endOfWeek,
  getISODay,
  parseISO,
  format,
  getDay,
};

function getWeekRange(inputDate: Date): DateWeekRange {
  const from = dateHelper.normalizeDate(dateHelper.startOfWeek(inputDate, { weekStartsOn: 1 }));
  const to = dateHelper.normalizeDate(from);
  to.setDate(from.getDate() + 6);
  return { from, to };
}

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export enum dateFormat {
  "dd LLL y" = "dd LLL y",
  "dd-MM-yyyy" = "dd-MM-yyyy",
  "yyyy-MM-dd" = "yyyy-MM-dd",
  "EEEE dd 'de' MMMM 'de' yyyy" = "EEEE dd 'de' MMMM 'de' yyyy",
}
