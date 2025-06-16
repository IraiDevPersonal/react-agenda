import type { Option } from "@/types/global.type";

import { safeArray } from "@/lib/utils";

export type ProfessionalOption = Option<{ professions: number[] }>;

function createDefault(): ProfessionalOption {
  return {
    label: "Profesional sin nombre",
    value: 0,
    professions: [],
  };
}

export function itemAdapter(item: Record<string, any>): ProfessionalOption {
  if (typeof item !== "object" || Array.isArray(item)) {
    console.warn("professional-filter.adapter: entrada en formato no esperado!!");
    return createDefault();
  }

  return {
    ...createDefault(),
    ...item,
  } satisfies ProfessionalOption;
}

export const professionalFilterAdapter = {
  httpResponse: (data: unknown) => safeArray<ProfessionalOption>(data).map(itemAdapter),
};
