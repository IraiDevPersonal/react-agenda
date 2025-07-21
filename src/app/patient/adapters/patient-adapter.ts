import { AppointmentStatus } from "@/app/agenda/models/appointment-model";
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
    console.error("Invalid patient data for appointment detail:", error);
    throw new Error("Invalid patient data");
  }
}

function patientHistoryToArray(data: any) {
  try {
    return safeArray<any>(data).map((item) => {
      const history: PatientHistoryModel = {
        uid: item.uid,
        date_time: item.date_time,
        status: item.status ?? AppointmentStatus.INDETERMINATE,
      };
      return PatientHistorySchema.parse(history);
    });
  }
  catch (error) {
    console.error("Invalid patient history data:", error);
    throw new Error("Invalid patient history data");
  }
}

export const PatientAdapter = {
  validatePatientForAppointmentDetail,
  patientHistoryToArray,
};
