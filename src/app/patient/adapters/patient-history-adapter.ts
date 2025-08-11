import { AppointmentStatus } from "@/app/agenda/domain/models/type";
import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

import type { PatientHistoryModel } from "../models/patient-history-model";

import { PatientHistorySchema } from "../models/patient-history-model";

function validate(item: any) {
  try {
    const data: PatientHistoryModel = {
      uid: item.uid,
      date_time: item.date_time,
      status: item.status ?? AppointmentStatus.INDETERMINATE,
    };
    return PatientHistorySchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

export function patientHistoryToArray(data: any) {
  return safeArray(data).map(validate);
}
