import { ApiPatientHistorySchema } from "./patient-history-schema";
import { ApiPatientSchema } from "./patient-schema";

export const ApiPatientForAppointmentDetailSchema = ApiPatientSchema.omit({
  status: true,
  gender: true,
  birth_date: true,
})
  .extend({
    history: ApiPatientHistorySchema.array(),
  })
  .nullable();
