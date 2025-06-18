import { addDays, eachDayOfInterval, endOfWeek, format, getDay, getISODay, isSameMonth, parseISO, setDefaultOptions, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";

import type { DateWeekRange } from "@/types/global.type";

setDefaultOptions({ locale: es, weekStartsOn: 1 });

function getWeekRange(inputDate: Date): DateWeekRange {
  const from = startOfWeek(normalizeDate(inputDate), { weekStartsOn: 1 });
  const to = addDays(from, 6);
  return { from, to };
}

// normaliza una fecha a media noche
function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

enum dateFormat {
  "dd LLL y" = "dd LLL y",
  "dd-MM-yyyy" = "dd-MM-yyyy",
  "yyyy-MM-dd" = "yyyy-MM-dd",
  "EEEE dd 'de' MMMM 'de' yyyy" = "EEEE dd 'de' MMMM 'de' yyyy",
}

const dateHelper = {
  // crea una fecha a media noche
  createDate: (date?: Date | null) => normalizeDate(date ?? new Date()),
  eachDayOfInterval,
  normalizeDate,
  getWeekRange,
  startOfWeek,
  isSameMonth,
  endOfWeek,
  getISODay,
  parseISO,
  format,
  getDay,
};

export { dateFormat, dateHelper };
