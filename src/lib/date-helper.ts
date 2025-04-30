import type {
  DateArg,
  Day,
  FormatOptions,
  Interval,
} from "date-fns";

import {
  addMonths as dateFnsAddMonths,
  addWeeks as dateFnsAddWeeks,
  eachDayOfInterval as dateFnsEachDayOfInterval,
  endOfMonth as dateFnsEndOfMonth,
  endOfWeek as dateFnsEndOfWeek,
  format as dateFnsFormat,
  isEqual as dateFnsIsEqual,
  isSameDay as dateFnsIsSameDay,
  isSameMonth as dateFnsIsSameMonth,
  isToday as dateFnsIsToday,
  parseISO as dateFnsParseISO,
  setHours as dateFnsSetHours,
  setMinutes as dateFnsSetMinutes,
  startOfMonth as dateFnsStartOfMonth,
  startOfWeek as dateFnsStartOfWeek,
  subMonths as dateFnsSubMonths,
  subWeeks as dateFnsSubWeeks,
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
    return dateFnsFormat(date, formatStr, { ...options, locale: es });
  }

  eachDayOfInterval(interval: Interval) {
    return dateFnsEachDayOfInterval(interval);
  }

  endOfMonth(date: DateArg<Date>) {
    return dateFnsEndOfMonth(date);
  }

  endOfWeek(date: DateArg<Date>, options?: { weekStartsOn?: Day }) {
    return dateFnsEndOfWeek(date, options);
  }

  isSameMonth(dateLeft: DateArg<Date>, dateRight: DateArg<Date>) {
    return dateFnsIsSameMonth(dateLeft, dateRight);
  }

  isToday(date: DateArg<Date>) {
    return dateFnsIsToday(date);
  }

  startOfMonth(date: DateArg<Date>) {
    return dateFnsStartOfMonth(date);
  }

  startOfWeek(date: DateArg<Date>, options?: { weekStartsOn?: Day }) {
    return dateFnsStartOfWeek(date, options);
  }

  addMonths(date: DateArg<Date>, amount: number) {
    return dateFnsAddMonths(date, amount);
  }

  subMonths(date: DateArg<Date>, amount: number) {
    return dateFnsSubMonths(date, amount);
  }

  isEqual(a: DateArg<Date>, b: DateArg<Date>, includeTime: boolean = false) {
    if (includeTime) {
      return dateFnsIsEqual(a, b);
    }

    const dateA = new Date(a);
    const dateB = new Date(b);

    return dateA.getFullYear() === dateB.getFullYear()
      && dateA.getMonth() === dateB.getMonth()
      && dateA.getDate() === dateB.getDate();
  }

  isHoliday(date: Date) {
    return CHILEAN_HOLIDAYS_2025.some(
      holiday =>
        holiday.getDate() === date.getDate()
        && holiday.getMonth() === date.getMonth()
        && holiday.getFullYear() === date.getFullYear(),
    );
  }

  isSunday(date: Date) {
    return this.format(date, "e") === "7";
  }

  parseISO(dateString: string) {
    return dateFnsParseISO(dateString);
  }

  isSameDay(dateLeft: DateArg<Date>, dateRight: DateArg<Date>) {
    return dateFnsIsSameDay(dateLeft, dateRight);
  }

  setHours(date: DateArg<Date>, hours: number) {
    return dateFnsSetHours(date, hours);
  }

  setMinutes(date: DateArg<Date>, minutes: number) {
    return dateFnsSetMinutes(date, minutes);
  }

  addWeeks(date: DateArg<Date>, amount: number) {
    return dateFnsAddWeeks(date, amount);
  }

  subWeeks(date: DateArg<Date>, amount: number) {
    return dateFnsSubWeeks(date, amount);
  }
}
