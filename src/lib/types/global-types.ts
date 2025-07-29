import type { DateRange as DayPickerDateRange } from "react-day-picker";
import type z from "zod";

import type { OptionSchema } from "@/lib/schemas/global-schemas";

export type StrictRequired<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>;
};

export type StringifyObject<T> = {
  [K in keyof T]: string;
};

export type UndefinedObject<T> = {
  [K in keyof T]: T[K] | undefined;
};

export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type MakeRequired<T, K extends keyof T> = Partial<Omit<T, K>> &
  Required<Pick<T, K>>;

export type Option = z.infer<typeof OptionSchema>;

export type DateWeekRange = StrictRequired<DayPickerDateRange>;
