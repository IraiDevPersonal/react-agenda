import { CustomError } from "@/lib/custom-error";

import type { ProfessionalForAppointmentDetailModel } from "../models/professional-for-appointment-detail-model";

import { ApiProfessionalForAppointmentDetailSchema } from "../schemas/professional-for-appointment-detail-schema";

export class ProfessionalForAppointmentDetailMapper {
  static map(raw: unknown): ProfessionalForAppointmentDetailModel {
    const { success, error, data } = ApiProfessionalForAppointmentDetailSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, {
        loggerMessage: "ProfessionalForAppointmentDetailMapper.map",
      });
    }

    return {
      fullname: data.fullname,
      professions: data.professions,
      pay_methods: data.pay_methods,
      confirm_methods: data.confirm_methods,
    };
  }
}
