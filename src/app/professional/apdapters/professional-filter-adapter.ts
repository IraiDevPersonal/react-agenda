import { safeArray } from "@/lib/utils";

import type { ProfessionalOption } from "../models/professional-to-filter-model";

import { ProfessionalOptionSchema } from "../models/professional-to-filter-model";

function mapper(item: any): ProfessionalOption {
  const professions = safeArray(item.professions).map(String);

  return {
    label: item.label,
    value: item.value,
    professions,
  };
}

function validate(item: any) {
  try {
    const data = mapper(item);
    return ProfessionalOptionSchema.parse(data);
  }
  catch (error) {
    console.error("Error validating profession item:", error);
    throw new Error("Invalid profession item");
  }
}

export const ProfessionalFilterAdapter = {
  httpResponse: (data: any) => safeArray(data).map(validate),
};
