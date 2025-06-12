import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { dateFormat, dateHelper } from "./date-helper";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeArray<T>(data: any): T[] {
  return (Array.isArray(data) ? data : []) as T[];
}

export function serializeQueryParams<K extends string>(obj: Record<string, any>) {
  return Object.entries(obj).reduce<Record<K, string>>((acc, [key, value]) => {
      if (value instanceof Date) {
        acc[key as K] = dateHelper.format(value, dateFormat["yyyy-MM-dd"]);
      }
      else if (value) {
        // typeof value === "number" || typeof value === "string" para ignorar solo nullish
        acc[key as K] = value.toString();
      }
      return acc;
    }, {} as Record<K, string>);
}