import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "@/styles/global.css";

import { queryClient } from "@/lib/query-client";

import { Router } from "./router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
