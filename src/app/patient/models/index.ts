export enum PatientStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
};

export type PatientFilters = {
  rut: string;
  name: string;
  email: string;
  status: string;
  page: number;
  limit: number;
};
