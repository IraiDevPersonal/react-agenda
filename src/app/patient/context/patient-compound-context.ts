import React, { use } from "react";

import { CustomError } from "@/lib/custom-error";

import type { PatientModel } from "../models/patient-model";

type ContextProps = {
  patient: PatientModel | undefined;
};

const PatientCompoundContext = React.createContext<ContextProps>({
  patient: undefined,
});

function usePatientCompoundContext() {
  const context = use(PatientCompoundContext);

  if (!context) {
    throw new CustomError("el usePatientContext solo puede ser usado dentro de su Provider");
  }

  return context;
}

export {
  PatientCompoundContext,
  usePatientCompoundContext,
};
