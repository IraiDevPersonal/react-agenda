import { validateDeleteHttpResponse } from "@/lib/adapters/delete-http-response-adapter";
import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

import type {
  PatientModel,
  PatientResponseModel,
} from "../models/patient-model";

import {
  PatientResponseSchema,
  PatientSchema,
} from "../models/patient-model";
import { validatePatientDetailResponse } from "./patient-detail-adapter";
import { patientHistoryToArray } from "./patient-history-adapter";
import { validateUpsertResponse } from "./patient-upsert-adapter";

function validate(item: any) {
  try {
    const data: PatientModel = {
      uid: item.uid,
      rut: item.rut,
      names: item.names,
      last_names: item.last_names,
      email: item.email,
      phone: item.phone,
      address: item.address,
      is_deleted: item.is_deleted ?? false,
      avatar_image: item.avatar_image ?? null,
    };

    return PatientSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

function validatePatientResponse(response: any) {
  try {
    const data: PatientResponseModel = {
      data: safeArray(response.data).map(validate),
      limit: response.limit,
      total: response.total,
      page: response.page,
      pages: response.pages,
    };

    return PatientResponseSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

export const PatientAdapter = {
  validate,
  patientHistoryToArray,
  httpResponse: validatePatientResponse,
  upsertPatientHttpResponse: validateUpsertResponse,
  deletePatientHttpResponse: validateDeleteHttpResponse,
  patientDetailHttpResponse: validatePatientDetailResponse,
};
