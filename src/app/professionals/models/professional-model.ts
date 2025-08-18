export type ProfessionalModel = {
  uid: string;
  rut: string;
  names: string;
  phone: string;
  email: string;
  address: string;
  last_names: string;
  avatar_image: string | null;
  role: ProfessionalRoleModel;
  professions: ProfessionalProfessionModel[];
};

export type ProfessionalRoleModel = {
  id: number;
  name: string;
};

export type ProfessionalProfessionModel = {
  id: number;
  name: string;
};

export type ProfessionalResponseModel = {
  page: number;
  total: number;
  pages: number;
  limit: number;
  data: ProfessionalModel[];
};
