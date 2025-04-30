import type {
  DateArg,
  Day,
  FormatOptions,
  Interval,
} from "date-fns";

import {
  eachDayOfInterval as dateEachDayOfInterval,
  endOfMonth as dateEndOfMonth,
  endOfWeek as dateEndOfWeek,
  format as dateFormat,
  isSameMonth as dateIsSameMonth,
  isToday as dateIsToday,
  startOfMonth as dateStartOfMonth,
  startOfWeek as dateStartOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";

const CHILEAN_HOLIDAYS_2025 = [
  new Date(2025, 0, 1), // Año Nuevo
  new Date(2025, 3, 18), // Viernes Santo
  new Date(2025, 3, 19), // Sábado Santo
  new Date(2025, 4, 1), // Día del Trabajo
  new Date(2025, 4, 21), // Día de las Glorias Navales
  new Date(2025, 5, 29), // San Pedro y San Pablo
  new Date(2025, 6, 16), // Día de la Virgen del Carmen
  new Date(2025, 7, 15), // Asunción de la Virgen
  new Date(2025, 8, 18), // Fiestas Patrias
  new Date(2025, 8, 19), // Día de las Glorias del Ejército
  new Date(2025, 9, 12), // Día del Encuentro de Dos Mundos
  new Date(2025, 9, 31), // Día de las Iglesias Evangélicas
  new Date(2025, 10, 1), // Día de Todos los Santos
  new Date(2025, 11, 8), // Inmaculada Concepción
  new Date(2025, 11, 25), // Navidad
] as const;

export class DateHelper {
  format(date: DateArg<Date> & {}, formatStr: string, options?: FormatOptions) {
    return dateFormat(date, formatStr, { ...options, locale: es });
  }

  eachDayOfInterval(interval: Interval) {
    return dateEachDayOfInterval(interval);
  }

  endOfMonth(date: DateArg<Date>) {
    return dateEndOfMonth(date);
  }

  endOfWeek(date: DateArg<Date>, options?: { weekStartsOn?: Day }) {
    return dateEndOfWeek(date, options);
  }

  isSameMonth(dateLeft: DateArg<Date>, dateRight: DateArg<Date>) {
    return dateIsSameMonth(dateLeft, dateRight);
  }

  isToday(date: DateArg<Date>) {
    return dateIsToday(date);
  }

  startOfMonth(date: DateArg<Date>) {
    return dateStartOfMonth(date);
  }

  startOfWeek(date: DateArg<Date>, options?: { weekStartsOn?: Day }) {
    return dateStartOfWeek(date, options);
  }

  isHoliday(date: Date) {
    return CHILEAN_HOLIDAYS_2025.some(
      holiday =>
        holiday.getDate() === date.getDate()
        && holiday.getMonth() === date.getMonth()
        && holiday.getFullYear() === date.getFullYear(),
    );
  }
}
