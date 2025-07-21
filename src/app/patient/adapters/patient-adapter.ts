import { safeArray } from "@/lib/utils";

import type { PatientForAppointmentDetail, PatientHistory } from "../types/patient";

import { PatientForAppointmentDetailSchema, PatientHistorySchema } from "../types/patient";

export class PatientAdapter {
  static validatePatientForAppointmentDetail(item: any) {
    try {
      const data = this.patientForAppointmentDetailMapper(item);
      return PatientForAppointmentDetailSchema.parse(data);
    }
    catch (error) {
      console.error("Invalid patient data for appointment detail:", error);
      throw new Error("Invalid patient data");
    }
  }

  static patientHistoryToArray(data: any) {
    try {
      return safeArray(data).map((item) => {
        const history = this.patientHistoryMapper(item);
        return PatientHistorySchema.parse(history);
      });
    }
    catch (error) {
      console.error("Invalid patient history data:", error);
      throw new Error("Invalid patient history data");
    }
  }

  // PRIVATE METHODS

  private static patientForAppointmentDetailMapper(item: any) {
    return {
      names: item.names,
      last_names: item.last_names,
      rut: item.rut,
      phone: item.phone,
      email: item.email,
      address: item.address,
    } satisfies PatientForAppointmentDetail;
  }

  private static patientHistoryMapper(item: any) {
    return {
      uid: item.uid,
      date_time: item.date_time,
      status: item.status,
    } satisfies PatientHistory;
  }
};
