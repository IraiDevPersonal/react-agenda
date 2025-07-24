import { AppointmentStatus } from "@/app/agenda/models/appointment-model";
import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

import type {
  PatientDetailResponseModel,
  PatientForAppointmentDetailModel,
  PatientHistoryModel,
  PatientModel,
  PatientResponseModel,
} from "../models/patient-model";

import {
  PatientDetailResponseSchema,
  PatientForAppointmentDetailSchema,
  PatientHistorySchema,
  PatientResponseSchema,
  PatientSchema,
} from "../models/patient-model";

function validatePatientItem(item: any) {
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
      data: safeArray(response.data).map(validatePatientItem),
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

function validatePatientDetail(item: any) {
  try {
    const data: PatientDetailResponseModel = {
      data: validatePatientItem(item.data),
      appointment_history: undefined,
    };

    return PatientDetailResponseSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

function validatePatientForAppointmentDetail(item: any) {
  try {
    const data: PatientForAppointmentDetailModel = {
      names: item.names,
      last_names: item.last_names,
      rut: item.rut,
      phone: item.phone,
      email: item.email,
      address: item.address,
    };
    return PatientForAppointmentDetailSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

function patientHistoryToArray(data: any) {
  try {
    return safeArray(data).map((item) => {
      const history: PatientHistoryModel = {
        uid: item.uid,
        date_time: item.date_time,
        status: item.status ?? AppointmentStatus.INDETERMINATE,
      };
      return PatientHistorySchema.parse(history);
    });
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

export const PatientAdapter = {
  validatePatientForAppointmentDetail,
  patientHistoryToArray,
  httpResponse: validatePatientResponse,
  patientDetailHttpResponse: validatePatientDetail,
};
