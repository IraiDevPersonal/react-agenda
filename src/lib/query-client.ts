import { QueryClient } from "@tanstack/react-query";

import { CustomError } from "./custom-error";
import { HttpClient } from "./http-client";
import { notification } from "./notification";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1 * 60 * 1000,
      throwOnError(error) {
        if (!HttpClient.isRequestCancelled(error)) {
          const { message } = CustomError.getError(error);
          notification.error(message, { duration: 4000 });
        }

        // return false para que la aplicacion no caiga despues del error
        return false;
      },
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        const { message } = CustomError.getError(error);
        notification.error(message, { duration: 4000 });
      },
    },
  },
});
