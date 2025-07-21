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
    console.error("Error validating professional data:", error);
    throw new Error("Invalid professional data");
  }
}

export const ProfessionalAdapter = {
  validateProfessionalForAppointmentDetail,
};
