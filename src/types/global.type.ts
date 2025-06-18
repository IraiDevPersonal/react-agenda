import type { DateRange as DayPickerDateRange } from "react-day-picker";

export type StrictRequired<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>;
};

export type StringifyObject<T> = {
  [K in keyof T]: string;
};

export type Option<T extends object = object> = {
  label: string;
  value: string | number;
} & T;

export type DateWeekRange = StrictRequired<DayPickerDateRange>;
