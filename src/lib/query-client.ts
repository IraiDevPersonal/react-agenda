import { QueryClient } from "@tanstack/react-query";

import { httpHelper } from "./http-client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos,
      throwOnError(error) {
        const errorMessage = httpHelper.getErrorMessage(error);
        console.error(errorMessage);
        // Notify.error(errorMessage, { duration: 4000 });

        // TODO: return false para que la aplicacion no caiga despues del error
        return false;
      },
    },
  },
});
