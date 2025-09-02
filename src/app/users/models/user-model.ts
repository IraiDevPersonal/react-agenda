import type { UserStatus } from "./shared-model";

export type UserModel = {
  uid: string;
  rut: string;
  names: string;
  phone: string;
  email: string;
  address: string;
  last_names: string;
  status: UserStatus;
  roles: UserRoleModel[];
  avatar_image: string | null;
  professions?: UserProfessionModel[];
};

export type UserRoleModel = {
  id: number;
  name: string;
};

export type UserProfessionModel = {
  id: number;
  name: string;
};
