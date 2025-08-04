import "@/styles/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

import { Notification } from "@/components/notification";
import { queryClient } from "@/lib/query-client";

import { Router } from "./router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Router />
      </NuqsAdapter>
      <Notification />
    </QueryClientProvider>
  );
}

export default App;
