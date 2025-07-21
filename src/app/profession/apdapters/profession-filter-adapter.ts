import type { Option } from "@/types/global-types";

import { CustomError } from "@/lib/custom-error";
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
    throw CustomError.handleError(error, { showLog: true });
  }
}

export const ProfessionFilterAdapter = {
  httpResponse: (data: any) => safeArray(data).map(validate),
};
