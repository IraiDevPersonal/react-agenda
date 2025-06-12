import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Toaster } from "sonner";
import "@/styles/global.css";

import { queryClient } from "@/lib/query-client";

import { Router } from "./router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Router />
      </NuqsAdapter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
