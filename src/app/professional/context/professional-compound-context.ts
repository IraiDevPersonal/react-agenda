import React, { use } from "react";

import { CustomError } from "@/lib/custom-error";

import type { ProfessionalModel } from "../models/professional-model";

type ContextProps = {
  professional: ProfessionalModel | undefined;
};

const ProfessionalCompoundContext = React.createContext<ContextProps>({
  professional: undefined,
});

function useProfessionalCompoundContext() {
  const context = use(ProfessionalCompoundContext);

  if (!context) {
    throw new CustomError("el useProfessionalContext solo puede ser usado dentro de su Provider");
  }

  return context;
}

export {
  ProfessionalCompoundContext,
  useProfessionalCompoundContext,
};
