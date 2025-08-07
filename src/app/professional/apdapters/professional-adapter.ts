import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

import type { ProfessionalModel, ProfessionalProfessionModel, ProfessionalResponseModel } from "../models/professional-model";

import { ProfessionalResponseSchema, ProfessionalRoleOrProfessionSchema, ProfessionalSchema } from "../models/professional-model";
import { validateProfessionalDetailResponse } from "./professional-detail-adapter";
import { professionalForFiltersHttpResponse } from "./professional-filter-adapter";
import { validateProfessionalForAppointmentDetail } from "./professional-for-appointment-detail-adapter";

function validateRoleOrProfession(item: any) {
  try {
    const data: ProfessionalProfessionModel = {
      id: item.id,
      name: item.name,
    };

    return ProfessionalRoleOrProfessionSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

function validate(item: any) {
  try {
    const data: ProfessionalModel = {
      uid: item.uid,
      rut: item.rut,
      names: item.names,
      last_names: item.last_names,
      phone: item.phone,
      email: item.email,
      avatar_image: item.avatar_image,
      address: item.address,
      role: validateRoleOrProfession(item.role),
      professions: safeArray(item.professions).map(validateRoleOrProfession),
    };

    return ProfessionalSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

function validateProfessionalRepsonse(response: any) {
  try {
    const data: ProfessionalResponseModel = {
      data: safeArray(response.data).map(validate),
      limit: response.limit,
      total: response.total,
      page: response.page,
      pages: response.pages,
    };

    return ProfessionalResponseSchema.parse(data);
  }
  catch (error) {
    throw CustomError.handleError(error, { showLog: true });
  }
}

export const ProfessionalAdapter = {
  validate,
  professionalForFiltersHttpResponse,
  validateProfessionalForAppointmentDetail,
  httpResponse: validateProfessionalRepsonse,
  detailHttpResponse: validateProfessionalDetailResponse,
};
