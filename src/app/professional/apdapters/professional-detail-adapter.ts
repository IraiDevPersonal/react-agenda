import { CustomError } from "@/lib/custom-error";

import type { ProfessionalDetailResponseModel } from "../models/professional-detail-model";

import { ProfessionalDetailResponseSchema } from "../models/professional-detail-model";
import { ProfessionalAdapter } from "./professional-adapter";

export function validateProfessionalDetailResponse(item: any) {
  try {
    const data: ProfessionalDetailResponseModel = {
      data: ProfessionalAdapter.validate(item.data),
      blocks: undefined,
    };

    return ProfessionalDetailResponseSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}
