import React, { use } from "react";

import { CustomError } from "@/lib/custom-error";

import type { ProfessionalModel } from "../models/professional-model";

type ContextProps = {
  professional: ProfessionalModel | undefined;
};

export const ProfessionalContext = React.createContext<ContextProps>({
  professional: undefined,
});

export function useProfessionalContext() {
  const context = use(ProfessionalContext);

  if (!context) {
    throw new CustomError("el useProfessionalContext solo puede ser usado dentro de su Provider");
  }

  return context;
}
