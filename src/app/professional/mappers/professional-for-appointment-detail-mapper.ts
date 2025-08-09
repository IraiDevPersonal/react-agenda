import z from "zod";

import { CustomError } from "@/lib/custom-error";

import type { ProfessionalForAppointmentDetailModel } from "../domain/models/professional-for-appointment-detail-model";

import { ApiProfessionalForAppointmentDetailSchema } from "../domain/schemas/professional-for-appointment-detail-schema";

export class ProfessionalForAppointmentDetailMapper {
  static map(raw: unknown): ProfessionalForAppointmentDetailModel {
    const { success, error, data } = ApiProfessionalForAppointmentDetailSchema.safeParse(raw);

    if (!success) {
      console.warn("Error en datos de profesional", z.treeifyError(error));
      throw new CustomError("Datos de la API invalidos");
    }

    return {
      fullname: data.fullname,
      professions: data.professions,
      pay_methods: data.pay_methods,
      confirm_methods: data.confirm_methods,
    };
  }
}
