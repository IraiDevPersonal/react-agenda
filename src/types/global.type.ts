import type { DateRange as DayPickerDateRange } from "react-day-picker";

export type StrictRequired<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>;
};

export type Option = {
  label: string;
  value: string | number;
};

export type DateWeekRange = StrictRequired<DayPickerDateRange>;
