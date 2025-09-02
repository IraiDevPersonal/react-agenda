import React, { use } from "react";

import { CustomError } from "@/lib/custom-error";

import type { UserModel } from "../models/user-model";

type ContextProps = {
  user: UserModel | undefined;
};

export const UserContext = React.createContext<ContextProps>({
  user: undefined,
});

export function useUserContext() {
  const context = use(UserContext);

  if (!context) {
    throw new CustomError(
      "el useUserContext solo puede ser usado dentro de su Provider",
    );
  }

  return context;
}
