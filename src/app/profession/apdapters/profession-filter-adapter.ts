import type { Option } from "@/types/global-types";

import { safeArray } from "@/lib/utils";
import { OptionSchema } from "@/schemas/global-schemas";

function validate(item: any) {
  try {
    const data: Option = {
      label: item.label,
      value: item.value,
    };
    return OptionSchema.parse(data);
  }
  catch (error) {
    console.error("Error validating profession item:", error);
    throw new Error("Invalid profession item");
  }
}

export const ProfessionFilterAdapter = {
  httpResponse: (data: any) => safeArray(data).map(validate),
};
