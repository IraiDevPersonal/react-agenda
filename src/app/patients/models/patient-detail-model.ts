import type { UserGender } from "@/app/users/models/shared-model";

import type { PatientModel } from "./patient-model";

export type PatientDetailModel = PatientModel & {
  gender: UserGender;
};
