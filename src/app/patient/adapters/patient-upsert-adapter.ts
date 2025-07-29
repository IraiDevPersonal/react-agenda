import { CustomError } from "@/lib/custom-error";

import type { UpsertPatientResponseModel } from "../models/patient-action-model";

import { UpsertPatientResponseSchema } from "../models/patient-action-model";
import { PatientAdapter } from "./patient-adapter";

export function validateUpsertResponse(response: any) {
  try {
    const data: UpsertPatientResponseModel = {
      data: PatientAdapter.validate(response.data),
      message: response.message,
    };

    return UpsertPatientResponseSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}
