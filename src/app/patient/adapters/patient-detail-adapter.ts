import { CustomError } from "@/lib/custom-error";

import type { PatientDetailResponseModel } from "../models/patient-detail-model";

import { PatientDetailResponseSchema } from "../models/patient-detail-model";
import { PatientAdapter } from "./patient-adapter";

export function validatePatientDetailResponse(item: any) {
  try {
    const data: PatientDetailResponseModel = {
      data: PatientAdapter.validate(item.data),
      appointment_history: undefined,
    };

    return PatientDetailResponseSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}
