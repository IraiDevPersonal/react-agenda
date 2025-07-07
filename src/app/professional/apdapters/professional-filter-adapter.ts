import type { Option } from "@/types/global.type";

import { isValidObject, safeArray } from "@/lib/utils";

export type ProfessionalOption = Option<{ professions: number[] }>;

function itemAdapter(value: any): ProfessionalOption {
  const defaultValue: ProfessionalOption = {
    label: "Profesional sin nombre",
    value: 0,
    professions: [],
  };

  if (!isValidObject(value, "professional-filter-adapter: entrada en formato no esperado!!")) {
    return defaultValue;
  }

  return {
    ...defaultValue,
    ...value,
  } satisfies ProfessionalOption;
}

export const professionalFilterAdapter = (data: unknown) => safeArray<ProfessionalOption>(data).map(itemAdapter);
