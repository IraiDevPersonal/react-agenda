import { PersonSchema } from "@/lib/schemas/person-schemas";
import { ApiPatientHistorySchema } from "./patient-history-schema";
import { ApiPatientSchema } from "./patient-schema";

export const ApiPatientForAppointmentDetailSchema = ApiPatientSchema.omit({
  status: true,
  birth_date: true,
})
  .extend({
    full_name: PersonSchema.FullName,
    history: ApiPatientHistorySchema.array(),
  })
  .nullable();
