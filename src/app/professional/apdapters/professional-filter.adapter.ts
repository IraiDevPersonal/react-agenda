import type { Option } from "@/types/global.type";

import { safeArray } from "@/lib/utils";

function createDefault(): Option {
  return {
    label: "Profesional sin nombre",
    value: 0,
  };
}

export function itemAdapter(item: Record<string, any>): Option {
  if (typeof item !== "object" || Array.isArray(item)) {
    console.warn("professional-filter.adapter: entrada en formato no esperado!!");
    return createDefault();
  }

  return {
    ...createDefault(),
    ...item,
  } satisfies Option;
}

export const professionalFilterAdapter = {
  httpResponse: (data: unknown) => safeArray<Option>(data).map(itemAdapter),
};
