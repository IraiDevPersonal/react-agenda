import type { GenericDeleteResponseModel } from "@/lib/types/global-types";

import { GenericDeleteResponseSchema } from "@/lib/schemas/global-schemas";

import { CustomError } from "../custom-error";

export function validateDeleteHttpResponse(response: any) {
  try {
    const data: GenericDeleteResponseModel = {
      messsage: response.message,
    };

    return GenericDeleteResponseSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}
