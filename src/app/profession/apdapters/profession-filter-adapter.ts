import type { Option } from "@/lib/types/global-types";

import { CustomError } from "@/lib/custom-error";
import { OptionSchema } from "@/lib/schemas/global-schemas";
import { safeArray } from "@/lib/utils";

function validate(item: any) {
  try {
    const data: Option = {
      label: item.label,
      value: item.value,
    };
    return OptionSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

export const ProfessionFilterAdapter = {
  httpResponse: (data: any) => safeArray(data).map(validate),
};
