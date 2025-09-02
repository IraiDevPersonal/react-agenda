import { ProfessionModel } from "@/app/professions/models/profession-model";
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
  professions?: ProfessionModel[];
};

export type UserRoleModel = {
  id: number;
  name: string;
};
