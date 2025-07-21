import type { DateRange as DayPickerDateRange, Option } from "react-day-picker";
import type z from "zod";

import type { OptionSchema } from "@/schemas/global-schemas";

export type StrictRequired<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>;
};

export type StringifyObject<T> = {
  [K in keyof T]: string;
};

export type Option = z.infer<typeof OptionSchema>;

export type DateWeekRange = StrictRequired<DayPickerDateRange>;
