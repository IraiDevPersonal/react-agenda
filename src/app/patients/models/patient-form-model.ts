import type z from "zod";

import type { PatientFormSchema } from "../schemas/form/patient-form-schema";

export type PatientFormValues = z.infer<typeof PatientFormSchema>;
