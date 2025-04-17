import Router from "@/modules/_core/routes/router.tsx";
import { Toaster } from "sonner";

import "./config/styles/global.css";

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
