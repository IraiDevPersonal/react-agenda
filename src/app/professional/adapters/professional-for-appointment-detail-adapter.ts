import { CustomError } from "@/lib/custom-error";

import type { ProfessionalForAppointmentDetailModel } from "../models/professional-for-appointment-detail-model";

import { ProfessionalForAppointmentDetailSchema } from "../models/professional-for-appointment-detail-model";

export function validateProfessionalForAppointmentDetail(item: any) {
  try {
    const data: ProfessionalForAppointmentDetailModel = {
      fullname: item.fullname,
      professions: item.professions,
      pay_methods: item.pay_methods,
      confirm_methods: item.confirm_methods,
    };
    return ProfessionalForAppointmentDetailSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}
