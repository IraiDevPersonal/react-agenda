import { AppointmentStatus } from "@/app/agenda/models/appointment-model";
import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

import type { PatientForAppointmentDetailModel, PatientHistoryModel } from "../models/patient-model";

import { PatientForAppointmentDetailSchema, PatientHistorySchema } from "../models/patient-model";

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
};
