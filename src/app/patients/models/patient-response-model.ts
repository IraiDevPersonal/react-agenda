import type { ResponseWithPagination } from "@/lib/types/global-types";

import type { PatientModel } from "./patient-model";

export type PatientResponseModel = ResponseWithPagination<PatientModel>;
