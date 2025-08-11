import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import phoneFormatter from "phone-formatter";
import queryString from "query-string";
import { twMerge } from "tailwind-merge";

import { DateFormat, dateHelper } from "./date-helper";

function parseDateToString<T extends object>(value: T) {
  return Object.entries(value).reduce((acc, [key, value]) => {
    if (value instanceof Date) {
      acc[key as keyof T] = dateHelper.format(value, DateFormat["yyyy-MM-dd"]);
    }
    else {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Record<keyof T, string | number | boolean | null | undefined>);
}

export function parseQuery<T extends object>(value: T) {
  if (!value) {
    return {};
  }

  const stringifyQuery = queryString.stringify(
    parseDateToString(value),
    {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: ",",
      skipEmptyString: true,
      skipNull: true,
    },
  );

  return queryString.parse(
    stringifyQuery,
    {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: ",",
      parseBooleans: true,
      parseNumbers: true,
    },
  );
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeArray<T = any>(data: any): T[] {
  return (Array.isArray(data) ? data : []) as T[];
}

export function getUrlData() {
  return {
    ...location,
  };
}

export function formatPhoneNumber(value: string, format?: string) {
  return phoneFormatter.format(value, format ?? "NNN N NN NNN NNN", { normalize: true });
}

export function isValidPhoneNumber(value: string) {
  // por ahora solo valido para chile
  if (!value.startsWith("+"))
    return false;
  if (value.length !== 12)
    return false;
  return true;
}

export function sleep(ms: number = 2000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function pagination(action: "next" | "prev", currentPage: number, totalPages: number) {
  if (currentPage >= 1 && action === "prev")
    return currentPage - 1;
  if (currentPage <= totalPages && action === "next")
    return currentPage + 1;
}
