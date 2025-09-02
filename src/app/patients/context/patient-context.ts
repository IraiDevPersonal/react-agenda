import React, { use } from "react";

import { CustomError } from "@/lib/custom-error";

import type { PatientModel } from "../models/patient-model";

type ContextProps = {
  patient: PatientModel | undefined;
};

export const PatientContext = React.createContext<ContextProps>({
  patient: undefined,
});

export function usePatientContext() {
  const context = use(PatientContext);

  if (!context) {
    throw new CustomError(
      "el usePatientContext solo puede ser usado dentro de su Provider",
    );
  }

  return context;
}
