import { CustomError } from "@/lib/custom-error";

import type { ProfessionalForAppointmentDetail } from "../models/professional-model";

import { ProfessionalForAppointmentDetailSchema } from "../models/professional-model";

function validateProfessionalForAppointmentDetail(item: any) {
  try {
    const data: ProfessionalForAppointmentDetail = {
      fullname: item.full_name,
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

export const ProfessionalAdapter = {
  validateProfessionalForAppointmentDetail,
};
