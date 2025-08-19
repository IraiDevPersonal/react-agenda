import { ApiPatientSchema } from "./patient-schema";

export const ApiPatientForAppointmentDetailSchema = ApiPatientSchema.omit({
  is_deleted: true,
}).nullable();
