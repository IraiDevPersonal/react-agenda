import type { Option } from "@/types/global.type";

import { isValidObject, safeArray } from "@/lib/utils";

function itemAdapter(item: Record<string, any>): Option {
  const defaulValue: Option = {
    label: "Profesión indeterminada",
    value: 0,
  };

  if (!isValidObject(item, "profession-filter-adapter: entrada en formato no esperado!!")) {
    return defaulValue;
  }

  return {
    ...defaulValue,
    ...item,
  } satisfies Option;
}

export const professionFilterAdapter = (data: unknown) => safeArray<Option>(data).map(itemAdapter);
