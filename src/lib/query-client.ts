import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CustomError } from "./custom-error";
import { HttpClient } from "./http-client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1 * 60 * 1000,
      throwOnError(error) {
        if (!HttpClient.isRequestCancelled(error)) {
          const { message } = CustomError.getError(error);
          toast.error(message, { duration: 4000 });
        }

        // return false para que la aplicacion no caiga despues del error
        return false;
      },
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        const { message } = CustomError.getError(error);
        toast.error(message, { duration: 4000 });
      },
    },
  },
});
