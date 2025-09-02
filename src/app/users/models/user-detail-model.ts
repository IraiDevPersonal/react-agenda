import type { UserModel } from "./user-model";

export type UserDetailResponseModel = {
  data: UserModel;
  blocks?: any[];
};
