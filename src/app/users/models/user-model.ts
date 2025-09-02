export type UserModel = {
  uid: string;
  rut: string;
  names: string;
  phone: string;
  email: string;
  address: string;
  last_names: string;
  avatar_image: string | null;
  role: UserRoleModel;
  professions: UserProfessionModel[];
};

export type UserRoleModel = {
  id: number;
  name: string;
};

export type UserProfessionModel = {
  id: number;
  name: string;
};

export type UserResponseModel = {
  page: number;
  total: number;
  pages: number;
  limit: number;
  data: UserModel[];
};
