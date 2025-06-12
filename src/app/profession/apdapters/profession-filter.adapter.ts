import type { Option } from "@/types/global.type";

import { safeArray } from "@/lib/utils";

function createDefault(): Option {
  return {
    label: "Profesión indeterminada",
    value: 0,
  };
}

export function itemAdapter(item: Record<string, any>): Option {
  if (typeof item !== "object" || Array.isArray(item)) {
    console.warn("profession-filter.adapter: entrada en formato no esperado!!");
    return createDefault();
  }

  return {
    ...createDefault(),
    ...item,
  } satisfies Option;
}

export const professionFilterAdapter = {
  httpResponse: (data: unknown) => safeArray<Option>(data).map(itemAdapter),
};
