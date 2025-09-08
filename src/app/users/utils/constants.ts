import { UserGender, UserStatus } from "../models/shared-model";

export const USER_GENDER_OPTIONS = [
  { label: "Masculino", value: UserGender.MASCULINE },
  { label: "Femenino", value: UserGender.FEMENINE },
];

export const USER_STATUS_NAMES = {
  [UserStatus.ACTIVE]: "habilitad@",
  [UserStatus.INACTIVE]: "deshabilitad@",
  [UserStatus.BLOCKED]: "bloquead@",
};
