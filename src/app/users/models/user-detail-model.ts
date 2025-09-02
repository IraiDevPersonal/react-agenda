import type { UserGender } from "./shared-model";
import type { UserModel } from "./user-model";

export type UserDetailModel = UserModel & {
  gender: UserGender;
};
