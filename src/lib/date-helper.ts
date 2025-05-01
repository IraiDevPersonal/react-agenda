import type {
  DateArg,
  Day,
  FormatOptions,
  Interval,
} from "date-fns";

import {
  addDays as dateFnsAddDays,
  addMonths as dateFnsAddMonths,
  addWeeks as dateFnsAddWeeks,
  differenceInDays as dateFnsDifferenceInDays,
  eachDayOfInterval as dateFnsEachDayOfInterval,
  endOfMonth as dateFnsEndOfMonth,
  endOfWeek as dateFnsEndOfWeek,
  format as dateFnsFormat,
  getYear as dateFnsGetYear,
  isAfter as dateFnsIsAfter,
  isBefore as dateFnsIsBefore,
  isEqual as dateFnsIsEqual,
  isSameDay as dateFnsIsSameDay,
  isSameMonth as dateFnsIsSameMonth,
  isToday as dateFnsIsToday,
  parseISO as dateFnsParseISO,
  setHours as dateFnsSetHours,
  setMinutes as dateFnsSetMinutes,
  startOfMonth as dateFnsStartOfMonth,
  startOfWeek as dateFnsStartOfWeek,
  subDays as dateFnsSubDays,
  subMonths as dateFnsSubMonths,
  subWeeks as dateFnsSubWeeks,
} from "date-fns";
import { es } from "date-fns/locale";

const DEFAULT_FORMAT_OPTIONS: FormatOptions = {
  locale: es,
};

type FixedHoliday = {
  name: string;
  month: number; // 0-11
  day: number; // 1-31
};

type MovableHoliday = {
  name: string;
  calculateDate: (year: number) => Date;
};

const FIXED_HOLIDAYS: FixedHoliday[] = [
  { name: "Año Nuevo", month: 0, day: 1 },
  { name: "Día del Trabajo", month: 4, day: 1 },
  { name: "Día de las Glorias Navales", month: 4, day: 21 },
  { name: "San Pedro y San Pablo", month: 5, day: 29 },
  { name: "Día de la Virgen del Carmen", month: 6, day: 16 },
  { name: "Asunción de la Virgen", month: 7, day: 15 },
  { name: "Fiestas Patrias", month: 8, day: 18 },
  { name: "Día de las Glorias del Ejército", month: 8, day: 19 },
  { name: "Día del Encuentro de Dos Mundos", month: 9, day: 12 },
  { name: "Día de las Iglesias Evangélicas", month: 9, day: 31 },
  { name: "Día de Todos los Santos", month: 10, day: 1 },
  { name: "Inmaculada Concepción", month: 11, day: 8 },
  { name: "Navidad", month: 11, day: 25 },
];

// Función para calcular la fecha de Pascua (algoritmo de Meeus/Jones/Butcher)
function calculateEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

const MOVABLE_HOLIDAYS: MovableHoliday[] = [
  {
    name: "Viernes Santo",
    calculateDate: (year: number) => {
      const easter = calculateEasterDate(year);
      return dateFnsSubDays(easter, 2);
    },
  },
  {
    name: "Sábado Santo",
    calculateDate: (year: number) => {
      const easter = calculateEasterDate(year);
      return dateFnsSubDays(easter, 1);
    },
  },
];

export class DateHelper {
  format(date: DateArg<Date> & {}, formatStr: string, options?: FormatOptions) {
    return dateFnsFormat(date, formatStr, { ...DEFAULT_FORMAT_OPTIONS, ...options });
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

  private calculateHolidaysForYear(year: number): { name: string; date: Date }[] {
    const fixedHolidays = FIXED_HOLIDAYS.map(holiday => ({
      name: holiday.name,
      date: new Date(year, holiday.month, holiday.day),
    }));

    const movableHolidays = MOVABLE_HOLIDAYS.map(holiday => ({
      name: holiday.name,
      date: holiday.calculateDate(year),
    }));

    return [...fixedHolidays, ...movableHolidays];
  }

  isHoliday(date: Date): boolean {
    const year = dateFnsGetYear(date);
    const holidays = this.calculateHolidaysForYear(year);

    return holidays.some(holiday =>
      holiday.date.getDate() === date.getDate()
      && holiday.date.getMonth() === date.getMonth()
      && holiday.date.getFullYear() === date.getFullYear(),
    );
  }

  getHolidayName(date: Date): string | null {
    const year = dateFnsGetYear(date);
    const holidays = this.calculateHolidaysForYear(year);

    const holiday = holidays.find(holiday =>
      holiday.date.getDate() === date.getDate()
      && holiday.date.getMonth() === date.getMonth()
      && holiday.date.getFullYear() === date.getFullYear(),
    );

    return holiday?.name ?? null;
  }

  getHolidaysForYear(year: number): { name: string; date: Date }[] {
    return this.calculateHolidaysForYear(year);
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

  addDays(date: DateArg<Date>, amount: number) {
    return dateFnsAddDays(date, amount);
  }

  subDays(date: DateArg<Date>, amount: number) {
    return dateFnsSubDays(date, amount);
  }

  isBefore(date: DateArg<Date>, dateToCompare: DateArg<Date>) {
    return dateFnsIsBefore(date, dateToCompare);
  }

  isAfter(date: DateArg<Date>, dateToCompare: DateArg<Date>) {
    return dateFnsIsAfter(date, dateToCompare);
  }

  differenceInDays(dateLeft: DateArg<Date>, dateRight: DateArg<Date>) {
    return dateFnsDifferenceInDays(dateLeft, dateRight);
  }
}

export const dateHelper = new DateHelper();
