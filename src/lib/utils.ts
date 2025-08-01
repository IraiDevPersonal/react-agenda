import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import queryString from "query-string";
import { twMerge } from "tailwind-merge";

import { DateFormat, dateHelper } from "./date-helper";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeArray<T = any>(data: any): T[] {
  return (Array.isArray(data) ? data : []) as T[];
}

function parseDateAsString<T extends object>(value: T) {
  return Object.entries(value).reduce((acc, [key, value]) => {
    if (value instanceof Date) {
      acc[key as keyof T] = dateHelper.format(value, DateFormat["yyyy-MM-dd"]);
    }
    else {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Record<keyof T, any>);
}

export function parseAsParams<T extends object>(value: T): Record<keyof T, string> {
  if (!value) {
    return {} as Record<keyof T, string>;
  }

  const query = queryString.stringify(
    parseDateAsString(value),
    {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: ",",
      skipEmptyString: true,
      skipNull: true,
    },
  );

  return queryString.parse(query) as Record<keyof T, string>;
}

export function getUrlData() {
  return {
    ...location,
  };
}

export function sleep(ms: number = 2000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
