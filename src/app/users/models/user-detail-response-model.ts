import type { UserDetailModel } from "./user-detail-model";

export type UserDetailResponseModel = {
  data: UserDetailModel;
  blocks?: any[];
};
