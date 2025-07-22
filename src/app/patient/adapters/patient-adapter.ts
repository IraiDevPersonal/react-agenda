import { AppointmentStatus } from "@/app/agenda/models/appointment-model";
import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

import type { PatientForAppointmentDetailModel, PatientHistoryModel, PatientModel } from "../models/patient-model";

import { PatientForAppointmentDetailSchema, PatientHistorySchema, PatientSchema } from "../models/patient-model";

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
    };

    return PatientSchema.parse(data);
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
  httpResponse: (data: any) => safeArray(data).map(validate),
};
