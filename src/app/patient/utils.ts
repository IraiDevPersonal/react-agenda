import type { StringifyObject } from "@/lib/types/global-types";

import type { PatientFilters } from "./models";
import type { PatientModel, PatientResponseModel } from "./models/patient-model";

import { PatientQueryOptions } from "./queries/patient-queries";

function updatePatientCache(old: PatientResponseModel, patient: PatientModel) {
  return {
    ...old,
    data: old.data.map(oldPatient => oldPatient.uid === patient.uid ? patient : oldPatient),
  };
}

export function setPatientQueryData(filtersAsParams: StringifyObject<PatientFilters>) {
  return {
    querykey: [...PatientQueryOptions.getAll(filtersAsParams).queryKey],
    updateCache: updatePatientCache,
  };
}
