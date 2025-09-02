import type { UserGender } from "./types";
import type { UserModel } from "./user-model";

export type UserDetailModel = UserModel & {
  gender: UserGender;
};
